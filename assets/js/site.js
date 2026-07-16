const library = document.querySelector("[data-paper-library]");

if (library) {
  const input = library.querySelector("[data-paper-search]");
  const clearButton = library.querySelector("[data-search-clear]");
  const sortSelect = library.querySelector("[data-paper-sort]");
  const grid = library.querySelector("[data-paper-grid]");
  const cards = Array.from(library.querySelectorAll("[data-paper-card]"));
  const filters = Array.from(library.querySelectorAll("[data-filter]"));
  const resultCount = library.querySelector("[data-result-count]");
  const emptyState = library.querySelector("[data-empty-state]");
  const resetButtons = Array.from(
    library.querySelectorAll("[data-reset-library], [data-empty-reset]")
  );
  let activeFilter = "all";

  const normalize = (value) =>
    (value || "").normalize("NFKC").trim().toLowerCase();

  const getFilterTags = () =>
    activeFilter === "all"
      ? []
      : activeFilter.split(",").map(normalize).filter(Boolean);

  function applyPaperFilters() {
    const queryTokens = normalize(input ? input.value : "")
      .split(/\s+/)
      .filter(Boolean);
    const filterTags = getFilterTags();
    let visibleCount = 0;

    cards.forEach((card) => {
      const searchableText = normalize(card.dataset.search);
      const tags = normalize(card.dataset.tags).split(",").filter(Boolean);
      const matchesQuery =
        queryTokens.length === 0 ||
        queryTokens.every((token) => searchableText.includes(token));
      const matchesFilter =
        filterTags.length === 0 ||
        filterTags.some((filterTag) => tags.includes(filterTag));
      const isVisible = matchesQuery && matchesFilter;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (resultCount) resultCount.textContent = String(visibleCount);
    if (emptyState) emptyState.hidden = visibleCount !== 0;
    if (clearButton) clearButton.hidden = !input || input.value.length === 0;
  }

  function setActiveFilter(value) {
    activeFilter = value || "all";
    filters.forEach((filter) => {
      const isActive = filter.dataset.filter === activeFilter;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    applyPaperFilters();
  }

  function sortPapers(value) {
    const sortedCards = [...cards].sort((a, b) => {
      if (value === "newest") {
        return Number(b.dataset.year) - Number(a.dataset.year);
      }

      if (value === "oldest") {
        return Number(a.dataset.year) - Number(b.dataset.year);
      }

      if (value === "updated") {
        return (b.dataset.updated || "").localeCompare(a.dataset.updated || "");
      }

      return Number(a.dataset.rank) - Number(b.dataset.rank);
    });

    sortedCards.forEach((card) => grid.append(card));
  }

  function resetLibrary() {
    if (input) input.value = "";
    if (sortSelect) sortSelect.value = "rank";
    sortPapers("rank");
    setActiveFilter("all");
    if (input) input.focus();
  }

  if (input) {
    input.addEventListener("input", applyPaperFilters);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && input.value) {
        input.value = "";
        applyPaperFilters();
      }
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      input.value = "";
      input.focus();
      applyPaperFilters();
    });
  }

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      setActiveFilter(filter.dataset.filter || "all");
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      sortPapers(sortSelect.value);
      applyPaperFilters();
    });
  }

  resetButtons.forEach((button) => {
    button.addEventListener("click", resetLibrary);
  });

  applyPaperFilters();
}

const readingArticle = document.querySelector("[data-reading-article]");
const readingProgress = document.querySelector("[data-reading-progress]");

if (readingArticle && readingProgress) {
  let ticking = false;

  function updateReadingProgress() {
    const articleTop = readingArticle.offsetTop;
    const readableDistance = Math.max(
      readingArticle.offsetHeight - window.innerHeight,
      1
    );
    const progress = Math.min(
      Math.max((window.scrollY - articleTop) / readableDistance, 0),
      1
    );

    readingProgress.style.transform = `scaleX(${progress})`;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateReadingProgress);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateReadingProgress();
}
