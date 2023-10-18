const apiKey = '0043c73601397f353e22eff18db108d2';
const weatherData = document.querySelector('.weather-data');
const cityData = document.querySelector('.city-input');
const formElement = document.querySelector('form');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityValue = cityData.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=imperial`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°F`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherData.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
        weatherData.querySelector('.temperature').textContent = temperature + '°F';
        weatherData.querySelector('.description').textContent = description;
        weatherData.querySelector('.details').innerHTML = details.map(
            (detail) => `<div>${detail}</div>`
            ).join("");
    } catch (error) {
        weatherData.querySelector('.description').innerHTML = 'An error has occured, please try again later';
    }
}