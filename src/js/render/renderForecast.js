import weather from "../weather/weather";
import { forecastItem } from "./clearData";

export default function nextFiveForecasts(data){
    let currentDate = new Date();
    for (let i = 1; i <= 5; i++) {
        let nextDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
        let dateString = nextDate.toISOString().slice(0, 10);
        weather.getForecast(dateString, `${data.data.location.lat}`, `${data.data.location.lon}`)
            .then(response => renderForecast(response, nextDate));
    }
}

export function renderForecast(response, date){
    let dateString = String(date).split(' ');
    let imgPath = response.data.forecast.forecastday[0].day.condition.icon.split('/');
    let forecast = response.data.forecast.forecastday[0].day;
    let forecastStructure = `
        <div class="forecast__inner-item">
            <div class="forecast__item-temp">Max: ${forecast.maxtemp_c}</div>
            <div class="forecast__item-temp">Min: ${forecast.mintemp_c}</div>
            <img src="assets/${imgPath[5]}/${imgPath[6]}" alt="cloud" class="forecast__item-img">
            <div class="forecast__item-day">${dateString[2]} ${dateString[1]}</div>
        </div>
    `;
    forecastItem.insertAdjacentHTML('beforeend', forecastStructure);
}