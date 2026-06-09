const input = document.querySelector("[data-paper-search]");
const cards = Array.from(document.querySelectorAll("[data-paper-card]"));
const empty = document.querySelector("[data-empty-state]");
const filters = Array.from(document.querySelectorAll("[data-filter]"));
let activeFilter = "all";

function applyPaperFilters() {
  const query = input ? input.value.trim().toLowerCase() : "";
  let visibleCount = 0;

  cards.forEach((card) => {
    const text = card.dataset.search || "";
    const matchesQuery = !query || text.includes(query);
    const matchesFilter = activeFilter === "all" || text.includes(activeFilter.toLowerCase());
    const isVisible = matchesQuery && matchesFilter;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (empty) empty.style.display = visibleCount ? "none" : "block";
}

if (input && cards.length) {
  input.addEventListener("input", applyPaperFilters);
}

if (filters.length && cards.length) {
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("is-active"));
      filter.classList.add("is-active");
      activeFilter = filter.dataset.filter || "all";
      applyPaperFilters();
    });
  });
}
