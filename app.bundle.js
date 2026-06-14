/* src/config.js */
const CONFIG = {
  appName: "DateQuest",
  event: {
    date: "Saturday, June 13"
  },
  steps: [
    {
      id: "time",
      label: "01",
      title: "What time feels better?",
      missing: "Choose a time first.",
      grid: "time-grid",
      options: [
        {
          id: "4pm",
          title: "4:00 PM",
          emoji: "🌤️",
          meta: "Afternoon play",
          gradient: "linear-gradient(135deg, #80d66b, #ffe074)"
        },
        {
          id: "730pm",
          title: "7:30 PM",
          emoji: "🌙",
          meta: "Evening play",
          gradient: "linear-gradient(135deg, #2352b8, #7465f2, #ff86ba)"
        }
      ]
    },
    {
      id: "play",
      label: "02",
      title: "Pick the play",
      missing: "Choose a play first.",
      options: [
        {
          id: "hoc-vien-phep-thuat",
          slot: "4pm",
          title: "Học Viện Phép Thuật",
          emoji: "🪄",
          meta: "IDECAF · 4:00 - 7:30",
          gradient: "linear-gradient(135deg, #ffe074, #ff9ccc, #5ab8ff)"
        },
        {
          id: "hon-ma-co-dao-hat",
          slot: "4pm",
          title: "Hồn ma cô đào hát",
          emoji: "🎭",
          meta: "Sân khấu thế giới trẻ · 4:00 - 7:00",
          gradient: "linear-gradient(135deg, #ffd99a, #ff7a68, #7465f2)"
        },
        {
          id: "bong-dan-ong",
          slot: "730pm",
          title: "Bóng đàn ông",
          emoji: "🫂",
          meta: "Sân khấu thế giới trẻ · 8:00 - 11:00",
          gradient: "linear-gradient(135deg, #dff6ff, #5ab8ff, #ffe074)"
        },
        {
          id: "gia-gan",
          slot: "730pm",
          title: "Già Gân",
          emoji: "🏘️",
          meta: "Hồng Vân · 7:30 - 10:00",
          gradient: "linear-gradient(135deg, #fff0c7, #ff9f7a, #ff86ba)"
        },
        {
          id: "her-suggestion",
          slot: "any",
          title: "Others",
          emoji: "💬",
          meta: "If you want to do something else, I'm all ears",
          gradient: "linear-gradient(135deg, #ffffff, #d9f2ff, #ffd4eb)"
        }
      ]
    },
    {
      id: "food",
      label: "03",
      title: "Food after?",
      missing: "Choose food first.",
      options: [
        {
          id: "italian",
          title: "Italian",
          emoji: "🍝",
          meta: "pasta / pizza / lasagna",
          gradient: "linear-gradient(135deg, #fff2a0, #ffb26f, #ff86ba)"
        },
        {
          id: "korean",
          title: "Korean",
          emoji: "🥩",
          meta: "KBBQ / cơm canh thịt lợn / korean fried chicken",
          gradient: "linear-gradient(135deg, #ffbe7a, #ff86ba)"
        },
        {
          id: "japanese",
          title: "Japanese",
          emoji: "🍣",
          meta: "sushi / ramen / udon",
          gradient: "linear-gradient(135deg, #c9ffd9, #5ab8ff, #ff9ccc)"
        },
        {
          id: "vietnamese",
          title: "Vietnamese",
          emoji: "🍜",
          meta: "Comfort pick",
          gradient: "linear-gradient(135deg, #80d66b, #fff2a0)"
        },
        {
          id: "her-food-pick",
          title: "Others",
          emoji: "💬",
          meta: "I’m all ears",
          gradient: "linear-gradient(135deg, #ffffff, #d9f2ff, #ffd4eb)"
        }
      ]
    },
    {
      id: "color",
      label: "04",
      title: "Outfit color so I can match with you",
      missing: "Choose a color first.",
      options: [
        {
          id: "pink",
          title: "Pink",
          emoji: "💗",
          note: "kẹo bông gòn",
          gradient: "linear-gradient(135deg, #ffd4eb, #ff86ba, #ffe074)"
        },
        {
          id: "blue",
          title: "Blue",
          emoji: "💙",
          note: "like your eyes",
          gradient: "linear-gradient(135deg, #d9f2ff, #5ab8ff, #7465f2)"
        },
        {
          id: "black",
          title: "Black",
          emoji: "🖤",
          note: "cổ điển, tôn trọng",
          gradient: "linear-gradient(135deg, #f2e9ff, #5d4a66, #151018)"
        },
        {
          id: "cream",
          title: "White / cream",
          emoji: "🤍",
          note: "trắng như kem dừa",
          gradient: "linear-gradient(135deg, #ffffff, #ffe8c7, #ffc6dd)"
        },
        {
          id: "yellow",
          title: "Yellow",
          emoji: "💛",
          note: "1 con minion",
          gradient: "linear-gradient(135deg, #fff06d, #ffc06f, #5ab8ff)"
        },
        {
          id: "purple",
          title: "Purple?",
          emoji: "💜",
          note: "JOHN CENAAAAAAAAAAAAAAAAAAAAAAAAA",
          gradient: "linear-gradient(135deg, #e6d7ff, #9b6bff, #ff86ba)"
        },
        {
          id: "surprise",
          title: "có màu nào mà e muốn a mặc khum",
          emoji: "🎁",
          gradient: "linear-gradient(135deg, #ff86ba, #7465f2, #80d66b)"
        }
      ]
    }
  ]
};

