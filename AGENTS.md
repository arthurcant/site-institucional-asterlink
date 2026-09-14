# Repository Guidelines

## Project Structure & Module Organization

The public site is kept at the repository root: `index.html` defines the page, `style.css` contains layout and theme rules, and `interect.js` handles navigation state and contact-form submission. Static images and SVGs live under `assets/`, grouped by purpose such as `backgroundEImgens/`, `IconesDeRedeSociais/`, and `logoDaEmpresa/`. The contact API is a separate CommonJS Node application in `backend-contato/`; its entry point is `server.js` and its dependencies are declared in `backend-contato/package.json`.

## Build, Test, and Development Commands

Run backend commands from `backend-contato/` unless noted:

- `npm install` installs Express, CORS, dotenv, and Nodemailer from the lockfile.
- `node server.js` starts the contact API at `http://localhost:3000` by default.
- `python -m http.server 8080` from the repository root serves the static site at `http://localhost:8080`.
- `npm test` is currently a placeholder that exits with an error; replace it when automated tests are introduced.

No compilation step is required. Keep the frontend API URL aligned with the backend port during local development.

## Coding Style & Naming Conventions

Use two-space indentation in JavaScript and HTML, single quotes in JavaScript, trailing semicolons, and trailing commas in multiline objects. Keep backend code compatible with CommonJS (`require`). Prefer `camelCase` for JavaScript variables and functions, descriptive kebab-case for new CSS classes, and existing Portuguese field names when working with the contact payload. Reuse the CSS custom properties in `:root` rather than duplicating brand colors. No formatter or linter is configured, so match nearby code and review diffs for consistency.

## Testing Guidelines

There is no automated test suite or coverage requirement yet. Before submitting changes, load the site at common mobile and desktop widths, verify anchor navigation, and submit the contact form against the local API. For backend changes, check success, missing `nome`/`email` (HTTP 400), and mail-provider failure (HTTP 500). Place future tests under `backend-contato/test/` and name them `*.test.js`.

## Commit & Pull Request Guidelines

History currently contains one descriptive, lowercase commit; use short imperative messages such as `fix contact form validation`. Keep commits focused. Pull requests should summarize behavior changes, list manual verification steps, link related issues, and include screenshots for visual changes.

## Security & Configuration

Create a root `.env` from `.env.example` with the Zoho SMTP settings, mailbox address, application-specific password, and optionally `PORT`/`CORS_ORIGIN`. Never commit credentials; root and backend `.env` files are ignored. Treat form input as untrusted and avoid logging secrets or complete contact submissions.
