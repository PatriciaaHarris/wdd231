import { setupCommonUI } from "./main.js";

setupCommonUI();

const firstFoodSelect = document.querySelector("#food-one");
const secondFoodSelect = document.querySelector("#food-two");
const comparisonResult = document.querySelector("#comparison-result");

const checklistItems = document.querySelectorAll("[data-check]");

let foods = [];

async function loadFoodOptions() {
    try {
        const response = await fetch("data/foods.json");

        if (!response.ok) {
            throw new Error(`Unable to load food data: ${response.status}`);
        }

        foods = await response.json();

        populateFoodSelect(firstFoodSelect);
        populateFoodSelect(secondFoodSelect);

        firstFoodSelect.value = foods[0].id;
        secondFoodSelect.value = foods[1].id;

        compareFoods();

    } catch (error) {
        console.error("Comparison data error:", error);

        comparisonResult.textContent =
            "The comparison tool could not load the food information.";
    }
}

function populateFoodSelect(selectElement) {
    selectElement.innerHTML = `
        <option value="">Choose a food</option>
    `;

    foods.forEach(food => {
        const option = document.createElement("option");

        option.value = food.id;
        option.textContent = food.name;

        selectElement.appendChild(option);
    });
}

function compareFoods() {
    const firstFood = foods.find(
        food => food.id === firstFoodSelect.value
    );

    const secondFood = foods.find(
        food => food.id === secondFoodSelect.value
    );

    if (!firstFood || !secondFood) {
        comparisonResult.textContent =
            "Select two foods to compare them.";
        return;
    }

    comparisonResult.innerHTML = `
        <h3>${firstFood.name} vs. ${secondFood.name}</h3>

        <div class="table-wrapper">

            <table>

                <caption class="hidden">
                    Comparison of two foods
                </caption>

                <thead>
                    <tr>
                        <th scope="col">Property</th>
                        <th scope="col">${firstFood.name}</th>
                        <th scope="col">${secondFood.name}</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <th scope="row">Category</th>
                        <td>${firstFood.category}</td>
                        <td>${secondFood.category}</td>
                    </tr>

                    <tr>
                        <th scope="row">Processing level</th>
                        <td>${firstFood.processingLevel}</td>
                        <td>${secondFood.processingLevel}</td>
                    </tr>

                    <tr>
                        <th scope="row">Main ingredients</th>
                        <td>${firstFood.mainIngredients}</td>
                        <td>${secondFood.mainIngredients}</td>
                    </tr>

                    <tr>
                        <th scope="row">Everyday tip</th>
                        <td>${firstFood.everydayTip}</td>
                        <td>${secondFood.everydayTip}</td>
                    </tr>

                </tbody>

            </table>

        </div>
    `;
}

function loadChecklistState() {
    checklistItems.forEach(item => {
        const savedValue =
            localStorage.getItem(`check-${item.dataset.check}`);

        item.checked = savedValue === "true";
    });
}

function saveChecklistState(event) {
    localStorage.setItem(
        `check-${event.target.dataset.check}`,
        event.target.checked
    );
}

firstFoodSelect.addEventListener("change", compareFoods);
secondFoodSelect.addEventListener("change", compareFoods);

checklistItems.forEach(item => {
    item.addEventListener("change", saveChecklistState);
});

loadChecklistState();
loadFoodOptions();
