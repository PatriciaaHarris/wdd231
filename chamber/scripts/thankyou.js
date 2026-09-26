const menuButton = document.querySelector("#menu-button");
const navBar = document.querySelector("#nav-bar");

menuButton.addEventListener("click", () => {

    navBar.classList.toggle("show");

    if (navBar.classList.contains("show")) {
        menuButton.textContent = "✕";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }

});


document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;


const params = new URLSearchParams(window.location.search);


document.querySelector("#display-first-name").textContent =
    params.get("firstName") || "";

document.querySelector("#display-last-name").textContent =
    params.get("lastName") || "";

document.querySelector("#display-email").textContent =
    params.get("email") || "";

document.querySelector("#display-phone").textContent =
    params.get("phone") || "";

document.querySelector("#display-organization").textContent =
    params.get("organization") || "";

document.querySelector("#display-timestamp").textContent =
    params.get("timestamp") || "";

