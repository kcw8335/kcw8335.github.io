const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

const prefersReducedMotion = () => reduceMotionQuery.matches;

function getStoredPreference(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStoredPreference(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Preferences remain optional when storage is unavailable.
  }
}

function initRevealAnimations() {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

  const selectors = [
    ".home-hero__copy > *",
    ".research-console",
    ".research-stats > div",
    ".section-heading > *",
    ".insight-grid > article",
    ".featured-card",
    ".paper-card",
    ".guide-grid > li",
    ".section-cta",
    ".page-hero__copy > *",
    ".page-hero__aside",
    ".method-card",
    ".path-card",
    ".roadmap-card",
    ".workflow-card",
    ".evidence-row",
    ".review-list__item",
    ".model-panel",
    ".command-panel",
    ".paper-hero > *",
    ".paper-rail > *",
    ".paper-content > h2",
    ".paper-content > blockquote:not(:first-child)",
    ".paper-content > table",
    ".paper-content > pre",
    ".paper-end",
  ];

  const elements = Array.from(
    new Set(document.querySelectorAll(selectors.join(",")))
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8%",
      threshold: 0.08,
    }
  );
  const initialViewport = window.innerHeight * 0.92;

  elements.forEach((element, index) => {
    element.style.setProperty("--reveal-order", String(index % 4));
    element.classList.add("reveal-item");

    if (element.getBoundingClientRect().top <= initialViewport) {
      element.classList.add("is-revealed");
      return;
    }

    observer.observe(element);
  });

  document.addEventListener("focusin", (event) => {
    const revealTarget = event.target.closest(".reveal-item");
    if (!revealTarget) return;
    revealTarget.classList.add("is-revealed");
    observer.unobserve(revealTarget);
  });
}

function initPointerEffects() {
  if (prefersReducedMotion() || !finePointerQuery.matches) return;

  document.querySelectorAll(".paper-card").forEach((card) => {
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;

      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        card.style.setProperty("--pointer-x", `${pointerX}px`);
        card.style.setProperty("--pointer-y", `${pointerY}px`);
        frame = 0;
      });
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--pointer-x");
      card.style.removeProperty("--pointer-y");
    });
  });
}

