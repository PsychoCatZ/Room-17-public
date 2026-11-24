"use strict";

const fs = require("node:fs");

async function main() {
  const [command = "status", duration = "1800"] = process.argv.slice(2);
  const routes = { status: "", on: "/enable", off: "/disable" };
  if (!Object.hasOwn(routes, command) || (command === "on" && !/^\d+$/.test(duration ?? ""))) {
    throw new Error("Usage: room17-air status | on [seconds] | off");
  }
  const token = fs.readFileSync("/etc/room17/air.token", "utf8").trim();
  const response = await fetch("http://127.0.0.1:4320/v1/air" + routes[command], {
    method: command === "status" ? "GET" : "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: command === "on" ? JSON.stringify({ durationSeconds: Number(duration), requestLimit: 30 }) : undefined,
    signal: AbortSignal.timeout(5000)
  });
  const status = await response.json();
  if (!response.ok) throw new Error(status.error ?? "HTTP " + response.status);
  console.log(JSON.stringify(status));
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
