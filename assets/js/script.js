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
            updateBackground(weatherData);
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


    function updateBackground(weatherData) {
        const sunrise = weatherData.sys.sunrise * 1000;
        const sunset = weatherData.sys.sunset * 1000;
        const currentTime = new Date().getTime();
        const isDaytime = currentTime > sunrise && currentTime < sunset;
    
        let weatherCondition = '';
    
        // Determine the primary weather condition
        if (weatherData.weather && weatherData.weather.length > 0) {
            weatherCondition = weatherData.weather[0].main.toLowerCase();
        }
    
        // Set background image based on weather condition and time of day
        if (isDaytime) {
            switch (weatherCondition) {
                case 'clear':
                    body.style.backgroundImage = "url('assets/images/cloud-blue-sky.jpg')";
                    break;
                case 'clouds':
                    body.style.backgroundImage = "url('assets/images/clouds2.jpg')";
                    break;
                case 'rain':
                    body.style.backgroundImage = "url('assets/images/rain.jpg')";
                    break;
                case 'thunderstorm':
                    body.style.backgroundImage = "url('assets/images/day-thunder.jpg')";
                    break;
                case 'snow':
                    body.style.backgroundImage = "url('assets/images/snowing.jpg')";
                    break;
                default:
                    body.style.backgroundImage = "url('assets/images/cloud-sky.jpg')";
                    break;
            }
        } else {
            switch (weatherCondition) {
                case 'clear':
                    body.style.backgroundImage = "url('assets/images/night-sky.jpg')";
                    break;
                case 'clouds':
                    body.style.backgroundImage = "url('assets/images/night-clouds.jpg')";
                    break;
                case 'rain':
                    body.style.backgroundImage = "url('assets/images/night-rain.jpg')";
                    break;
                case 'thunderstorm':
                    body.style.backgroundImage = "url('assets/images/night-thunderstorm.jpg')";
                    break;
                case 'snow':
                    body.style.backgroundImage = "url('assets/images/night-snow.jpg')";
                    break;
                default:
                    body.style.backgroundImage = "url('assets/images/night-default.jpg')";
                    break;
            }
        }
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