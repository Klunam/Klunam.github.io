// ---------- Dark mode toggle ----------
const desktopBtn = document.getElementById("theme-toggle-desktop");
desktopBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  desktopBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

const mobileBtn = document.getElementById("theme-toggle-mobile");
mobileBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  mobileBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});

// ---------- Skill bars: fill in once scrolled into view ----------
const skillRows = document.querySelectorAll("#skills-bars .skill-row");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector(".skill-bar-fill");
        fill.style.width = entry.target.dataset.percent + "%";
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);
skillRows.forEach((row) => skillObserver.observe(row));

// ---------- Sections + project cards: fade in on scroll ----------
// ---------- Sections + project cards: fade in on scroll ----------
const fadeTargets = document.querySelectorAll(".fade-section, .card-project");
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0 }, // Triggers immediately as soon as 1px is in view
);
fadeTargets.forEach((el) => fadeObserver.observe(el));
