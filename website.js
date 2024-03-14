const ApiKey = "fd3991c66ff79444f190aaea37bf2cc6";//Api key 
const inputData = document.getElementById("city_name");
const formData = document.querySelector("form");
const weatherData = document.querySelector(".detail");
let city_data;
formData.addEventListener("submit", function (event) {
  event.preventDefault();
  city_data = inputData.value;
  sendCity(city_data);
});
//fetching the weather data from the weather api
async function sendCity(city_data) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city_data}&appid=${ApiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network error");
    }
    const data = await response.json();
    weatherData.querySelector(".icon").innerHTML =
      Math.round(data.main.temp) + "°C";
    weatherData.querySelector(".image").innerHTML = `<img
    src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"
    alt="sky"
    />`;
    weatherData.querySelector("#heading").innerHTML =
      data.weather[0].description;
    const subData = [
      `Feels like:${Math.round(data.main.feels_like)}`,
      `Humidity:${data.main.humidity}%`,
      `Wind speed:${data.wind.speed} m/s`,
    ];

    const subDetail = weatherData.querySelectorAll(".moredetail .smlDiv span");

    subDetail.forEach((item, index) => {
      item.innerHTML = subData[index];
    });
    // console.log(subDetail);
  } catch (error) {
    console.log(error);
  }
}
