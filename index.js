var API_KEY = "7c3f17db3015be66f8e23ed95ff0d71f";
var URL = "https://api.openweathermap.org/data/2.5/weather";

//Elements
var form = document.querySelector("form");
var input = document.getElementById("weather-search");
var weatherSection = document.getElementById("weather");

//Event Listener
form.onsubmit = function (e) {
    e.preventDefault();

    var userQuery = input.value.trim();

    //Clear previous weather results
    weatherSection.innerHTML = "";

    if (!userQuery) return;

    var fetchURL =
        URL +
        "?units=imperial&appid=" +
        API_KEY +
        "&q=" +
        userQuery;

    fetch(fetchURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Location not found");
            }
            return response.json();
        })
        .then((data) => {
            displayWeather(data);
        })
        .catch(() => {
            weatherSection.innerHTML = "<h2>Location not found</h2>";
        })
        .finally(() => {
            // reset input
            input.value = "";
        });
};

//Display function
function displayWeather(data) {
    var city = data.name;
    var country = data.sys.country;
    var description = data.weather[0].description;
    var iconCode = data.weather[0].icon;
    var temp = data.main.temp;
    var feelsLike = data.main.feels_like;
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var timestamp = data.dt;

    //Icon URL
    var iconURL =
        "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

    //Google Maps URL
    var mapURL =
        "https://www.google.com/maps/search/?api=1&query=" +
        lat +
        "," +
        lon;

    // Convert to readable time
    var date = new Date(timestamp * 1000);
    var timeString = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    // HTML
    weatherSection.innerHTML = `
    <h2>${city}, ${country}</h2>
    <a href="${mapURL}" target="_blank">Click to view map</a>
    <img src="${iconURL}">
    <p style="text-transform: capitalize;">${description}</p><br>
    <p>Current: ${temp}° F</p>
    <p>Feels like: ${feelsLike}° F</p><br>
    <p>Last updated: ${timeString}</p>
  `;
}

