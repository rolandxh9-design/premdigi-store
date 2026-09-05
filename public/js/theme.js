// Light/dark theme toggle. The initial theme is set inline in <head> on each
// page (before paint, to avoid a flash) — this file only wires up the toggle button.
const THEME_KEY = "premdigi-theme";

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  const icon = document.getElementById("theme-icon");
  if (icon) icon.innerHTML = theme === "dark" ? ICONS.sun : ICONS.moon;

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    toggle.setAttribute("aria-label", toggle.title);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  setTheme(current);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }
});
