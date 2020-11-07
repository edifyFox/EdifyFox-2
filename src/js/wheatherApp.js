// WEATHER MEKNES ID 6547283

const iconElement = document.querySelector(".data1wth img");
const tempElement = document.querySelector(".dtwthtemp");
const descElement = document.querySelector(".dtwthstat");
const locationElement = document.querySelector(".dtwthmdina");
const humidityvar = document.querySelector("#dtwthvar1");
const pressurevar = document.querySelector("#dtwthvar2");
const windvar = document.querySelector("#dtwthvar3");
const sunriseyvar = document.querySelector("#dtwthvar4");
const sunsetvar = document.querySelector("#dtwthvar5");

const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273.15;
// API KEY
const key = "5186ca6d55c8b7d7115aaf6c572749c4";
const idcity = "2542715";

function getWeather() {
    if (navigator.onLine) {
    let api = `https://api.openweathermap.org/data/2.5/weather?id=${idcity}&appid=${key}`;
    let apiforecast = `https://api.openweathermap.org/data/2.5/forecast?id=${idcity}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.humidity = data.main.humidity;
            weather.pressure = data.main.pressure;
            weather.wind = Math.floor(data.wind.speed * 3.6);
            weather.sunrise = data.sys.sunrise;
            weather.sunset  = data.sys.sunset;
        })
        .then(function(){
            displayWeather();
        });
    }
}

function unixDATE(dt) {
    var date = new Date(dt*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime
}

function displayWeather(){
    iconElement.src = `icons/wth/${weather.iconId}.png`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    humidityvar.innerHTML = `${weather.humidity} %`;
    pressurevar.innerHTML = `${weather.pressure} hPa`;
    windvar.innerHTML = `${weather.wind} km/h`;
    sunriseyvar.innerHTML = unixDATE(weather.sunrise);
    sunsetvar.innerHTML = unixDATE(weather.sunset);

    // var crnttime = new Date().getHours();
    // var crnsunrise = new Date(weather.sunrise*1000);
    // var crnsunset = new Date(weather.sunset*1000);
    // if (crnttime > crnsunrise.getHours() && crnttime < crnsunset.getHours()) {
    //     $('.animwth').css('background','url(img/mknes.jpg) no-repeat center center / cover');
    // } else {
    //     $('.animwth').css('background','url(img/mknesn.jpg) no-repeat center center / cover');
    // }

}

getWeather();

setInterval(function() {
    getWeather()
}, 600000);