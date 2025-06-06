const weatherForm = document.querySelector(".weatherForm");
const searchBar = document.querySelector(".search-bar");
const card = document.querySelector(".card");
const apiKey = "0522aa3d3c2a9e7b0ab311abc76e9efd";


weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = searchBar.value;

    if(city){
        try {

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        } catch (error) {

            console.log(error);
            displayError(error);

        }
    }
    else{

        displayError("Please enter a city");

    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response =  await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json();
};

function displayWeatherInfo(data){

    searchBar.value = "";

    const {name: city, 
          main: {temp, humidity}, 
          weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    weatherEmoji.textContent = getWeatherEmoji(id);
    tempDisplay.textContent = `${Math.round((temp - 273.15) * (9/5) + 32)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("temp");
    humidityDisplay.classList.add("humidity");
    descDisplay.classList.add("descriptionDisplay");
    weatherEmoji.classList.add("emoji")

    card.appendChild(cityDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(descDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    
    

};

function getWeatherEmoji(weatherid){

    switch(true){
        case(weatherid >= 200 && weatherid < 300):
            return "🌩️";
        case(weatherid >= 300 && weatherid < 400):
            return "🌧️";
        case(weatherid >= 500 && weatherid < 600):
            return "🌧️";
        case(weatherid >= 600 && weatherid < 700):
            return "🌨️";
        case(weatherid >= 700 && weatherid < 800):
            return "🌫️";
        case(weatherid === 800):
            return "☀️";
        case(weatherid >= 801 && weatherid < 810):
            return "☁️";
        default:
            return "🤔";
    };

};

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    

};