import { places } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");

places.forEach((place, index) => {
    const card = document.createElement("article");

    card.classList.add("discover-card");
    card.classList.add(`area-${index + 1}`);

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img src="${place.image}" alt="${place.name}" loading="lazy">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button type="button">Learn More</button>
    `;

    discoverGrid.appendChild(card);
});


const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentVisit - Number(lastVisit);
    const daysBetween = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysBetween < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent =
            `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);


document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent = document.lastModified;


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