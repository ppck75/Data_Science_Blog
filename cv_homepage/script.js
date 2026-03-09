const sectionLinks = [...document.querySelectorAll(".section-nav a")];
const topLinks = [...document.querySelectorAll(".topnav a[href^='#']")];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const toTopButton = document.querySelector(".to-top");

const syncActiveSection = () => {
  const checkpoint = window.scrollY + window.innerHeight * 0.22;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= checkpoint) {
      activeId = section.id;
    }
  });

  sectionLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });

  topLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
};

window.addEventListener("scroll", syncActiveSection, { passive: true });
window.addEventListener("load", syncActiveSection);

toTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
