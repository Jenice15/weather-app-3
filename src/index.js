function displayTemperature(response) {
    let currentTemperature = document.querySelector("#temperature");
    let description = document.querySelector("#description");
    let feelsLike = document.querySelector("#feels-like");
    let icon = document.querySelector("#icon");
    let currentHumidity = document.querySelector("#humidity");
    let currentPressure = document.querySelector("#pressure");
    let currentWind = document.querySelector("#wind");
    let currentCity = document.querySelector("#city");

    currentTemperature.innerHTML = Math.round(
        response.data.temperature.current
    );
    description.innerHTML = response.data.condition.description;
    feelsLike.innerHTML = `RealFeel: ${Math.round(
        response.data.temperature.feels_like
    )}`;
    currentHumidity.innerHTML = `Humidity : ${response.data.temperature.humidity}`;
    currentPressure.innerHTML = `Pressure : ${response.data.temperature.pressure}`;
    currentWind.innerHTML = `Wind : ${response.data.wind.speed} Km/h`;
    currentCity.innerHTML = response.data.city;
    console.log(currentCity);
    icon.setAttribute(
        "src",
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
}
function search(city) {
    let apiKey = "fa90t5bf5523344e459f280fabbb9o83";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("london");
