let weatherForm = document.getElementsByClassName("location");
let locationInput = document.getElementsByClassName("location-input");
let container = document.getElementsByClassName("container");
let apiKey="da8d2880ac3ed4685c0aa431f36b9635";

weatherForm .addEventListener("submit", event => {
    event.preventDefault();
    let location = locationInput.value;
    if(location){

    } else {
        displayError ("Please a location")
    }

});

async function get WeatherData(location){

}

function displayWeatherInfo(data){

}

function get WeatherEmoji(weatherId) {

}

