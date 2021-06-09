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

  let formattedDate = `${weekDay}, ${month} ${date}, ${year}`;
  return formattedDate;
}

function formatTime(currentTime) {
  let hours = currentTime.getHours();
  let minutes = ("0" + currentTime.getMinutes()).slice(-2);

  let formattedTime = `(${hours}:${minutes})`;
  return formattedTime;
}

function showTemp(response) {
  let cityDisplay = document.querySelector("h1 .city");
  cityDisplay.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector(".temperature-value");
  tempDisplay.innerHTML = temperature;
  let descriptor = response.data.weather[0].main;
  let descriptorDisplay = document.querySelector("h2");
  descriptorDisplay.innerHTML = descriptor;
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

function handleClickCelsius() {
  let currentTemp = document.querySelector(".temperature-value");
  currentTemp.innerHTML = "16";
}

function handleClickFahrenheit() {
  let currentTemp = document.querySelector(".temperature-value");
  let tempF = currentTemp.value + 5;
  currentTemp.innerHTML = tempF;
}

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
