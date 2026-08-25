document.addEventListener("DOMContentLoaded", () => {
  // ---------- Dark mode toggle with LocalStorage ----------
  const desktopBtn = document.getElementById("theme-toggle-desktop");
  const mobileBtn = document.getElementById("theme-toggle-mobile");

  function updateThemeUI(isDark) {
    if (desktopBtn)
      desktopBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    if (mobileBtn) mobileBtn.textContent = isDark ? "☀️" : "🌙";
  }

  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.body.classList.toggle("dark-mode", isDark);
    updateThemeUI(isDark);
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeUI(isDark);
  }

  initTheme();
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
    { threshold: 0.3 },
  );
  skillRows.forEach((row) => skillObserver.observe(row));

  // ---------- Staggered page-load reveal ----------
  const fadeTargets = document.querySelectorAll(".fade-section, .card-project");
  fadeTargets.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
    requestAnimationFrame(() => {
      el.classList.add("in-view");
    });
  });

  // ---------- 3D Card Hover Tilt ----------
  const projectCards = document.querySelectorAll(".card-project");
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
});
