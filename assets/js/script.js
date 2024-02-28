document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.location');
    const locationInput = document.querySelector('.location-input');
    const container = document.querySelector('.container');
    const locationDisplay = document.querySelector('.location-display');
    const temperature = document.querySelector('.temperature');
    const humidity = document.querySelector('.humidity');
    const description = document.querySelector('.description');
    const emojiWeather = document.querySelector('.emoji-weather');
    const error = document.querySelector('.error');
    const body = document.body;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const location = locationInput.value;

        try {
            const weatherData = await getWeatherData(location);
            updateWeatherUI(weatherData);
            updateBackground(weatherData.weather[0].main, weatherData.sys);
        } catch (err) {
            showError(err.message);
        }
    });

    async function getWeatherData(location) {
        const apiKey = 'da8d2880ac3ed4685c0aa431f36b9635'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Weather data not found');
        }

        return response.json();
    }

    function updateWeatherUI(weatherData) {
        container.style.display = 'block';
        locationDisplay.textContent = weatherData.name;
        temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
        humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
        description.textContent = `${weatherData.weather[0].description}`;
        emojiWeather.textContent = getWeatherEmoji(weatherData.weather[0].main, weatherData.sys);
        error.textContent = '';
    }

    function getWeatherEmoji(weatherCondition, sysData) {
        const sunrise = new Date(sysData.sunrise * 1000);
        const sunset = new Date(sysData.sunset * 1000);
        const currentTime = new Date();

        const isDaytime = currentTime > sunrise && currentTime < sunset;

        switch (weatherCondition.toLowerCase()) {
            case 'clear':
                return isDaytime ? '☀️' : '🌙';
            case 'clouds':
                return '☁️';
            case 'rain':
                return '🌧️';
            case 'thunderstorm':
                return '⛈️';
            case 'snow':
                return '❄️';
            default:
                return '';
        }
    }


    function updateBackground(weatherCondition, sysData) {
        const sunrise = sysData.sunrise * 1000;
        const sunset = sysData.sunset * 1000;
        const currentTime = new Date().getTime();
        const isDaytime = currentTime > sunrise && currentTime < sunset;

        let backgroundImageUrl = '';

        if (isDaytime) {
            switch (weatherCondition.toLowerCase()) {
                case 'clear':
                    backgroundImageUrl = "url('assets/images/cloud-blue-sky.jpg')";
                    break;
                case 'clouds':
                    backgroundImageUrl = "url('assets/images/clouds2.jpg')";
                    break;
                case 'rain':
                    backgroundImageUrl = "url('assets/images/rain-pouring.jpg')";
                    break;
                    case 'thunderstorm':
                        backgroundImageUrl = "url('assets/images/thunder.jpg')";
                        break;
                    case 'snow':
                        backgroundImageUrl = "url('assets/images/snowing.jpg')";
                        break;
                    case 'mist':
                        backgroundImageUrl = "url('assets/images/mist.jpg')";
                        break;
                    case 'drizzle':
                        backgroundImageUrl = "url('assets/images/rain.jpg')";
                        break;
                default:
                    backgroundImageUrl = "url('assets/images/cloud-sky.jpg')";
                    break;
            }
        } else {
            switch (weatherCondition.toLowerCase()) {
                case 'clear':
                    backgroundImageUrl = "url('assets/images/night-sky.jpg')";
                    break;
                case 'clouds':
                    backgroundImageUrl = "url('assets/images/night-cloudy-sky.jpg')";
                    break;
                case 'rain':
                    backgroundImageUrl = "url('assets/images/night-rain.jpg')";
                    break;
                case 'thunderstorm':
                        backgroundImageUrl = "url('assets/images/night-thunder.jpg')";
                        break;
                case 'snow':
                        backgroundImageUrl = "url('assets/images/night-snowing.jpg')";
                        break;
                case 'mist':
                        backgroundImageUrl = "url('assets/images/night-mist.jpg')";
                        break;
                default:
                    backgroundImageUrl = "url('assets/images/night-sky-clear2.jpg')";
                    break;
            }
        }

        
        container.style.backgroundImage = backgroundImageUrl;
    }

    function showError(message) {
        container.style.display = 'block';
        locationDisplay.textContent = '';
        temperature.textContent = '';
        humidity.textContent = '';
        description.textContent = '';
        emojiWeather.textContent = '';
        error.textContent = message;
    }
});