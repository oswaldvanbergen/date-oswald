import { CONFIG } from "./config.js";
import { createMusicController } from "./cute-intro.mp3";
import { readState, writeState, clearState } from "./storage.js";
import { renderPoster } from "./poster.js";
import { escapeHtml } from "./utils.js";

let finalSnapshot = null;

const state = readState(CONFIG) ?? {
  stepIndex: 0,
  selections: Object.fromEntries(CONFIG.steps.map((step) => [step.id, null]))
};

const els = {
  intro: document.querySelector("#intro"),
  planner: document.querySelector("#planner"),
  final: document.querySelector("#final"),
  start: document.querySelector("#start"),
  stepKicker: document.querySelector("#step-kicker"),
  stepTitle: document.querySelector("#step-title"),
  stepCount: document.querySelector("#step-count"),
  progress: document.querySelector("#progress"),
  options: document.querySelector("#options"),
  back: document.querySelector("#back"),
  next: document.querySelector("#next"),
  miniPlan: document.querySelector("#mini-plan"),
  planTitle: document.querySelector("#plan-title"),
  poster: document.querySelector("#poster"),
  copy: document.querySelector("#copy"),
  share: document.querySelector("#share"),
  restart: document.querySelector("#restart"),
  toast: document.querySelector("#toast"),
  musicToggle: document.querySelector("#music-toggle"),
  musicLabel: document.querySelector("#music-label")
};

const music = createMusicController({
  button: els.musicToggle,
  label: els.musicLabel
});

els.start.addEventListener("click", start);
els.back.addEventListener("click", back);
els.next.addEventListener("click", next);
els.copy.addEventListener("click", copyPlan);
els.share.addEventListener("click", sharePlan);
els.restart.addEventListener("click", restart);
els.musicToggle.addEventListener("click", music.toggle);

render();

function start() {
  switchScreen(els.intro, els.planner);
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function render() {
  const step = currentStep();
  els.stepKicker.textContent = step.label;
  els.stepTitle.textContent = step.title;
  els.stepCount.textContent = `${state.stepIndex + 1} / ${CONFIG.steps.length}`;
  els.progress.style.width = `${((state.stepIndex + 1) / CONFIG.steps.length) * 100}%`;
  els.back.disabled = state.stepIndex === 0;
  els.next.textContent = state.stepIndex === CONFIG.steps.length - 1 ? "Finish" : "Next";
  renderOptions(step);
  renderMiniPlan();
  writeState(CONFIG, state);
}

function renderOptions(step) {
  els.options.className = `options ${step.grid ?? ""}`.trim();
  els.options.innerHTML = step.options.map((option) => {
    const selected = state.selections[step.id] === option.id;
    const classes = [
      "option-card",
      selected ? "is-selected" : "",
      option.recommended ? "is-recommended" : ""
    ].filter(Boolean).join(" ");
    return `
      <button class="${classes}" type="button" data-option="${escapeHtml(option.id)}" style="--option-gradient: ${escapeHtml(option.gradient)}" aria-pressed="${selected}">
        <div class="option-art" aria-hidden="true">${option.emoji}</div>
        <div class="option-body">
          <small>${escapeHtml(option.eyebrow ?? "")}</small>
          <h3>${escapeHtml(option.title)}</h3>
          ${option.meta ? `<p>${escapeHtml(option.meta)}</p>` : ""}
          ${option.description ? `<p>${escapeHtml(option.description)}</p>` : ""}
          ${option.note ? `<div class="option-note">${escapeHtml(option.note)}</div>` : ""}
          <div class="tags">
            ${(option.tags ?? []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
          </div>
        </div>
      </button>
    `;
  }).join("");

  els.options.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => select(step.id, button.dataset.option));
  });
}

