# DsaVault

A static site for publishing interactive DSA notes. Anyone can browse the index; each note is a self-contained HTML page.

Notes use **folder URLs**, not filenames. A page lives at `notes/<slug>/index.html` and is opened as `/notes/<slug>/`.

## Local preview

From the repo root:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`. Example note: `http://localhost:8080/notes/array-techniques/`.

Opening `index.html` as a `file://` URL can break relative folder links; use the local server.

## Publish on GitHub Pages

1. Push this repo to GitHub.
2. Repo **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main` (or `master`), folder: `/ (root)`.
5. Save. The site will be at `https://<user>.github.io/<repo>/`.

No build step. `.nojekyll` is included so GitHub does not run Jekyll on these files.

## Add a note

Visitors never see this on the site. To publish a new masterclass:

1. Create a folder named with a clean slug, then copy the template into it:

   ```bash
   mkdir notes/graphs-bfs-dfs
   cp notes/TEMPLATE.html notes/graphs-bfs-dfs/index.html
   ```

   The public URL will be `/notes/graphs-bfs-dfs/`.

2. Write the page. Keep the **← DsaVault** link as `../../` (two levels up from `notes/<slug>/index.html`).

3. Register it in `assets/catalog.js` by appending an object. `path` must match the folder name:

```js
{
  id: "graphs-bfs-dfs",
  path: "graphs-bfs-dfs",
  title: "Graphs: BFS & DFS",
  summary: "One or two sentences visitors will see on the index.",
  tags: ["graphs", "bfs", "dfs"],
  features: ["Visualizer", "Quiz"],
  badge: "Masterclass",
  date: "2026-08-21",
  accent: "#4f46e5",
}
```

4. Commit and push. The index gallery and list pick it up from the catalog.

## Layout

| Path | Role |
| --- | --- |
| `index.html` | Public gallery / list (`/`) |
| `assets/catalog.js` | Registry of published notes |
| `notes/<slug>/index.html` | A note, served as `/notes/<slug>/` |
| `notes/TEMPLATE.html` | Starter page — copy into a new slug folder |
| `assets/` | Hub CSS and JS |
