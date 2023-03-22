export const body = document.querySelector('body');
export const modalWindowItem = `
        <div class="modal">
            <h1 class="modal__title">Please, share location you prefer</h1>
            <form class="modal__form" name="form-search">
                <input name="city" type="text" class="modal__form-input input-city" placeholder="City ...">
                <input name="country" type="text" class="modal__form-input input-country" placeholder="Country ...">
                <input name="region" type="text" class="modal__form-input input-region" placeholder="Region (Optional)">
                <input type="submit" class="modal__form-submit" value="Send">
            </form>
        </div>
        <button class="modal__button">
            <i class="fa-regular fa-circle-xmark"></i>
        </button>
        `

class ModalWindow{
    renderModalWindow(){
        body.insertAdjacentHTML('beforeend', modalWindowItem);
        body.classList.add('body-block');
    }

    closeModalWindow(){
        body.removeChild(document.querySelector('.modal'));
        body.removeChild(document.querySelector('.modal__button'));
        body.classList.remove('body-block');
    }
}

const modal = new ModalWindow();
export default modal;