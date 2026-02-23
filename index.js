var API_KEY = "e10ccdb3a19b249cd2972d9f7dfeb65a";
var URL = "https://api.openweathermap.org/data/2.5/weather";

var form = document.querySelector("form");
var input = document.getElementById("weather-search");
var weatherSection = document.getElementById("weather");

form.onsubmit = function (e) {
    e.preventDefault();

    var userQuery = input.value.trim();

    // Clear previous weather results
    weatherSection.innerHTML = "";

    if (!userQuery) return;

    var fetchURL = URL + "?q=" + userQuery + "&units=imperial&appid=" + API_KEY;
    
    fetch(fetchURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.cod && (data.cod === "404" || data.cod === 404)) {
                weatherSection.innerHTML = "<h2>Location not found</h2>";
                input.value = "";
                return;
            }
            displayWeather(data);
            input.value = "";
        })
        .catch(function (error) {
            weatherSection.innerHTML = "<h2>Location not found</h2>";
            input.value = "";
        });
};

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

    var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    var mapURL = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon;
    var timeString = new Date(timestamp * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });

    weatherSection.innerHTML =
        "<h2>" + city + ", " + country + "</h2>" +
        '<a href="' + mapURL + '" target="_blank">Click to view map</a>' +
        '<img src="' + iconURL + '">' +
        '<p style="text-transform: capitalize;">' + description + "</p><br>" +
        "<p>Current: " + temp + "° F</p>" +
        "<p>Feels like: " + feelsLike + "° F</p><br>" +
        "<p>Last updated: " + timeString + "</p>";
}