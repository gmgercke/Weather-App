function formatDate(currentDate) {
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let year = currentDate.getFullYear();
  let date = ("0" + currentDate.getDate()).slice(-2);
  let weekDay = weekDays[currentDate.getDay()];
  let month = months[currentDate.getMonth()];

  let formattedDate = `${weekDay}., ${month} ${date}, ${year}`;
  return formattedDate;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastDays = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastDays.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `       <div class="col forecast-unit" id="forecast">
            <div class="forecast-day">${formatForecastDay(day.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }.png" alt="weather" id="icon" />
            <div class="forecast-temps">
            <span class="forecast-max-temp">${Math.round(
              day.temp.max
            )}° / </span>
            <span class="forecast-min-temp">${Math.round(day.temp.min)}°</span>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatTime(currentTime) {
  let hours = currentTime.getHours();
  let minutes = ("0" + currentTime.getMinutes()).slice(-2);

  let formattedTime = `(${hours}:${minutes})`;
  return formattedTime;
}

function getForecast(coordinates) {
  let apiKey = "38056c1bbe50ac4df0a26ff8642db7e0";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function showTemp(response) {
  let cityDisplay = document.querySelector("h1 .city");
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector(".temperature-value");
  let descriptor = response.data.weather[0].description;
  let descriptorDisplay = document.querySelector("h2");
  let iconDisplay = document.querySelector("#icon");
  let windDisplay = document.querySelector(".wind");
  let humidityDisplay = document.querySelector(".humidity");
  let pressureDisplay = document.querySelector(".pressure");

  celsiusBase = Math.round(response.data.main.temp);

  cityDisplay.innerHTML = response.data.name;
  tempDisplay.innerHTML = temperature;
  descriptorDisplay.innerHTML = descriptor;
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].description);
  windDisplay.innerHTML = Math.round(response.data.wind.speed * 3.6);
  humidityDisplay.innerHTML = response.data.main.humidity;
  pressureDisplay.innerHTML = response.data.main.pressure;

  getForecast(response.data.coord);
}

function citySearch(cityInput) {
  let apiKey = "38056c1bbe50ac4df0a26ff8642db7e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function getCity(event) {
  event.preventDefault();
  let cityInput = document
    .querySelector("form .search-field")
    .value.trim()
    .toLowerCase();
  citySearch(cityInput);
}

function locationSearch(position) {
  let lati = position.coords.latitude;
  let longi = position.coords.longitude;
  let apiKey = "38056c1bbe50ac4df0a26ff8642db7e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locationSearch);
}

function handleClickCelsius(event) {
  event.preventDefault();
  clickFahrenheit.classList.remove("active");
  clickCelsius.classList.add("active");
  let currentTemp = document.querySelector(".temperature-value");
  currentTemp.innerHTML = celsiusBase;
}

function handleClickFahrenheit(event) {
  event.preventDefault();
  clickCelsius.classList.remove("active");
  clickFahrenheit.classList.add("active");
  let currentTemp = document.querySelector(".temperature-value");
  let tempF = Math.round((celsiusBase * 9) / 5 + 32);
  currentTemp.innerHTML = tempF;
}

let celsiusBase = null;

let today = document.querySelector("h1 .date");
today.innerHTML = formatDate(new Date());

let todayTime = document.querySelector("h1 .time");
todayTime.innerHTML = formatTime(new Date());

let cityForm = document.querySelector("#search-loc");
cityForm.addEventListener("submit", getCity);

let locationForm = document.querySelector("#current-loc");
locationForm.addEventListener("click", getLocation);

let clickCelsius = document.querySelector(".celsius");
clickCelsius.addEventListener("click", handleClickCelsius);

let clickFahrenheit = document.querySelector(".fahrenheit");
clickFahrenheit.addEventListener("click", handleClickFahrenheit);

citySearch("Berlin");
displayForecast();
