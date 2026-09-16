
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




const weatherAPIKey = "957e7e4b6eb9b86131663d5cc1729180";

const city = "Santiago";
const country = "CL";

const weatherURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${weatherAPIKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${weatherAPIKey}`;


async function getWeather() {

    try {

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error("Unable to load current weather.");
        }

        const weatherData = await weatherResponse.json();

        displayCurrentWeather(weatherData);


        const forecastResponse = await fetch(forecastURL);

        if (!forecastResponse.ok) {
            throw new Error("Unable to load weather forecast.");
        }

        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);

    } catch (error) {

        document.querySelector("#current-temperature").textContent =
            "Weather unavailable";

        document.querySelector("#weather-description").textContent =
            "Unable to load weather information.";

    }

}



function displayCurrentWeather(weather) {

    const temperature =
        Math.round(weather.main.temp);

    const description =
        weather.weather[0].description;

    document.querySelector("#current-temperature").textContent =
        `${temperature} °C`;

    document.querySelector("#weather-description").textContent =
        description;

}




function displayForecast(forecast) {

    const forecastContainer =
        document.querySelector("#forecast-container");

    forecastContainer.innerHTML = "";

    const dailyForecast = {};

    forecast.list.forEach((item) => {

        const date =
            new Date(item.dt * 1000).toLocaleDateString(
                "en-US",
                {
                    weekday: "short",
                    month: "short",
                    day: "numeric"
                }
            );

        if (!dailyForecast[date]) {

            dailyForecast[date] = {
                temperature: item.main.temp,
                date: date
            };

        }

    });


    const forecastDays =
        Object.values(dailyForecast).slice(1, 4);


    forecastDays.forEach((day) => {

        const forecastCard =
            document.createElement("article");

        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <h4>${day.date}</h4>

            <p>
                ${Math.round(day.temperature)} °C
            </p>
        `;

        forecastContainer.appendChild(forecastCard);

    });

}




async function getSpotlights() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load member data.");
        }

        const members =
            await response.json();


        const eligibleMembers =
            members.filter(
                member =>
                    member.membership === 2 ||
                    member.membership === 3
            );


        const shuffledMembers =
            eligibleMembers.sort(
                () => Math.random() - 0.5
            );


        const selectedMembers =
            shuffledMembers.slice(0, 3);


        displaySpotlights(selectedMembers);

    } catch (error) {

        document.querySelector("#spotlights-container").innerHTML =
            "<p>Business spotlights are currently unavailable.</p>";

    }

}



function displaySpotlights(members) {

    const container =
        document.querySelector("#spotlights-container");

    container.innerHTML = "";


    members.forEach((member) => {

        const card =
            document.createElement("article");

        card.classList.add("spotlight-card");


        const membershipLevel =
            member.membership === 3
                ? "Gold"
                : "Silver";


        card.innerHTML = `

            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <h3>${member.name}</h3>

            <p>
                <strong>Membership:</strong>
                ${membershipLevel}
            </p>

            <p>
                <strong>Phone:</strong>
                ${member.phone}
            </p>

            <p>
                <strong>Address:</strong>
                ${member.address}
            </p>

            <p>
                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Website
                </a>
            </p>

        `;

        container.appendChild(card);

    });

}




getWeather();
getSpotlights();