/* src/utils.js */
function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* src/storage.js */
function readState(config) {
  try {
    const raw = localStorage.getItem(key(config));
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.selections || typeof parsed.selections !== "object") return null;

    return parsed;
  } catch {
    return null;
  }
}

function writeState(config, state) {
  try {
    localStorage.setItem(key(config), JSON.stringify(state));
  } catch {}
}

function clearState(config) {
  try {
    localStorage.removeItem(key(config));
  } catch {}
}

function key(config) {
  return `${config.appName}:state:v4`;
}

/* src/poster.js */
function renderPoster(config, sourceState) {
  const labels = {
    time: "Time",
    play: "Play",
    food: "Food",
    color: "Outfit"
  };

  const rows = config.steps.map((step) => {
    const option = findOption(step, sourceState.selections[step.id]);
    const detail = option?.note || option?.meta || "";
    const value = option ? `${option.emoji} ${option.title}${detail ? ` — ${detail}` : ""}` : "";

    return [labels[step.id] ?? step.id, value];
  });

  return `
    <div class="poster-hero poster-hero-new">
      <div class="poster-rainbow" aria-hidden="true"></div>

      <img class="poster-main-big" src="main2.jpg" alt="">

      <img class="poster-main-float float-one" src="main.jpg" alt="">
      <img class="poster-main-float float-two" src="main.jpg" alt="">
      <img class="poster-main-float float-three" src="main.jpg" alt="">
      <img class="poster-main-float float-four" src="main.jpg" alt="">
      <img class="poster-main-float float-five" src="main.jpg" alt="">
      <img class="poster-main-float float-six" src="main.jpg" alt="">
      <img class="poster-main-float float-seven" src="main.jpg" alt="">
      <img class="poster-main-float float-eight" src="main.jpg" alt="">
    </div>

    <div class="poster-card">
      <h3>${escapeHtml(config.event.date)}</h3>
      <div class="poster-lines">
        ${rows.map(([label, value]) => `
          <div class="poster-line">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
          </div>
        `).join("")}
      </div>
    </div>

    ${sourceState.selections.color === "surprise" ? `
      <div class="poster-alert">
        🔥 URGENT: classified outfit protocol activated. Proceed with caution.
      </div>
    ` : ""}

    <div class="poster-footer">
      Selection received. I will handle the logistics.
    </div>
  `;
}

function findOption(step, optionId) {
  return step.options.find((option) => option.id === optionId);
}

/* src/manual.js */
const MS_VI_CODE = "28022005";
const HUNG_CODE = "12121999";

