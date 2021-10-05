// WEATHER MEKNES ID 6547283

const iconElement = document.querySelector(".wwicon img");
const tempElement = document.querySelector(".wwtemp");
const descElement = document.querySelector(".wwdesc");
const locationElement = document.querySelector(".wwcity");
const tempHL = document.querySelector(".wwhighlow");
const wwBACK = document.querySelector(".wwback img");

const KELVIN = 273.15;
const key = "5186ca6d55c8b7d7115aaf6c572749c4";
const idcity = "2542715";

function getWeather() {
    if (navigator.onLine) {
        var getIP = 'http://ip-api.com/json/';
        var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather'
        $.getJSON(getIP).done(function(location) {
            $.getJSON(openWeatherMap, {
                lat: location.lat,
                lon: location.lon,
                units: 'metric',
                APPID: key
            }).done(function(data) {
                let nowH = new Date().getHours();
                let sunriseH = new Date(data.sys.sunrise*1000).getHours();
                let sunsetH = new Date(data.sys.sunset*1000).getHours();
                let isDayTime = nowH > sunriseH && nowH < sunsetH;
                iconElement.src = `icons/wth/${data.weather[0].icon}.png`;
                tempElement.innerHTML = `${Math.floor(data.main.temp)}°`;
                descElement.innerHTML = data.weather[0].main;
                locationElement.innerHTML = `${data.name}, ${data.sys.country}`;
                tempHL.innerHTML = data.weather[0].description;
                wwBACK.src = isDayTime ? `icons/wth/back/day.jpg` : `icons/wth/back/night.jpg`;
            })
        });
    }
}

getWeather();

setInterval(function() {
    getWeather()
}, 600000);