let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day},  ${hour}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  chooseCity();
}

function showCityTemperature(response) {
  let locationTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${locationTemperature}°C`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}

let searchForm = document.querySelector("#submit-button");
searchForm.addEventListener("click", showCity);

function showCurrentLocation(event) {
  event.preventDefault();
  alert("Let's check your outside temperature");
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let clickCurrentButton = document.querySelector("#here-button");
clickCurrentButton.addEventListener("click", showCurrentLocation);

function showCurrentTemperature(response) {
  console.log(response.data.name);
  let locationTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${locationTemperature}°C`;
  let location = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${location}`;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5322d70f540cbd1258cef95400cf8e7c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentTemperature);
}

function chooseCity(response) {
  let city = document.querySelector("#city-input");
  let apiKey = "5322d70f540cbd1258cef95400cf8e7c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCityTemperature);
}