const PRIVATE_TOYS = [
  {
    id: "rose",
    title: "Bóng hồng như em",
    image: "rose.jpg",
    subtitle: "khởi động nhẹ nhàng",
    rules: [
      "Bắt đầu ở mức thấp nhất, để cơ thể tự làm quen trước.",
      "Đi chậm, quan sát phản ứng của em, không đoán mò.",
      "Nếu em nói dừng, chậm lại, hoặc chỉ hơi ngập ngừng — dừng ngay."
    ],
    note: "Ghi chú của instructor: nhẹ tay, tự tin vừa đủ, không vội vàng. Mục tiêu là làm em thấy an toàn trước khi thấy tò mò."
  },
  {
    id: "mini-massager",
    title: "Mini Massager",
    image: "mini-massager.jpg",
    subtitle: "một cuộc khám phá nhỏ",
    rules: [
      "Nếu em còn ngại, thử qua lớp vải trước.",
      "Giữ lực nhẹ, để cảm giác tăng dần thay vì ập tới.",
      "Chỉ nâng cấp khi em muốn — không tự ý chuyển bài."
    ],
    note: "Ghi chú của instructor: nhỏ nhưng không xem thường. Mọi thứ hay nhất đều cần đúng nhịp."
  },
  {
    id: "dildo",
    title: "Soft Silicone Dildo",
    image: "dildo.jpg",
    subtitle: "đúng dáng, đúng lúc",
    rules: [
      "Chỉ dùng khi em thật sự chọn bài này.",
      "Bắt đầu nhỏ, chậm, và luôn có lube.",
      "Không ép, không vội, không biến tò mò thành áp lực.",
      "Nếu có đau, rát, khó chịu, hoặc em không chắc — dừng lại."
    ],
    note: "Ghi chú của instructor: consent là mật khẩu mở bài. Không có consent thì không có giáo án."
  },
  {
    id: "plug",
    title: "Beginner Plug",
    image: "plug.jpg",
    subtitle: "advanced file",
    rules: [
      "Chỉ dùng loại có đế chặn an toàn.",
      "Lube nhiều hơn em nghĩ là đủ.",
      "Đi rất chậm, không đau, không cố.",
      "Không chuyển vùng nếu chưa vệ sinh kỹ."
    ],
    note: "Ghi chú: bài cửa sau là bài nâng cao. Không rush, không ego, không làm nếu em chưa thật sự thoải mái."
  }
];


function isManualUnlocked(sourceState) {
  return (
    sourceState?.selections?.time === "730pm" &&
    sourceState?.selections?.play === "bong-dan-ong" &&
    sourceState?.selections?.food === "japanese"
  );
}

function openManualGate() {
  if (!isManualUnlocked(finalSnapshot)) return;

  removeManualPanel();

  els.toast.insertAdjacentHTML("beforebegin", `
    <section id="manual-panel" class="manual-panel manual-locked" aria-label="Private section">
      <div class="manual-password-row">
        <input id="manual-password" type="password" inputmode="numeric" autocomplete="off" placeholder="password">
        <button id="manual-unlock" class="primary-action" type="button">Unlock</button>
      </div>
    </section>
  `);

  setupManualPasswordGate();
}

function setupManualPasswordGate() {
  const input = document.querySelector("#manual-password");
  const unlock = document.querySelector("#manual-unlock");
  const panel = document.querySelector("#manual-panel");

  if (!input || !unlock || !panel) return;

  const attemptUnlock = () => {
    if (input.value.trim() !== MS_VI_CODE) {
      input.classList.add("is-error");

      panel.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" }
      ], { duration: 220, easing: "ease-in-out" });

      window.setTimeout(() => input.classList.remove("is-error"), 500);
      return;
    }

    panel.outerHTML = renderManualContent();
    setupToyManual();
  };

  unlock.addEventListener("click", attemptUnlock);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") attemptUnlock();
  });

  window.setTimeout(() => input.focus(), 80);
}

function renderManualContent() {
  return `
    <section id="manual-panel" class="manual-panel manual-open" aria-label="Hung's private giáo án">
      <div class="manual-stamp">HUNG'S PRIVATE GIÁO ÁN</div>

      <div class="toy-grid">
        ${PRIVATE_TOYS.map((toy) => `
          <button class="toy-card" type="button" data-toy="${escapeHtml(toy.id)}">
            <img src="${escapeHtml(toy.image)}" alt="">
            <strong>${escapeHtml(toy.title)}</strong>
            <span>${escapeHtml(toy.subtitle)}</span>
          </button>
        `).join("")}

        <button class="toy-card toy-card-secret" type="button" data-secret-option="true">
          <div class="secret-tile">?</div>
          <strong>Secret option</strong>
          <span>classified</span>
        </button>
      </div>

      <div class="toy-instruction" id="toy-instruction">
        <strong>Choose a file.</strong>
        <p>Logistics will appear here.</p>
      </div>
    </section>
  `;
}

