import placeIsaac from '../images/place-isaac.jpg';
import placeKazanskiy from '../images/place-kazanskiy.jpg';
import placeAtlant from '../images/place-atlant.jpg';
import placeSpasNaKrovi from '../images/place-spas-na-krovi.jpg';
import placeDvorcovaya from '../images/place-dvorcovaya.jpg';
import placeStatue from '../images/place-statue.jpg';

const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

const initialCards = [
  {
    name: 'Исаакиевский собор',
    link: placeIsaac
  },
  {
    name: 'Казанский собор',
    link: placeKazanskiy
  },
  {
    name: 'Атлант',
    link: placeAtlant
  },
  {
    name: 'Спас на Крови',
    link: placeSpasNaKrovi
  },
  {
    name: 'Триумфальная арка',
    link: placeDvorcovaya
  },
  {
    name: 'Барклай-де-Толли',
    link: placeStatue
  }
];

export { validationConfig, initialCards }
