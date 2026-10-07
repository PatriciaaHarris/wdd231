import { setupCommonUI } from "./main.js";

setupCommonUI();

const foodGrid = document.querySelector("#food-grid");
const statusMessage = document.querySelector("#guide-status");
const searchInput = document.querySelector("#food-search");
const categoryFilter = document.querySelector("#category-filter");
const favoritesOnly = document.querySelector("#favorites-only");

const modal = document.querySelector("#food-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const closeModal = document.querySelector("#close-modal");

let foods = [];

let favoriteFoods = JSON.parse(
    localStorage.getItem("favoriteFoods") || "[]"
);

async function loadFoods() {
    try {
        const response = await fetch("data/foods.json");

        if (!response.ok) {
            throw new Error(`Unable to load food data: ${response.status}`);
        }

        foods = await response.json();

        populateCategories(foods);
        displayFoods(foods);

        statusMessage.textContent =
            `${foods.length} foods loaded from the local JSON file.`;

    } catch (error) {
        console.error("Food data error:", error);

        statusMessage.classList.add("error");

        statusMessage.textContent =
            "Sorry, the food information could not be loaded. Please try again.";
    }
}

function populateCategories(foodData) {
    categoryFilter.innerHTML = `
        <option value="all">All categories</option>
    `;

    const categories = [
        ...new Set(foodData.map(food => food.category))
    ];

    categories.sort().forEach(category => {
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}

function displayFoods(foodData) {
    if (foodData.length === 0) {
        foodGrid.innerHTML = `
            <div class="status-message">
                <p>No foods match your search.</p>
            </div>
        `;

        return;
    }

    foodGrid.innerHTML = foodData.map(food => {
        const isFavorite = favoriteFoods.includes(food.id);

        return `
            <article class="food-card">

                <img
                    class="food-card-image"
                    src="${food.image}"
                    alt="${food.name}"
                    loading="lazy"
                >

                <div class="food-card-content">

                    <h2>${food.name}</h2>

                    <p class="food-property">
                        <strong>Category:</strong>
                        ${food.category}
                    </p>

                    <p class="food-property">
                        <strong>Processing:</strong>
                        ${food.processingLevel}
                    </p>

                    <p class="food-property">
                        <strong>Main ingredients:</strong>
                        ${food.mainIngredients}
                    </p>

                    <p class="card-description">
                        ${food.description}
                    </p>

                    <div class="food-actions">

                        <button
                            class="small-button details-button"
                            type="button"
                            data-id="${food.id}">
                            View Details
                        </button>

                        <button
                            class="small-button favorite"
                            type="button"
                            data-favorite="${food.id}"
                            aria-pressed="${isFavorite}">
                            ${isFavorite ? "★ Favorite" : "☆ Favorite"}
                        </button>

                    </div>

                </div>

            </article>
        `;
    }).join("");
}

function filterFoods() {
    const searchTerm =
        searchInput.value.trim().toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    const onlyFavorites =
        favoritesOnly.checked;

    const filteredFoods = foods.filter(food => {

        const matchesSearch =
            food.name.toLowerCase().includes(searchTerm) ||
            food.description.toLowerCase().includes(searchTerm) ||
            food.mainIngredients.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            food.category === selectedCategory;

        const matchesFavorite =
            !onlyFavorites ||
            favoriteFoods.includes(food.id);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesFavorite
        );
    });

    displayFoods(filteredFoods);

    statusMessage.textContent =
        `${filteredFoods.length} food${filteredFoods.length === 1 ? "" : "s"} displayed.`;
}

function toggleFavorite(foodId) {
    if (favoriteFoods.includes(foodId)) {
        favoriteFoods =
            favoriteFoods.filter(id => id !== foodId);
    } else {
        favoriteFoods.push(foodId);
    }

    localStorage.setItem(
        "favoriteFoods",
        JSON.stringify(favoriteFoods)
    );

    filterFoods();
}

function openFoodModal(foodId) {
    const selectedFood =
        foods.find(food => food.id === foodId);

    if (!selectedFood) {
        return;
    }

    modalTitle.textContent =
        selectedFood.name;

    modalBody.innerHTML = `
        <img
            class="modal-food-image"
            src="${selectedFood.image}"
            alt="${selectedFood.name}"
        >

        <p>
            ${selectedFood.description}
        </p>

        <ul class="modal-list">

            <li>
                <strong>Category:</strong>
                ${selectedFood.category}
            </li>

            <li>
                <strong>Processing level:</strong>
                ${selectedFood.processingLevel}
            </li>

            <li>
                <strong>Main ingredients:</strong>
                ${selectedFood.mainIngredients}
            </li>

            <li>
                <strong>Why it matters:</strong>
                ${selectedFood.whyItMatters}
            </li>

            <li>
                <strong>Everyday tip:</strong>
                ${selectedFood.everydayTip}
            </li>

        </ul>
    `;

    modal.showModal();
}

foodGrid.addEventListener("click", event => {

    const detailsButton =
        event.target.closest(".details-button");

    const favoriteButton =
        event.target.closest("[data-favorite]");

    if (detailsButton) {
        openFoodModal(detailsButton.dataset.id);
    }

    if (favoriteButton) {
        toggleFavorite(
            favoriteButton.dataset.favorite
        );
    }
});

searchInput.addEventListener(
    "input",
    filterFoods
);

categoryFilter.addEventListener(
    "change",
    filterFoods
);

favoritesOnly.addEventListener(
    "change",
    filterFoods
);

closeModal.addEventListener(
    "click",
    () => {
        modal.close();
    }
);

modal.addEventListener(
    "click",
    event => {
        if (event.target === modal) {
            modal.close();
        }
    }
);

loadFoods();