function renderMiniPlan() {
  const rows = CONFIG.steps.map((step) => {
    const option = selectedOption(step.id);
    return `
      <div class="mini-row">
        <span>${escapeHtml(step.id)}</span>
        <strong>${option ? `${option.emoji} ${escapeHtml(option.title)}` : "Pending"}</strong>
      </div>
    `;
  });

  const count = CONFIG.steps.filter((step) => selectedOption(step.id)).length;
  els.planTitle.textContent = count === 0 ? "Still choosing" : `${count} selected`;
  els.miniPlan.innerHTML = rows.join("");
}

function select(stepId, optionId) {
  state.selections[stepId] = optionId;
  render();
  pulseSelected();
}

function back() {
  if (state.stepIndex === 0) return;
  state.stepIndex -= 1;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function next() {
  const step = currentStep();
  if (!state.selections[step.id]) {
    showToast(step.missing ?? "Choose an option first.");
    els.options.animate([
      { transform: "translateX(0)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(0)" }
    ], { duration: 220, easing: "ease-in-out" });
    return;
  }

  if (state.stepIndex < CONFIG.steps.length - 1) {
    state.stepIndex += 1;
    window.scrollTo({ top: 0, behavior: "smooth" });
    render();
    return;
  }

  showFinal();
}

function showFinal() {
  els.poster.innerHTML = renderPoster(CONFIG, state);
  switchScreen(els.planner, els.final);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function copyPlan() {
  const text = planText();

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }
    showToast("Copied.");
  } catch {
    fallbackCopy(text);
    showToast("Copied.");
  }
}

async function sharePlan() {
  const text = planText();
  if (navigator.share) {
    try {
      await navigator.share({ title: CONFIG.appName, text });
      return;
    } catch {}
  }
  await copyPlan();
}

function restart() {
  clearState(CONFIG);
  state.stepIndex = 0;
  state.selections = Object.fromEntries(CONFIG.steps.map((step) => [step.id, null]));
  els.toast.classList.add("hidden");
  switchScreen(els.final, els.intro);
  render();
}

function planText() {
  const sourceState = finalSnapshot ?? state;
  const lines = CONFIG.steps.map((step) => {
    const option = selectedOptionFromState(sourceState, step.id);
    return `${step.id}: ${option?.title ?? ""}`;
  });

  return [
    `${CONFIG.appName}`,
    CONFIG.event.date,
    "",
    ...lines,
    "",
    "Thank you for choosing. I will handle the plan."
  ].join("
");
}

function currentStep() {
  return CONFIG.steps[state.stepIndex];
}

function selectedOption(stepId) {
  const step = CONFIG.steps.find((item) => item.id === stepId);
  const id = state.selections[stepId];
  return step?.options.find((option) => option.id === id) ?? null;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toast.classList.add("hidden");
  }, 2600);
}

function switchScreen(from, to) {
  if (!from || !to) return;

  from.classList.add("is-exiting");

  window.setTimeout(() => {
    from.classList.add("hidden");
    from.classList.remove("is-exiting");

    to.classList.remove("hidden");
    to.classList.add("is-entering");

    window.requestAnimationFrame(() => {
      to.classList.remove("is-entering");
    });
  }, 180);
}

function pulseSelected() {
  const selected = els.options.querySelector(".is-selected");
  if (!selected) return;

  selected.animate([
    { transform: "scale(1)" },
    { transform: "scale(1.015)" },
    { transform: "scale(1)" }
  ], { duration: 280, easing: "ease-out" });
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}


function selectedOptionFromState(sourceState, stepId) {
  const step = CONFIG.steps.find((item) => item.id === stepId);
  const id = sourceState?.selections?.[stepId];
  return step?.options.find((option) => option.id === id) ?? null;
}

function cloneState(sourceState) {
  return {
    stepIndex: sourceState.stepIndex,
    selections: { ...sourceState.selections }
  };
}

function resetWorkingState() {
  state.stepIndex = 0;
  state.selections = Object.fromEntries(CONFIG.steps.map((step) => [step.id, null]));
}
