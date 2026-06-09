const input = document.querySelector("[data-paper-search]");
const cards = Array.from(document.querySelectorAll("[data-paper-card]"));
const empty = document.querySelector("[data-empty-state]");

if (input && cards.length) {
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const text = card.dataset.search || "";
      const isVisible = !query || text.includes(query);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (empty) empty.style.display = visibleCount ? "none" : "block";
  });
}

