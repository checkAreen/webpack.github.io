import axios from "axios";
import apiConfig from "../config/config";
import modal from "../render/modalWindow";

class Coordinates{
    constructor(){
        this.url = apiConfig.urlGeo;
        this.api = apiConfig.apiGeo;
    }

    async getCoordinates(city, country){
        try {
            const response = await axios.get(`${this.url}?access_key=${this.api}&query=${city}+${country}`);
            modal.closeModalWindow();
            return response;
        } catch (error) {
            alert(error);
        }
    }

    async getCoordinatesWithRegion(city, country, region){
        try {
            const response = await axios.get(`${this.url}?access_key=${this.api}&query=${city}+${country}&region=${region}`);
            modal.closeModalWindow();
            return response;
        } catch (error) {
            alert(error);
        }
    }
}

const coordinates = new Coordinates(apiConfig);
export default coordinates;