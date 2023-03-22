import '../css/style.css';
import weather from './weather/weather';
import renderCurrentWeather from './render/renderCurrentWeather';
import modal from './render/modalWindow';
import { body } from './render/modalWindow';
import coordinates from './location/getCoordinates';
import { deepLocationSearch } from './location/locationSearch';

const modalWindowOpen = document.getElementById('openModalWindow');

window.addEventListener('load', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        modal.renderModalWindow();
    }
})

modalWindowOpen.addEventListener('click', modal.renderModalWindow);

body.addEventListener('click', ({target}) => {
    if(target.classList.contains('modal__button') || target.classList.contains('fa-circle-xmark')) modal.closeModalWindow();
});

body.addEventListener('submit', function(e){
    e.preventDefault();
    const form = document.forms['form-search'];
    let inputCity = form.elements['city'].value;
    let inputCountry = form.elements['country'].value;
    let inputRegion = form.elements['region'].value;
    if(inputRegion) {
        coordinates.getCoordinatesWithRegion(inputCity, inputCountry, inputRegion).then(data => deepLocationSearch(data));
    } else {
        coordinates.getCoordinates(inputCity, inputCountry).then(data => deepLocationSearch(data));
    }
});

body.addEventListener('click', function({target}){
    if(target.classList.contains('right__theme-item')){
        let currentBodyTheme = body.className;
        let newTheme = target.className.split(' ')[1];

        (currentBodyTheme === '') ? body.classList.add(newTheme) : body.classList.replace(currentBodyTheme, newTheme);
    }
})

function showPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    weather.getCurrentWeather(latitude, longitude).then(data => renderCurrentWeather(data));
}