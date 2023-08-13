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
            icon.setAttribute("alt", data.weather[0].description)
            temp.innerHTML = "Temp: " + data.main.temp + "&#176F"
            wind.innerHTML = "Wind: " + data.wind.speed + "mph"
            humidity.innerHTML = "Humidity: " + data.main.humidity + "%"
    })
}

function fetchForecastWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=` + city + "&appid=" + apiKey + "&units=imperial")
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            for (let i = 0; i < forecastCard.length; i++) {
                forecastCard[i].innerHTML = ""
                const index = i * 8 + 4
                const date = new Date(data.list[index].dt * 1000)
                const month = date.getMonth() + 1
                const day = date.getDate()
                const year = date.getFullYear()

                const dateEl = document.createElement("h2")
                dateEl.innerHTML = month + "/" + day + "/" + year
                forecastCard[i].append(dateEl)

                const icon = document.createElement("img")
                icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + "@2x.png")
                icon.setAttribute("alt", data.list[index].weather[0].description)
                forecastCard[i].append(icon)
                const temp = document.createElement("p")
                temp.innerHTML = "Temp: " + data.list[index].main.temp + "&#176F"
                forecastCard[i].append(temp)

                const wind = document.createElement("p")
                wind.innerHTML = "Wind: " + data.list[index].wind.speed + "mph"
                forecastCard[i].append(wind)

                const humidity = document.createElement("p")
                humidity.innerHTML = "Humidity: " + data.list[index].main.humidity + "%"
                forecastCard[i].append(humidity)

            }
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
            fetchForecastWeather(event.target.innerHTML)
        })
        historyBtn.style.backgroundColor = "yellow"
    }
}

btn.addEventListener("click", function () {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
    var cityName = cityInput.value;
    searchHistory.push(cityName)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    fetchCurrentWeather(cityName)
    fetchForecastWeather(cityName)
    renderHistoryBtn()
})

renderHistoryBtn()

