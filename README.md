# my_website

Personal design-portfolio website for Lyubov, built with [Vite](https://vite.dev), [React 19](https://react.dev), and TypeScript.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot module replacement. |
| `npm run build` | Type-check (`tsc -b`) and produce a production build in `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Lint the codebase with [oxlint](https://oxc.rs). |

## Project structure

```
index.html          # App entry HTML + fonts
src/main.tsx        # React entry point
src/App.tsx         # Landing page (hero, work, about, contact form)
src/App.css         # Component styles + light/dark theme tokens
src/index.css       # Base/reset styles
public/favicon.svg  # Site icon
```

## Deployment (public link via GitHub Pages)

The site is published to GitHub Pages by the workflow in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). On every push to
`main` it runs `npm ci && npm run build` and publishes `dist/`.

One-time setup: in the GitHub repo, open **Settings → Pages** and set
**Source** to **GitHub Actions**. After the next push to `main`, the site is
available at:

```
https://lyubov-dotcom.github.io/my_website/
```

The production build uses `base: '/my_website/'` (see `vite.config.ts`) so assets
resolve under that path; local `dev`/`preview` keep using `/`.

## Cloud Agent environment

This repository is configured for Cursor Cloud Agents via
[`.cursor/environment.json`](.cursor/environment.json): dependencies are
installed with `npm install`, and the dev server runs in a persistent
terminal on port `5173`.
