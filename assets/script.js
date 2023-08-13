const currentDay = document.querySelector("#currentDay")
const forecastCard = document.querySelectorAll("#forecastCard")
const cityInput = document.querySelector("#cityInput")
const btn = document.querySelector("#btn")
const apiKey = '35dfb19446063c3fd5cf257c0ada1dde';

function fetchCurrentWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + city + "&appid=" + apiKey + "&units=imperial")
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
        console.log(data)
    })
}

btn.addEventListener("click", function () {
    var cityName = cityInput.value;
    fetchCurrentWeather(cityName)
})