# Troubleshooting

## Start button does nothing

Use this fixed version. `index.html` now loads `src/app.bundle.js`, not ES modules, so it works under `file://`.

## Music button says on but no sound

Browsers require a real tap before sound starts. This version calls `AudioContext.resume()` inside the tap handler. Check that your browser tab is not muted and system volume is on.

## Recommended way to preview

Double-click `index.html`, or run:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.


## Final poster reset behavior

When the final poster appears:

1. DateQuest takes a snapshot of the selected choices.
2. The poster and copy/share text use that snapshot.
3. Saved choices are cleared immediately from localStorage.
4. The next visit starts fresh.

This prevents stale selections from carrying over while keeping the final confirmation screen intact.
