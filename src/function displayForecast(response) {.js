function displayForecast(response) {
    let forecast = response.data.daily;
    console.log(forecast.time);
    //console.log(forecast.temperature);
    let forecastElement = document.querySelector("#forecast");

    //let days = ["Mon", "Tue"];

    let forecastHTML = `<div class = "row">`;

    forecast.forEach(function (forecastDay) {
        forecastHTML =
            forecastHTML +
            `
            <div class="col-2">
                <div class="weather-forecast-day">
                    ${forecastDay}
                </div>
                <img 
                    src = "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
                    alt="" class="weather-forcast-icon" >
                <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temp-max">18 </span>
                    <span class="weather-forecast-temp-min"> 16</span>
                </div>
            </div>
        `;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecast.innerHTML = forecastHTML;
    console.log(forecastHTML);
}

let date_format = "12";

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