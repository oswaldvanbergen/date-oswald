import { escapeHtml } from "./utils.js";

export function renderPoster(config, state) {
  const rows = config.steps.map((step) => {
    const option = findOption(step, state.selections[step.id]);
    return [step.id, option ? `${option.emoji} ${option.title}` : ""];
  });

  return `
    <div class="poster-hero">
      <div class="poster-rainbow" aria-hidden="true"></div>
      <img src="assets/vintage-cowboy-doll.jpg" alt="">
      <img src="assets/retro-galactic-hero.jpg" alt="">
      <img src="assets/silly-spud-toy.jpg" alt="">
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

    <div class="poster-footer">
      Thanks for choosing. I’m happy you got a say in the plan.
    </div>
  `;
}

function findOption(step, optionId) {
  return step.options.find((option) => option.id === optionId);
}
