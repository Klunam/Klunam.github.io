document.addEventListener("DOMContentLoaded", () => {
  // ---------- Dark mode toggle ----------
  const desktopBtn = document.getElementById("theme-toggle-desktop");
  const mobileBtn = document.getElementById("theme-toggle-mobile");

  function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    if (desktopBtn) {
      desktopBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
    if (mobileBtn) {
      mobileBtn.textContent = isDark ? "☀️" : "🌙";
    }
  }

  if (desktopBtn) desktopBtn.addEventListener("click", toggleTheme);
  if (mobileBtn) mobileBtn.addEventListener("click", toggleTheme);

  // ---------- Skill bars: fill in once scrolled into view ----------
  const skillRows = document.querySelectorAll("#skills-bars .skill-row");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".skill-bar-fill");
          if (fill) fill.style.width = entry.target.dataset.percent + "%";
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillRows.forEach((row) => skillObserver.observe(row));

  // ---------- Staggered page-load reveal ----------
  const fadeTargets = document.querySelectorAll(".fade-section, .card-project");
  fadeTargets.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.12}s`;
    requestAnimationFrame(() => {
      el.classList.add("in-view");
    });
  });
});
