"use strict";

const http = require("node:http");
const { randomUUID, timingSafeEqual } = require("node:crypto");

function createAir({ hasKey, now = Date.now }) {
  let session;
  let epoch = null;
  function disable() {
    if (session) {
      clearTimeout(session.timer);
      session.abort.abort();
    }
    session = undefined;
  }
  function current() {
    if (session && now() >= session.expiresAt) disable();
    return session;
  }
  function status() {
    const active = current();
    return {
      enabled: Boolean(active && active.remaining > 0),
      epoch,
      expiresAt: active?.expiresAt ?? null,
      remaining: active?.remaining ?? 0
    };
  }
  return {
    status,
    disable,
    enable(durationSeconds, requestLimit = 30) {
      if (!hasKey || !Number.isInteger(durationSeconds) || durationSeconds < 1 || durationSeconds > 86400 ||
          !Number.isInteger(requestLimit) || requestLimit < 1 || requestLimit > 30) return false;
      disable();
      epoch = randomUUID();
      const timer = setTimeout(disable, durationSeconds * 1000);
      timer.unref();
      session = { expiresAt: now() + durationSeconds * 1000, remaining: requestLimit, abort: new AbortController(), timer };
      return true;
    },
    reserve(expectedEpoch) {
      const active = current();
      if (!active || active.remaining === 0 || expectedEpoch !== epoch) return null;
      active.remaining--;
      return { signal: active.abort.signal, isCurrent: () => current() === active };
    }
  };
}

function createAirControl(air, token) {
  const expected = Buffer.from("Bearer " + token);
  return http.createServer(async (req, res) => {
    const send = (status, payload) => {
      res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      res.end(JSON.stringify(payload));
    };
    const authorization = Buffer.from(req.headers.authorization ?? "");
    if (!token || authorization.length !== expected.length || !timingSafeEqual(authorization, expected)) {
      return send(403, { error: "forbidden" });
    }
    if (req.method === "GET" && req.url === "/v1/air") return send(200, air.status());
    if (req.method === "POST" && req.url === "/v1/air/disable") {
      air.disable();
      return send(200, air.status());
    }
    if (req.method === "POST" && req.url === "/v1/air/enable") {
      try {
        let body = "";
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 1024) return send(413, { error: "body_too_large" });
        }
        const { durationSeconds, requestLimit } = JSON.parse(body);
        if (!air.enable(durationSeconds, requestLimit)) return send(409, { error: "invalid_limits_or_missing_key" });
        return send(200, air.status());
      } catch {
        return send(400, { error: "invalid_json" });
      }
    }
    send(404, { error: "not_found" });
  });
}

module.exports = { createAir, createAirControl };
