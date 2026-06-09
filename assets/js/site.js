const input = document.querySelector("[data-paper-search]");
const cards = Array.from(document.querySelectorAll("[data-paper-card]"));
const empty = document.querySelector("[data-empty-state]");

function applyPaperFilters() {
  const query = input ? input.value.trim().toLowerCase() : "";
  let visibleCount = 0;

  cards.forEach((card) => {
    const text = card.dataset.search || "";
    const matchesQuery = !query || text.includes(query);
    card.hidden = !matchesQuery;
    if (matchesQuery) visibleCount += 1;
  });

  if (empty) empty.style.display = visibleCount ? "none" : "block";
}

if (input && cards.length) {
  input.addEventListener("input", applyPaperFilters);
}
