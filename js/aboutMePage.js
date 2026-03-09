let aboutMePageCleanup = null;

function cleanupCustomPageBehaviors() {
  if (typeof aboutMePageCleanup === "function") {
    aboutMePageCleanup();
  }

  aboutMePageCleanup = null;
}

function initializeCustomPageBehaviors(container = document) {
  cleanupCustomPageBehaviors();

  const root = container.querySelector("[data-about-me-page]");
  if (!root) {
    return;
  }

  const navLinks = [...root.querySelectorAll(".am-nav a[href^='#']")];
  const sections = navLinks
    .map((link) => root.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const toTopButton = root.querySelector(".am-to-top");

  if (sections.length === 0) {
    return;
  }

  const syncActiveSection = () => {
    const checkpoint = window.scrollY + 180;
    let activeId = sections[0].id;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= checkpoint) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-current",
        link.getAttribute("href") === `#${activeId}`
      );
    });
  };

  const syncTopButton = () => {
    if (!toTopButton) {
      return;
    }

    const revealOffset = root.getBoundingClientRect().top + window.scrollY + 180;
    toTopButton.classList.toggle("is-visible", window.scrollY > revealOffset);
  };

  const onScroll = () => {
    syncActiveSection();
    syncTopButton();
  };

  const onTopButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  if (toTopButton) {
    toTopButton.addEventListener("click", onTopButtonClick);
  }

  syncActiveSection();
  syncTopButton();

  aboutMePageCleanup = () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);

    if (toTopButton) {
      toTopButton.removeEventListener("click", onTopButtonClick);
    }
  };
}
