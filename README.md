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

## Cloud Agent environment

This repository is configured for Cursor Cloud Agents via
[`.cursor/environment.json`](.cursor/environment.json): dependencies are
installed with `npm install`, and the dev server runs in a persistent
terminal on port `5173`.
