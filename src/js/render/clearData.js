export const weatherImage = document.querySelector('.current__top-images');
export const currentDate = document.querySelector('.current-dt');
export const windArrow = document.querySelector('.icon-arrow');
export const currentHumidity = document.querySelector('.details__humidity');
export const currentPrecip = document.querySelector('.deatils__precip');
export const forecastItem = document.querySelector('.left__forecast-inner');
export const currentLocation = document.querySelector('.right__search-input');

export function clearData(){
    forecastItem.innerHTML = '';
    weatherImage.innerHTML = '';
    currentDate.innerHTML = '';
    currentHumidity.textContent = '';
    currentPrecip.textContent = '';
    currentLocation.textContent = '';
    if(windArrow.nextElementSibling){
        windArrow.parentElement.removeChild(windArrow.parentElement.children[1])
    }
}