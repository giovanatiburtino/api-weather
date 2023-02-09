const apiKey = "195f6c9fbc60d7e026c5d970d22a2ef9";
// const apiCountryUrl = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement= document.querySelector("#city");
const tempElement= document.querySelector("#temperature");
const descElement= document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-container");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader")

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelector("#suggestions button");

const toggleLoader = () => {
    loader.classList.toggle("hide")
}

const getWeatherData = async (city) => {
    toggleLoader();

    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherUrl)
    const data = await res.json()

    toggleLoader()

    return data
}

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide")
}

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
}

const showWeatherData = async (city) => {
    hideInformation()
    
    const data = await getWeatherData(city);

    if(data.cod === "404"){
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    // countryElement.setAttribute("src", apiCountryUrl + data.sys.country);
    umidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove("hide")
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
  
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        const city = e.target.value

        showWeatherData(city)
    }
})
