(function () {
  const notes = Array.isArray(window.DSA_NOTES) ? window.DSA_NOTES : [];
  const grid = document.getElementById("notes");
  const countEl = document.getElementById("count");
  const searchEl = document.getElementById("search");
  const tagsEl = document.getElementById("tags");
  const galleryBtn = document.getElementById("view-gallery");
  const listBtn = document.getElementById("view-list");

  const VIEW_KEY = "dsavault-view";
  let view = localStorage.getItem(VIEW_KEY) === "list" ? "list" : "gallery";
  let query = "";
  let activeTag = "all";

  const tags = ["all", ...new Set(notes.flatMap((n) => n.tags || []))];

  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function matches(note) {
    const q = query.trim().toLowerCase();
    const tagOk = activeTag === "all" || (note.tags || []).includes(activeTag);
    if (!tagOk) return false;
    if (!q) return true;
    const hay = [note.title, note.summary, note.badge, ...(note.tags || []), ...(note.features || [])]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }

  function setView(next) {
    view = next;
    localStorage.setItem(VIEW_KEY, next);
    grid.className = next === "list" ? "list" : "gallery";
    galleryBtn.classList.toggle("active", next === "gallery");
    listBtn.classList.toggle("active", next === "list");
    galleryBtn.setAttribute("aria-pressed", String(next === "gallery"));
    listBtn.setAttribute("aria-pressed", String(next === "list"));
  }

  function renderTags() {
    tagsEl.innerHTML = tags
      .map(
        (tag) =>
          `<button type="button" class="tag${tag === activeTag ? " active" : ""}" data-tag="${tag}">${
            tag === "all" ? "All topics" : tag
          }</button>`
      )
      .join("");
  }

  function card(note) {
    const slug = note.path || note.id;
    const href = `notes/${encodeURI(slug)}/`;
    const tagsHtml = (note.tags || []).map((t) => `<span>${t}</span>`).join("");
    return `
      <a class="card" href="${href}" style="--accent:${note.accent || "#d97706"}">
        <span class="card-top" aria-hidden="true"></span>
        <span class="card-body">
          <span class="card-meta">
            ${note.badge ? `<span class="badge">${note.badge}</span>` : `<span></span>`}
            <time datetime="${note.date || ""}">${formatDate(note.date)}</time>
          </span>
          <h2>${note.title}</h2>
          <p>${note.summary || ""}</p>
          <span class="card-tags">${tagsHtml}</span>
        </span>
      </a>`;
  }

  function render() {
    const shown = notes.filter(matches).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    countEl.textContent = `${shown.length} note${shown.length === 1 ? "" : "s"}`;
    if (!shown.length) {
      grid.innerHTML = `<div class="empty">No notes match that filter. Clear search or pick another topic.</div>`;
      return;
    }
    grid.innerHTML = shown.map(card).join("");
  }

  tagsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tag]");
    if (!btn) return;
    activeTag = btn.getAttribute("data-tag");
    renderTags();
    render();
  });

  searchEl.addEventListener("input", () => {
    query = searchEl.value;
    render();
  });

  galleryBtn.addEventListener("click", () => setView("gallery"));
  listBtn.addEventListener("click", () => setView("list"));

  setView(view);
  renderTags();
  render();
})();
