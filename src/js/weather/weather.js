import axios from "axios";
import apiConfig from "../config/config";


class Weather{
    constructor(apiConfig){
        this.url = apiConfig.urlWeather,
        this.api = apiConfig.apiWeather
    }

    async getCurrentWeather(latitude, longitude){
        try {
            const response = await axios.get(`${this.url}/current.json?key=${this.api}&q=${latitude},${longitude}`);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async getForecast(date, latitude, longitude){
        try {
            const response = await axios.get(`${this.url}/forecast.json?key=${this.api}&q=${latitude},${longitude}&date=${date}&astro`);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

const weather = new Weather(apiConfig);
export default weather;