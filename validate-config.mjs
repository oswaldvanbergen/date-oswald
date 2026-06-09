import { CONFIG } from "../src/config.js";

const errors = [];

if (!CONFIG.appName) errors.push("CONFIG.appName is required.");
if (!CONFIG.event?.date) errors.push("CONFIG.event.date is required.");
if (!Array.isArray(CONFIG.steps) || CONFIG.steps.length === 0) {
  errors.push("CONFIG.steps must be a non-empty array.");
}

for (const step of CONFIG.steps ?? []) {
  if (!step.id) errors.push("Each step requires an id.");
  if (!step.title) errors.push(`Step ${step.id} requires a title.`);
  if (!Array.isArray(step.options) || step.options.length === 0) {
    errors.push(`Step ${step.id} requires at least one option.`);
  }

  for (const option of step.options ?? []) {
    for (const field of ["id", "title", "emoji", "gradient"]) {
      if (!option[field]) errors.push(`Option in step ${step.id} missing ${field}.`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("CONFIG validation passed.");
