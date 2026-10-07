export function setupCommonUI() {
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#primary-nav");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("show");

            menuButton.setAttribute("aria-expanded", String(isOpen));

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuButton.textContent = isOpen ? "×" : "☰";
        });
    }

    const currentYear = document.querySelector("#current-year");
    const lastModified = document.querySelector("#last-modified");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}

setupCommonUI();
