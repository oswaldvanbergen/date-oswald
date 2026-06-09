# DateQuest

DateQuest is a tiny open-source date invitation builder.

It is intentionally small: no framework, no build step, no dependencies. The product goal is to create a slower, calmer, more emotionally intentional experience than a normal form. The user chooses a time, a play, food, and outfit color. The app turns those choices into a final poster.

## Demo flow

1. Choose a time
2. Choose a play
3. Choose food + dessert
4. Choose outfit color
5. Receive a final poster summary

## Design direction

DateQuest uses a nostalgic toy-box visual language:

- soft sky and beach tones
- rainbow progress bar
- original SVG toy characters
- calm 1990s-inspired chiptune
- final-poster payoff screen

The assets are original and intentionally avoid copyrighted character likenesses, logos, and official franchise designs.

## Quick start

Open `index.html` directly in a browser.

Or run a local server:

```bash
npm run start
```

Then open:

```text
http://localhost:8080
```

## Validate config

```bash
npm run validate
```

## Customize the content

Edit:

```text
src/config.js
```

Most changes should happen there. You can change:

- date
- steps
- option titles
- descriptions
- tags
- gradients
- recommended option

## Project structure

```text
datequest/
├─ assets/
│  ├─ retro-galactic-hero.jpg
│  ├─ vintage-cowboy-doll.jpg
│  └─ silly-spud-toy.jpg
├─ src/
│  ├─ app.js
│  ├─ audio.js
│  ├─ config.js
│  ├─ poster.js
│  ├─ storage.js
│  └─ utils.js
├─ scripts/
│  └─ validate-config.mjs
├─ index.html
├─ styles.css
├─ manifest.json
└─ package.json
```

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow in:

```text
.github/workflows/pages.yml
```

Enable GitHub Pages in your repository settings and select GitHub Actions as the source.

## Accessibility

DateQuest uses semantic buttons, visible focus states, reduced-motion support, readable contrast, and keyboard-operable selection cards.

## License

MIT


## Direct open support

`index.html` loads `src/app.bundle.js`, so the app works when opened directly from your file system. The modular files remain in `src/` for editing and readability.


## Final confirmation behavior

After the final poster is generated, DateQuest clears saved choices. The poster still shows the selected plan, but the next visit starts fresh.
