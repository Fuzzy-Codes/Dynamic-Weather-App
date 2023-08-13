const currentDay = document.querySelector("#currentDay")
const forecastCard = document.querySelectorAll("#forecastCard")
const cityInput = document.querySelector("#cityInput")
const btn = document.querySelector("#btn")
const apiKey = '35dfb19446063c3fd5cf257c0ada1dde';
const currentSearch = document.querySelector("#currentSearch")
const icon = document.querySelector("#icon")
const temp = document.querySelector("#temp")
const wind = document.querySelector("#wind")
const humidity = document.querySelector("#humidity")
const historyList = document.querySelector("#historyList")

function fetchCurrentWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + city + "&appid=" + apiKey + "&units=imperial")
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            const date = new Date()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const year = date.getFullYear()
            currentSearch.innerHTML = data.name + " " + month + "/" + day + "/" + year
            icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
            icon.setAttribute("alt", "")
            temp.innerHTML = "Temp: " + data.main.temp + "&#176F"
            wind.innerHTML = "Wind: " + data.wind.speed + "mph"
            humidity.innerHTML = "Humidity: " + data.main.humidity + "%"
    })
}


function renderHistoryBtn() {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
    for (let i = 0; i < searchHistory.length; i++) {
        var historyBtn = document.createElement("button")
        historyBtn.innerHTML = searchHistory[i]
        historyList.append(historyBtn)
        historyBtn.addEventListener("click", function (event) {
            fetchCurrentWeather(event.target.innerHTML)
        })
    }
}

btn.addEventListener("click", function () {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
    var cityName = cityInput.value;
    searchHistory.push(cityName)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    fetchCurrentWeather(cityName)

    renderHistoryBtn()
})

renderHistoryBtn()

