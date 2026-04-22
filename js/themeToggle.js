const THEME_STORAGE_KEY = "blogTheme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

function readSavedTheme() {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === LIGHT_THEME || storedTheme === DARK_THEME) {
      return storedTheme;
    }
  } catch (error) {}

  return null;
}

function getSystemTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return DARK_THEME;
  }

  return LIGHT_THEME;
}

function getActiveTheme() {
  return readSavedTheme() || document.documentElement.dataset.theme || getSystemTheme();
}

function updateThemeToggleUi(theme) {
  const toggleButton = document.getElementById("theme-toggle-button");
  const toggleText = document.getElementById("theme-toggle-text");
  if (!toggleButton || !toggleText) {
    return;
  }

  const nextLabel =
    theme === DARK_THEME
      ? "\uB77C\uC774\uD2B8\uBAA8\uB4DC"
      : "\uB2E4\uD06C\uBAA8\uB4DC";
  const nextAriaLabel =
    theme === DARK_THEME
      ? "\uB77C\uC774\uD2B8\uBAA8\uB4DC\uB85C \uC804\uD658"
      : "\uB2E4\uD06C\uBAA8\uB4DC\uB85C \uC804\uD658";

  toggleButton.dataset.theme = theme;
  toggleButton.setAttribute("aria-label", nextAriaLabel);
  toggleText.textContent = nextLabel;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  updateThemeToggleUi(theme);
}

function persistTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {}
}

function toggleTheme() {
  const currentTheme = getActiveTheme();
  const nextTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

  applyTheme(nextTheme);
  persistTheme(nextTheme);
}

applyTheme(getActiveTheme());

const themeToggleButton = document.getElementById("theme-toggle-button");
if (themeToggleButton) {
  themeToggleButton.addEventListener("click", toggleTheme);
}

if (window.matchMedia) {
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkModeQuery.addEventListener("change", () => {
    if (readSavedTheme()) {
      return;
    }

    applyTheme(darkModeQuery.matches ? DARK_THEME : LIGHT_THEME);
  });
}
