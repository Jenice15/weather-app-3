function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let date_format = "12";
    let dt = date.getDate();

    let result = hours;
    let ext = "";
    if (hours < 10) {
        hours = ` 0 ${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0 ${minutes}`;
    }
    if (dt < 10) {
        dt = `0${dt}`;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (date_format == "12") {
        if (hours > 12) {
            ext = "PM";
            hours = hours - 12;
            result = hours;

            if (hours < 10) {
                result = "0" + hours;
            }
        } else if (hours < 12) {
            result = hours < 10 ? "0" + hours : hours;
            ext = "AM";
        } else if (hours == 12) {
            ext = "PM";
        }
    }

    let days = ["Sun", "Mon", "Tue", "wed", "Thu", "Fri", "Sat"];
    let day = days[date.getDay()];
    console.log(day);

    return `Last updated : ${day} ${dt} ${hours}:${minutes} ${ext}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">
`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
       <div class="col-2">
          <div class="weather-forecast-date">${formatDay(
              forecastDay.time
          )}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                }.png"
                alt=""
                width="42"
                />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-max"> ${Math.round(
                    forecastDay.temperature.maximum
                )}° </span>
                <span class="weather-forecast-min"> ${Math.round(
                    forecastDay.temperature.minimum
                )}° </span>
              </div>
       </div>
       `;
        }
    });

    forecastHTML = forecastHTML + `</div> `;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "fa90t5bf5523344e459f280fabbb9o83";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
    let currentTemperature = document.querySelector("#temperature");
    let city = document.querySelector("#city");
    let feelsLike = document.querySelector("#feels-like");
    //let logo = document.querySelector("#sun-logo");
    let humidity = document.querySelector("#humidity");
    let pressure = document.querySelector("#pressure");
    let wind = document.querySelector("#wind");
    let date = document.querySelector("#date-time");
    let description = document.querySelector("#description");
    let icon = document.querySelector("#icon");

    celsiusTemperature = response.data.temperature.current;

    // let cityInput = document.querySelector("#city-input");
    currentTemperature.innerHTML = Math.round(celsiusTemperature);
    city.innerHTML = response.data.city;
    feelsLike.innerHTML = `RealFeel : ${Math.round(
        response.data.temperature.feels_like
    )}&deg`;
    // logo.innerHTML = response.data.condition.icon_url;
    humidity.innerHTML = `Humidity : ${response.data.temperature.humidity}%`;
    pressure.innerHTML = `Pressure : ${response.data.temperature.pressure} `;
    wind.innerHTML = `Wind : ${Math.round(response.data.wind.speed)} mph`;
    date.innerHTML = formatDate(response.data.time * 1000);
    description.innerHTML = `${response.data.condition.description}`;

    icon.setAttribute(
        "src",
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    getForecast(response.data.coordinates);
}

function search(city) {
    let apiKey = "fa90t5bf5523344e459f280fabbb9o83";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    console.log(fahrenheitTemperature);
    temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("london");
