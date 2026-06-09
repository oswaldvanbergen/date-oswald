export function readState(config) {
  try {
    const raw = localStorage.getItem(key(config));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeState(config, state) {
  try {
    localStorage.setItem(key(config), JSON.stringify(state));
  } catch {}
}

export function clearState(config) {
  try {
    localStorage.removeItem(key(config));
  } catch {}
}

function key(config) {
  return `${config.appName}:state:v1`;
}
