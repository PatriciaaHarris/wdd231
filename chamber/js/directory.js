const menuButton = document.querySelector("#menu-button");
const navBar = document.querySelector("#nav-bar");

const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");


// ------------------------------
// MOBILE NAVIGATION
// ------------------------------

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


// ------------------------------
// LOAD MEMBERS
// ------------------------------

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error("Error loading members:", error);

        membersContainer.innerHTML =
            "<p>Sorry, the member directory could not be loaded.</p>";
    }
}


// ------------------------------
// DISPLAY MEMBERS
// ------------------------------

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" 
                 alt="${member.name} logo"
                 loading="lazy">

            <h2>${member.name}</h2>

            <p>${member.description}</p>

            <p>
                <strong>Address:</strong>
                ${member.address}
            </p>

            <p>
                <strong>Phone:</strong>
                ${member.phone}
            </p>

            <p>
                <strong>Membership:</strong>
                ${getMembershipLevel(member.membership)}
            </p>

            <p>
                <a href="${member.website}" 
                   target="_blank"
                   rel="noopener noreferrer">
                    Visit Website
                </a>
            </p>
        `;

        membersContainer.appendChild(card);
    });
}


// ------------------------------
// MEMBERSHIP LEVEL
// ------------------------------

function getMembershipLevel(level) {

    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}


// ------------------------------
// GRID VIEW
// ------------------------------

gridButton.addEventListener("click", () => {

    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});


// ------------------------------
// LIST VIEW
// ------------------------------

listButton.addEventListener("click", () => {

    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});


// ------------------------------
// FOOTER YEAR
// ------------------------------

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();


// ------------------------------
// LAST MODIFIED
// ------------------------------

document.querySelector("#lastModified").textContent =
    document.lastModified;


// ------------------------------
// START
// ------------------------------

getMembers();