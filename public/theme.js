// 1. THIS PART RUNS IMMEDIATELY (prevents the white flash)
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// 2. THIS PART IS FOR THE BUTTON
window.toggleDarkMode = () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
};