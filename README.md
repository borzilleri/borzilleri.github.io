# borzilleri.net

A static links page. No JavaScript at runtime, no dependencies.

## Layout

| Path | Purpose |
| --- | --- |
| `data/site.json` | Page title, name, footer, and the list of links (`type`, `label`, `url`). |
| `src/icons/` | One SVG per link type, inlined at build time. |
| `src/theme.css` | Every colour in the site, including per-type brand colours. |
| `src/style.css` | Layout and structure. |
| `src/template.html` | Page shell. |
| `build.mjs` | Renders `dist/`. |

## Build

```sh
node build.mjs        # writes dist/
```

Preview with any static server, e.g. `npx serve dist`.

## Adding a link

1. Add an entry to `links` in `data/site.json`.
2. Add `src/icons/<type>.svg` (use `fill="currentcolor"`).
3. Optionally add `.link-<type> { --link-bg: #hex; }` to `src/theme.css`; without it the
   link uses the default accent colour.

## Theming

`src/theme.css` holds all colours as custom properties — `--bg`, `--fg`, `--muted`,
`--link-bg`, `--link-fg` — with a `prefers-color-scheme: dark` override.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push
to `main`. Set Pages → Build and deployment → Source to **GitHub Actions** in repo settings.
