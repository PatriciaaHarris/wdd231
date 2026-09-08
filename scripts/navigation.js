const menuButton = document.querySelector("#menu-button");
const navBar = document.querySelector("#nav-bar");

menuButton.addEventListener("click", () => {
    navBar.classList.toggle("open");

    if (navBar.classList.contains("open")) {
        menuButton.setAttribute("aria-label", "Close navigation menu");
        menuButton.textContent = "✕";
    } else {
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.textContent = "☰";
    }
});