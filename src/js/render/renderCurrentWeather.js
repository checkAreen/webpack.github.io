import weather from "../weather/weather";
import { clearData } from "./clearData";
import {weatherImage, currentDate, windArrow, currentHumidity, currentPrecip, currentLocation} from "./clearData";
import nextFiveForecasts from "./renderForecast";

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const directions = ['E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N', 'NNE', 'NE', 'ENE'];
const mainCurrentTemp = document.querySelector('.current-temp');
const sunTime = document.querySelector('.right__sun');

export default function renderCurrentWeather(data){
    clearData();
    let currentTime = data.data.current.last_updated.split(' ')[1];
    let fullCurrentDate = data.data.current.last_updated.split(' ')[0];
    let date = fullCurrentDate.split('-')[2];
    let month;
    if(fullCurrentDate.split('-')[1][0] === '0') month = monthList[fullCurrentDate.split('-')[1][1] - 1];
    else month = monthList[fullCurrentDate.split('-')[1] - 1];
    let year = fullCurrentDate.split('-')[0];
    renderCurrentTempCelc(data)
    renderCurrentDt(date, month, year, currentTime);
    renderCurrentWind(data);
    currentHumidity.textContent = `${data.data.current.humidity} %`;
    currentPrecip.textContent = `${data.data.current.precip_mm}`;
    renderCurrentWeatherImage(data);
    currentLocation.textContent = `${data.data.location.name}, ${data.data.location.country}`
    weather.getForecast(`${year}-${month}-${date}`, `${data.data.location.lat}`, `${data.data.location.lon}`).then(data => getSunTime(data));
    nextFiveForecasts(data);
}

function renderCurrentTempCelc(data){
    const degreeMark = `<span class="degree">0</span><span class="degree-system">C</span>`
    mainCurrentTemp.textContent = data.data.current.temp_c;
    mainCurrentTemp.insertAdjacentHTML('beforeend', degreeMark);
}

function renderCurrentDt(date, month, year, currentTime){
    let dateStructure = `${date} ${month} ${year}<br><span class="current-time">${currentTime}</span>`;
    currentDate.insertAdjacentHTML('beforeend', dateStructure);
}

function renderCurrentWind(data){
    const windStateStructure = `<div class="details-info">Wind <span class="details__wind-speed">${data.data.current.wind_kph} km/h</span></div>`;
    windArrow.parentElement.insertAdjacentHTML('beforeend', windStateStructure);
    chooseWindDirection(data);
}

function chooseWindDirection(data){
    let currentDirection = data.data.current.wind_dir;
    let degree = directions.indexOf(currentDirection) * 22.5;
    windArrow.style.transform = `rotate(${degree}deg)`
}

function renderCurrentWeatherImage(data){
    let arrImagePath = data.data.current.condition.icon.split('/');
    let imgPath = `<img src="assets/${arrImagePath[5]}/${arrImagePath[6]}" alt="current_weather" class="current__top-item">`;
    weatherImage.insertAdjacentHTML('beforeend', imgPath);
}

function getSunTime(data){
    let currentSunrise = data.data.forecast.forecastday[0].astro.sunrise;
    let currentSunset = data.data.forecast.forecastday[0].astro.sunset;
    sunTime.children[0].children[0].nextElementSibling.textContent = currentSunrise;
    sunTime.children[1].children[0].nextElementSibling.textContent = currentSunset;
}