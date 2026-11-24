"use strict";

const liveForm = byId("live-dialogue");
const liveInput = byId("live-question");
const liveStatus = byId("live-status");
const liveButton = liveForm.querySelector("button");

function showLiveStatus(message) {
  liveStatus.textContent = message;
  liveStatus.hidden = !message;
}

if (location.protocol === "http:") {
  fetch("/api/status").then(response => response.json()).then(({ enabled }) => {
    window.kornevLiveAvailable = enabled === true;
    render();
  }).catch(() => {});
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
      body: JSON.stringify({ question, discovered: [...state.clues].filter(id => typeof id === "string") }),
      signal: AbortSignal.timeout(20000)
    });
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