function setupToyManual() {
  const output = document.querySelector("#toy-instruction");
  if (!output) return;

  document.querySelectorAll("[data-toy]").forEach((button) => {
    button.addEventListener("click", () => {
      const toy = PRIVATE_TOYS.find((item) => item.id === button.dataset.toy);
      if (!toy) return;

      document.querySelectorAll(".toy-card").forEach((item) => {
        item.classList.toggle("is-selected", item === button);
      });

      output.innerHTML = `
        <div class="toy-detail-head">
          <img src="${escapeHtml(toy.image)}" alt="">
          <div>
            <strong>${escapeHtml(toy.title)}</strong>
            <span>${escapeHtml(toy.subtitle)}</span>
          </div>
        </div>

        <ul>
          ${toy.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}
        </ul>

        <p>${escapeHtml(toy.note)}</p>
      `;
    });
  });

  const secret = document.querySelector("[data-secret-option]");

  secret?.addEventListener("click", () => {
    document.querySelectorAll(".toy-card").forEach((item) => {
      item.classList.toggle("is-selected", item === secret);
    });

    output.innerHTML = `
      <div class="manual-password-row">
        <input id="secret-password" type="password" inputmode="numeric" autocomplete="off" placeholder="password">
        <button id="secret-unlock" class="primary-action" type="button">Unlock</button>
      </div>
    `;

    setupSecretPasswordGate();
  });
}

function setupSecretPasswordGate() {
  const input = document.querySelector("#secret-password");
  const unlock = document.querySelector("#secret-unlock");
  const output = document.querySelector("#toy-instruction");

  if (!input || !unlock || !output) return;

  const attemptUnlock = () => {
    if (input.value.trim() !== HUNG_CODE) {
      input.classList.add("is-error");

      output.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" }
      ], { duration: 220, easing: "ease-in-out" });

      window.setTimeout(() => input.classList.remove("is-error"), 500);
      return;
    }

    output.innerHTML = `
      <div class="secret-unlocked">
        <span>SECRET OPTION UNLOCKED</span>
        <strong>The instructor and creator of this manual.</strong>
        <p>Live demonstration available by appointment.</p>
      </div>
    `;
  };

  unlock.addEventListener("click", attemptUnlock);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") attemptUnlock();
  });

  window.setTimeout(() => input.focus(), 80);
}

function removeManualPanel() {
  document.querySelector("#manual-panel")?.remove();
}

/* src/cute-intro.js */
function createMusicController({ button, label }) {
  const audio = new Audio("cute-intro.mp3");

  audio.loop = true;
  audio.volume = 1.0;
  audio.preload = "auto";

  let active = false;

  async function toggle() {
    active ? stop() : await start();
  }

  async function start() {
    try {
      await audio.play();

      active = true;
      button.setAttribute("aria-pressed", "true");
      label.textContent = "music on";
    } catch {
      active = false;
      button.setAttribute("aria-pressed", "false");
      label.textContent = "tap again";
    }
  }

  function stop() {
    audio.pause();
    active = false;
    button.setAttribute("aria-pressed", "false");
    label.textContent = "music off";
  }

  return { toggle, start, stop };
}

/* src/app.js */
let finalSnapshot = null;

const state = readState(CONFIG) ?? {
  stepIndex: 0,
  selections: freshSelections()
};

normalizeState(state);

const els = {
  intro: document.querySelector("#intro"),
  planner: document.querySelector("#planner"),
  final: document.querySelector("#final"),
  loading: document.querySelector("#loading"),

  start: document.querySelector("#start"),
  back: document.querySelector("#back"),
  next: document.querySelector("#next"),

  stepKicker: document.querySelector("#step-kicker"),
  stepTitle: document.querySelector("#step-title"),
  stepCount: document.querySelector("#step-count"),
  progress: document.querySelector("#progress"),
  options: document.querySelector("#options"),

  miniPlan: document.querySelector("#mini-plan"),
  planTitle: document.querySelector("#plan-title"),

  poster: document.querySelector("#poster"),
  copy: document.querySelector("#copy"),
  manual: document.querySelector("#manual"),
  restart: document.querySelector("#restart"),
  toast: document.querySelector("#toast"),

  musicToggle: document.querySelector("#music-toggle"),
  musicLabel: document.querySelector("#music-label")
};

const music = createMusicController({
  button: els.musicToggle,
  label: els.musicLabel
});

els.start?.addEventListener("click", start);
els.back?.addEventListener("click", back);
els.next?.addEventListener("click", next);
els.copy?.addEventListener("click", copyPlan);
els.manual?.addEventListener("click", openManualGate);
els.restart?.addEventListener("click", restart);
els.musicToggle?.addEventListener("click", music.toggle);

render();

function start() {
  removeManualPanel();
  els.manual?.classList.add("hidden");

  switchScreen(els.intro, els.loading);

  window.setTimeout(() => {
    switchScreen(els.loading, els.planner);
    window.scrollTo({ top: 0, behavior: "smooth" });
    render();
  }, 900);
}

