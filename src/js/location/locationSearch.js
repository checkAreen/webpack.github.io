import weather from "../weather/weather";
import renderCurrentWeather from "../render/renderCurrentWeather";

export function deepLocationSearch(response){
    const array = response.data.data;
    if(array.length === 1){
        weather.getCurrentWeather(array[0].latitude, array[0].longitude).then(data => renderCurrentWeather(data));
    }else{
        for(let i = 0; i < array.length; i++){
            if(array[i].type === 'locality'){
                weather.getCurrentWeather(array[i].latitude, array[i].longitude).then(data => renderCurrentWeather(data));
                break
            }
        }
    }
}