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


const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();


const modalLinks = document.querySelectorAll(".modal-link");
const closeButtons = document.querySelectorAll(".close-modal");


modalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modalId = link.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        modal.showModal();
    });
});


closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