function render() {
  normalizeState(state);

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

  els.options.innerHTML = visibleOptions(step).map((option) => {
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
          <h3>${escapeHtml(option.title)}</h3>
          ${option.meta ? `<p>${escapeHtml(option.meta)}</p>` : ""}
          ${option.note ? `<div class="option-note">${escapeHtml(option.note)}</div>` : ""}
        </div>
      </button>
    `;
  }).join("");

  els.options.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => select(step.id, button.dataset.option));
  });
}

function renderMiniPlan() {
  const labels = {
    time: "Time",
    play: "Play",
    food: "Food",
    color: "Outfit"
  };

  const rows = CONFIG.steps.map((step) => {
    const option = selectedOption(step.id);
    const detail = option?.note || option?.meta || "";

    return `
      <div class="mini-row">
        <span>${escapeHtml(labels[step.id] ?? step.id)}</span>
        <strong>${option ? `${option.emoji} ${escapeHtml(option.title)}${detail ? ` · ${escapeHtml(detail)}` : ""}` : "Pending"}</strong>
      </div>
    `;
  });

  const count = CONFIG.steps.filter((step) => selectedOption(step.id)).length;

  els.planTitle.textContent = count === 0 ? "Still choosing" : `${count} selected`;
  els.miniPlan.innerHTML = rows.join("");
}

function select(stepId, optionId) {
  state.selections[stepId] = optionId;

  if (stepId === "time") {
    clearPlayIfTimeChanged(optionId);
  }

  render();
  pulseSelected();
}

function clearPlayIfTimeChanged(selectedTime) {
  const playStep = CONFIG.steps.find((step) => step.id === "play");
  const selectedPlay = playStep?.options.find((option) => option.id === state.selections.play);

  if (!selectedPlay) return;

  const mismatch =
    selectedPlay.slot !== "any" &&
    selectedPlay.slot !== selectedTime;

  if (mismatch) {
    state.selections.play = null;
  }
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
  finalSnapshot = cloneState(state);

  els.poster.innerHTML = renderPoster(CONFIG, finalSnapshot);

  clearState(CONFIG);
  resetWorkingState();
  removeManualPanel();

  els.manual?.classList.toggle("hidden", !isManualUnlocked(finalSnapshot));

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

function restart() {
  clearState(CONFIG);
  finalSnapshot = null;
  resetWorkingState();
  removeManualPanel();

  els.manual?.classList.add("hidden");
  els.toast?.classList.add("hidden");

  switchScreen(els.final, els.intro);
  render();
}

function planText() {
  const sourceState = finalSnapshot ?? state;

  const labels = {
    time: "Time",
    play: "Play",
    food: "Food",
    color: "Outfit"
  };

  const lines = CONFIG.steps.map((step) => {
    const option = selectedOptionFromState(sourceState, step.id);
    const detail = option?.note || option?.meta || "";
    const value = option ? `${option.title}${detail ? ` — ${detail}` : ""}` : "";

    return `${labels[step.id] ?? step.id}: ${value}`;
  });

  return [
    `${CONFIG.event.date}`,
    "",
    ...lines
  ].join("\n");
}

function currentStep() {
  return CONFIG.steps[state.stepIndex];
}

function selectedOption(stepId) {
  return selectedOptionFromState(state, stepId);
}

function selectedOptionFromState(sourceState, stepId) {
  const step = CONFIG.steps.find((item) => item.id === stepId);
  const id = sourceState?.selections?.[stepId];

  return step?.options.find((option) => option.id === id) ?? null;
}

function visibleOptions(step) {
  if (step.id !== "play") return step.options;

  const selectedTime = state.selections.time;

  return step.options.filter((option) => {
    return option.slot === "any" || option.slot === selectedTime;
  });
}

function freshSelections() {
  return Object.fromEntries(CONFIG.steps.map((step) => [step.id, null]));
}

function resetWorkingState() {
  state.stepIndex = 0;
  state.selections = freshSelections();
}

function cloneState(sourceState) {
  return {
    stepIndex: sourceState.stepIndex,
    selections: { ...sourceState.selections }
  };
}

function normalizeState(sourceState) {
  sourceState.stepIndex = Number.isInteger(sourceState.stepIndex)
    ? Math.min(Math.max(sourceState.stepIndex, 0), CONFIG.steps.length - 1)
    : 0;

  sourceState.selections = {
    ...freshSelections(),
    ...(sourceState.selections ?? {})
  };

  const time = sourceState.selections.time;
  const play = selectedOptionFromState(sourceState, "play");

  if (play && play.slot !== "any" && play.slot !== time) {
    sourceState.selections.play = null;
  }
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