function initLibrary() {
  const library = document.querySelector("[data-paper-library]");
  if (!library) return;

  const input = library.querySelector("[data-paper-search]");
  const clearButton = library.querySelector("[data-search-clear]");
  const sortSelect = library.querySelector("[data-paper-sort]");
  const grid = library.querySelector("[data-paper-grid]");
  const cards = Array.from(library.querySelectorAll("[data-paper-card]"));
  const filters = Array.from(library.querySelectorAll("[data-filter]"));
  const viewButtons = Array.from(library.querySelectorAll("[data-library-view]"));
  const resultCount = library.querySelector("[data-result-count]");
  const emptyState = library.querySelector("[data-empty-state]");
  const resetButtons = Array.from(
    library.querySelectorAll("[data-reset-library], [data-empty-reset]")
  );
  const params = new URLSearchParams(window.location.search);
  const validSorts = ["rank", "newest", "oldest", "updated"];
  const validViews = ["grid", "list"];
  const normalize = (value) =>
    (value || "").normalize("NFKC").trim().toLowerCase();
  let activeFilter = filters.some(
    (filter) => filter.dataset.filter === params.get("topic")
  )
    ? params.get("topic")
    : "all";
  let activeView = validViews.includes(params.get("view"))
    ? params.get("view")
    : getStoredPreference("coin-study-library-view") || "grid";
  let sortRevision = 0;
  let cardTransitionRevision = 0;

  if (!validViews.includes(activeView)) activeView = "grid";
  if (input) input.value = params.get("q") || "";
  if (sortSelect) {
    sortSelect.value = validSorts.includes(params.get("sort"))
      ? params.get("sort")
      : "rank";
  }

  const getFilterTags = () =>
    activeFilter === "all"
      ? []
      : activeFilter.split(",").map(normalize).filter(Boolean);

  function syncUrlState() {
    const nextParams = new URLSearchParams(window.location.search);
    const query = input ? input.value.trim() : "";
    const sort = sortSelect ? sortSelect.value : "rank";

    if (query) nextParams.set("q", query);
    else nextParams.delete("q");

    if (activeFilter !== "all") nextParams.set("topic", activeFilter);
    else nextParams.delete("topic");

    if (sort !== "rank") nextParams.set("sort", sort);
    else nextParams.delete("sort");

    if (activeView !== "grid") nextParams.set("view", activeView);
    else nextParams.delete("view");

    const queryString = nextParams.toString();
    const nextUrl = `${window.location.pathname}${
      queryString ? `?${queryString}` : ""
    }${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }

  function animateVisibleCards(targetCards = cards) {
    if (prefersReducedMotion()) return;

    targetCards
      .filter(
        (card) =>
          !card.hidden &&
          card.classList.contains("is-revealed") &&
          typeof card.animate === "function"
      )
      .forEach((card, index) => {
        card.animate(
          [
            { opacity: 0.45, transform: "translateY(8px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 260,
            delay: Math.min(index * 28, 140),
            easing: "cubic-bezier(0.2, 0.72, 0.2, 1)",
          }
        );
      });
  }

  function runCardTransition(update) {
    if (
      prefersReducedMotion() ||
      typeof document.startViewTransition !== "function"
    ) {
      update();
      return null;
    }

    const revision = ++cardTransitionRevision;
    document.documentElement.classList.add("is-library-transition");
    cards.forEach((card, index) => {
      const rank = card.dataset.rank || String(index);
      card.style.viewTransitionName = `paper-card-${rank}`;
    });

    const transition = document.startViewTransition(update);
    const clearTransitionNames = () => {
      if (revision !== cardTransitionRevision) return;
      cards.forEach((card) => {
        card.style.viewTransitionName = "";
      });
      document.documentElement.classList.remove("is-library-transition");
    };
    transition.finished.then(clearTransitionNames, clearTransitionNames);
    return transition;
  }

  function applyPaperFilters({ animate = true, syncUrl = true } = {}) {
    const queryTokens = normalize(input ? input.value : "")
      .split(/\s+/)
      .filter(Boolean);
    const filterTags = getFilterTags();
    let visibleCount = 0;
    const newlyVisibleCards = [];

    cards.forEach((card) => {
      const wasHidden = card.hidden;
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
      if (isVisible && wasHidden) newlyVisibleCards.push(card);
    });

    if (resultCount) resultCount.textContent = String(visibleCount);
    if (emptyState) emptyState.hidden = visibleCount !== 0;
    if (clearButton) clearButton.hidden = !input || input.value.length === 0;
    if (animate && newlyVisibleCards.length) {
      animateVisibleCards(newlyVisibleCards);
    }
    if (syncUrl) syncUrlState();
  }

  function updateFilterButtons() {
    filters.forEach((filter) => {
      const isActive = filter.dataset.filter === activeFilter;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setActiveFilter(
    value,
    { animate = true, syncUrl = true } = {}
  ) {
    activeFilter = value || "all";
    updateFilterButtons();
    applyPaperFilters({ animate, syncUrl });
  }

  function getSortedCards(value) {
    return [...cards].sort((a, b) => {
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
  }

  function sortPapers(value, { animate = true, syncUrl = true } = {}) {
    const revision = ++sortRevision;
    const update = () => {
      if (revision !== sortRevision) return;
      getSortedCards(value).forEach((card) => grid.append(card));
    };

    const transition = animate ? runCardTransition(update) : null;
    if (!animate) update();
    if (animate && !transition) animateVisibleCards();
    if (syncUrl) syncUrlState();
  }

  function updateViewButtons() {
    viewButtons.forEach((button) => {
      const isActive = button.dataset.libraryView === activeView;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function setLibraryView(
    view,
    { animate = true, persist = true, syncUrl = true } = {}
  ) {
    activeView = validViews.includes(view) ? view : "grid";
    const update = () => {
      grid.classList.toggle("is-list-view", activeView === "list");
      updateViewButtons();
    };

    if (animate) runCardTransition(update);
    else update();

    if (persist) {
      setStoredPreference("coin-study-library-view", activeView);
    }
    if (syncUrl) syncUrlState();
  }

  function resetLibrary() {
    if (input) input.value = "";
    if (sortSelect) sortSelect.value = "rank";
    activeFilter = "all";
    sortPapers("rank", { animate: false, syncUrl: false });
    updateFilterButtons();
    applyPaperFilters({ animate: true, syncUrl: true });
    if (input) input.focus();
  }

  if (input) {
    input.addEventListener("input", () => applyPaperFilters());
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
    });
  }

  viewButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      setLibraryView(button.dataset.libraryView);
    });

    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + viewButtons.length) % viewButtons.length;
      viewButtons[nextIndex].focus();
      setLibraryView(viewButtons[nextIndex].dataset.libraryView);
    });
  });

  resetButtons.forEach((button) => {
    button.addEventListener("click", resetLibrary);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key !== "/" ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.target.matches("input, textarea, select, [contenteditable='true']")
    ) {
      return;
    }

    event.preventDefault();
    library.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    input.focus();
  });

  updateFilterButtons();
  sortPapers(sortSelect ? sortSelect.value : "rank", {
    animate: false,
    syncUrl: false,
  });
  setLibraryView(activeView, {
    animate: false,
    persist: false,
    syncUrl: false,
  });
  applyPaperFilters({ animate: false, syncUrl: false });
}

function initPaperTools() {
  const content = document.querySelector(".paper-content");
  const tocContainers = Array.from(document.querySelectorAll("[data-paper-toc]"));
  const copyButton = document.querySelector("[data-copy-link]");
  const headings = content
    ? Array.from(content.querySelectorAll("h2, h3"))
    : [];
  const tocLinks = [];

  if (headings.length >= 2) {
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `section-${String(index + 1).padStart(2, "0")}`;
      }
    });

    tocContainers.forEach((container) => {
      const list = container.querySelector("[data-toc-list]");
      if (!list) return;
      list.replaceChildren();
      let currentSectionItem = null;
      let currentSublist = null;

      headings.forEach((heading) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        item.className = `toc-level-${heading.tagName === "H3" ? "3" : "2"}`;
        link.href = `#${heading.id}`;
        link.dataset.tocTarget = heading.id;
        link.textContent = heading.textContent.trim();
        item.append(link);

        if (heading.tagName === "H3" && currentSectionItem) {
          if (!currentSublist) {
            currentSublist = document.createElement("ol");
            currentSublist.className = "toc-sublist";
            currentSectionItem.append(currentSublist);
          }
          currentSublist.append(item);
        } else {
          list.append(item);
          currentSectionItem = heading.tagName === "H2" ? item : null;
          currentSublist = null;
        }
        tocLinks.push(link);
      });

      container.hidden = false;
    });
  }

  if (copyButton) {
    const copyLabel = copyButton.querySelector("[data-copy-label]");
    const canonical =
      document.querySelector("link[rel='canonical']")?.href ||
      `${window.location.origin}${window.location.pathname}`;
    let resetTimer = 0;

    copyButton.addEventListener("click", async () => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(canonical);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = canonical;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.append(textarea);
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
        }

        copyLabel.textContent = "복사됨";
        copyButton.classList.add("is-copied");
      } catch {
        copyLabel.textContent = "복사 실패";
      }

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        copyLabel.textContent = "링크 복사";
        copyButton.classList.remove("is-copied");
      }, 1800);
    });
  }

  return { content, headings, tocLinks };
}

