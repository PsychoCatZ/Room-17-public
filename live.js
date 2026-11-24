"use strict";

const liveForm = byId("live-dialogue");
const liveInput = byId("live-question");
const liveStatus = byId("live-status");
const liveButton = liveForm.querySelector("button");
let airEpoch;

function showLiveStatus(message) {
  liveStatus.textContent = message;
  liveStatus.hidden = !message;
}

async function refreshAir() {
  let enabled = false;
  try {
    const response = await fetch("/api/status", { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (response.ok) {
      const status = await response.json();
      enabled = status.enabled === true;
      airEpoch = status.epoch;
    }
  } catch {}
  if (Boolean(window.kornevLiveAvailable) !== enabled) {
    window.kornevLiveAvailable = enabled;
    render();
  }
}

if (location.protocol === "https:" || location.protocol === "http:") {
  refreshAir();
  setInterval(refreshAir, 10000);
}

liveForm.addEventListener("submit", async event => {
  event.preventDefault();
  const question = liveInput.value.trim();
  if (!question || liveForm.hidden || liveButton.disabled) return;

  const currentState = state;
  const currentReply = state.reply;
  liveButton.disabled = true;
  showLiveStatus("Корнев обдумывает вопрос…");
  try {
    const response = await fetch("/api/kornev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, airEpoch, discovered: [...state.clues].filter(id => typeof id === "string") }),
      signal: AbortSignal.timeout(20000)
    });
    if (response.status === 503 && (await response.json()).error === "air_closed") {
      showLiveStatus("Luna сейчас вне эфира.");
      await refreshAir();
      return;
    }
    if (!response.ok) throw new Error("Live reply failed");
    const { reply } = await response.json();
    if (typeof reply !== "string" || !reply.trim()) throw new Error("Empty reply");
    if (state === currentState && state.place === "desk" && state.reply === currentReply) {
      speak("guarded", reply);
      liveInput.value = "";
      render();
    }
    showLiveStatus("");
  } catch {
    showLiveStatus("Корнев не ответил. Можно повторить вопрос.");
  } finally {
    liveButton.disabled = false;
  }
});
