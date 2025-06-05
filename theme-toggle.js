const themeLink = document.getElementById("theme-link");
const checkbox = document.getElementById("checkbox");
const modeLabel = document.getElementById("mode-label");
const savedTheme = localStorage.getItem("theme");

if (!savedTheme) {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    themeLink.href = "dark-mode.css";
    document.body.classList.add("dark-mode");
    checkbox.checked = true;
    modeLabel.textContent = "Switch to Light Mode";
  } else {
    themeLink.href = "main.css";
    modeLabel.textContent = "Switch to Dark Mode";
  }
} else {
  if (savedTheme === "dark") {
    themeLink.href = "dark-mode.css";
    checkbox.checked = true;
    modeLabel.textContent = "Switch to Light Mode";
  } else {
    themeLink.href = "main.css";
    modeLabel.textContent = "Switch to Dark Mode";
  }
}

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    themeLink.href = "dark-mode.css";
    localStorage.setItem("theme", "dark");
    modeLabel.textContent = "Switch to Light Mode";
  } else {
    themeLink.href = "main.css";
    localStorage.setItem("theme", "light");
    modeLabel.textContent = "Switch to Dark Mode";
  }
});
