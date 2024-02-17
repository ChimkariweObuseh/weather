const apiKey = "344e2ee5f99897b9b9e1237537f5c2c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");

const searchBttn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");


    let currentdate = new Date();
let hours = currentdate.getHours();
let minutes = currentdate.getMinutes();

let currentTime = currentdate.toUTCString();

console.log(currentTime);

function gradientTransform(color1, color2) {
    return card.style.background = "linear-gradient(135deg, " + color1 + ", " + color2 + ")";
}

function convertTimestamp(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000);
    let test = date.toUTCString();

    // Hours part from the timestamp
    return test;
}

function convertTimestamp2(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000);
    let hour = date.getHours();
    let minute = date.getMinutes();

    let hehe = hour + ":" + minute;

    // Hours part from the timestamp
    return hehe;
}

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);


    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {

        let data = await response.json();

        console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".feelslike").innerHTML = Math.round(data.main.feels_like) + "°C"

document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%";
document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
    document.querySelector(".sunrise").innerHTML = convertTimestamp2(data.sys.sunrise);
    document.querySelector(".sunset").innerHTML = convertTimestamp2(data.sys.sunset);

    
    if (currentTime >= convertTimestamp(data.sys.sunset)) {
        weatherIcon.src = "IMG_5440.png";
        gradientTransform("#252323", "#2f195f");
    } else {
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "IMG_5428.png";
        gradientTransform("#ccdde2", "#93a3bc");
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "IMG_5429.png";
        gradientTransform("#e3d26f", "#5199ff");
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "IMG_5425.png";
        gradientTransform("#93a3bc", "#48acf0");
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "IMG_5430.png";
        gradientTransform("#9f9fad", "#93748a");
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "IMG_5431.png";
        gradientTransform("#ffd4ca", "#efd5c3");
    } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "IMG_5432.png";
        gradientTransform("white", "#00ffe7");
    } else if (data.weather[0].main == "Thunderstorm") {
        weatherIcon.src = "IMG_5433.png";
        gradientTransform("#333333", "#643173");
    }
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
}

                    

searchBttn.addEventListener("click", () => {
checkWeather(searchBox.value);
});

console.log(convertTimestamp(1664086400));