function initScrollUi(paperState) {
  const header = document.querySelector("[data-site-header]");
  const backToTop = document.querySelector("[data-back-to-top]");
  const main = document.querySelector("[data-page-main]");
  const readingArticle = document.querySelector("[data-reading-article]");
  const readingProgress = document.querySelector("[data-reading-progress]");
  const headings = paperState?.headings || [];
  const tocLinks = paperState?.tocLinks || [];
  let articleTop = 0;
  let readableDistance = 1;
  let headingOffsets = [];
  let scrollFrame = 0;
  let hideBackTimer = 0;

  function measure() {
    if (readingArticle) {
      const rect = readingArticle.getBoundingClientRect();
      articleTop = rect.top + window.scrollY;
      readableDistance = Math.max(
        readingArticle.offsetHeight - window.innerHeight,
        1
      );
    }

    headingOffsets = headings.map(
      (heading) => heading.getBoundingClientRect().top + window.scrollY
    );
  }

  function setBackToTopVisible(isVisible) {
    if (!backToTop) return;
    window.clearTimeout(hideBackTimer);

    if (isVisible) {
      if (backToTop.hidden) {
        backToTop.hidden = false;
        window.requestAnimationFrame(() => {
          backToTop.classList.add("is-visible");
        });
      } else {
        backToTop.classList.add("is-visible");
      }
      return;
    }

    if (backToTop.contains(document.activeElement)) return;
    backToTop.classList.remove("is-visible");
    hideBackTimer = window.setTimeout(() => {
      if (!backToTop.classList.contains("is-visible")) {
        backToTop.hidden = true;
      }
    }, 180);
  }

  function update() {
    const scrollY = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", scrollY > 18);
    setBackToTopVisible(scrollY > Math.max(520, window.innerHeight * 0.75));

    if (readingArticle && readingProgress) {
      const progress = Math.min(
        Math.max((scrollY - articleTop) / readableDistance, 0),
        1
      );
      readingProgress.style.transform = `scaleX(${progress})`;
    }

    if (headingOffsets.length && tocLinks.length) {
      const marker = scrollY + window.innerHeight * 0.28;
      let activeIndex = -1;

      headingOffsets.forEach((offset, index) => {
        if (offset <= marker) activeIndex = index;
      });

      const activeId = activeIndex >= 0 ? headings[activeIndex]?.id : null;
      tocLinks.forEach((link) => {
        const isActive = link.dataset.tocTarget === activeId;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    scrollFrame = 0;
  }

  function scheduleUpdate() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(update);
  }

  function measureAndUpdate() {
    measure();
    scheduleUpdate();
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", measureAndUpdate);

  if ("ResizeObserver" in window && readingArticle) {
    const resizeObserver = new ResizeObserver(measureAndUpdate);
    resizeObserver.observe(readingArticle);
  }

  if (backToTop) {
    backToTop.addEventListener("focusout", scheduleUpdate);
    backToTop.addEventListener("click", () => {
      if (main) main.focus({ preventScroll: true });
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  }

  measureAndUpdate();
}

initRevealAnimations();
initLibrary();
initPointerEffects();
const paperState = initPaperTools();
initScrollUi(paperState);
document.documentElement.classList.add("has-js");
