export function createMusicController({ button, label }) {
  let ctx = null;
  let timer = null;
  let index = 0;
  let active = false;

  const melody = [
    ["C5", 0.64], ["E5", 0.58], ["G5", 0.78], [null, 0.16],
    ["E5", 0.58], ["D5", 0.58], ["C5", 0.96], [null, 0.28],
    ["A4", 0.62], ["C5", 0.58], ["F5", 0.80], [null, 0.18],
    ["E5", 0.58], ["D5", 0.58], ["C5", 1.04], [null, 0.34]
  ];

  const bass = ["C3", "G2", "A2", "F2"];

  async function toggle() {
    active ? stop() : await start();
  }

  async function start() {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) {
        label.textContent = "music unsupported";
        return;
      }

      ctx = ctx || new Audio();

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      active = true;
      index = 0;
      button.setAttribute("aria-pressed", "true");
      label.textContent = "music on";
      schedule();
    } catch {
      active = false;
      button.setAttribute("aria-pressed", "false");
      label.textContent = "tap again";
    }
  }

  function stop() {
    active = false;
    clearTimeout(timer);
    button.setAttribute("aria-pressed", "false");
    label.textContent = "music off";
  }

  function schedule() {
    if (!active || !ctx) return;
    const [note, duration] = melody[index % melody.length];
    const bassNote = bass[Math.floor(index / 4) % bass.length];
    if (note) play(note, 0.24, "triangle", 0.038);
    if (index % 4 === 0) play(bassNote, 0.38, "sine", 0.03);
    index += 1;
    timer = setTimeout(schedule, duration * 1000);
  }

  function play(note, length, type, volume) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.value = frequency(note);

    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.7;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.001, now + length);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + length + 0.03);
  }

  return { toggle, start, stop };
}

function frequency(note) {
  const semitones = {
    C: -9, "C#": -8, D: -7, "D#": -6, E: -5, F: -4,
    "F#": -3, G: -2, "G#": -1, A: 0, "A#": 1, B: 2
  };
  const [, pitch, octave] = note.match(/^([A-G]#?)(\d)$/);
  return 440 * Math.pow(2, (semitones[pitch] + (Number(octave) - 4) * 12) / 12);
}
