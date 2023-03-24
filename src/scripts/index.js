import { Card } from './Card.js';
import { FormValidator } from './formValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

import placeIsaac from '../images/place-isaac.jpg';
import placeKazanskiy from '../images/place-kazanskiy.jpg';
import placeAtlant from '../images/place-atlant.jpg';
import placeSpasNaKrovi from '../images/place-spas-na-krovi.jpg';
import placeDvorcovaya from '../images/place-dvorcovaya.jpg';
import placeStatue from '../images/place-statue.jpg';

import '../pages/index.css';


const editInfoPopup = new PopupWithForm('#popup-edit', values => {
  userInfo.setUserInfo(values);
  editInfoPopup.close();
});

editInfoPopup.setEventListeners();

const addCardPopup = new PopupWithForm('#popup-add', values => {
  addNewCard({
    name : values.name,
    link : values.link
  })
  addCardPopup.close();
});

addCardPopup.setEventListeners();

const profileEditInfoBtn = document.querySelector('.profile-info__edit-button');
const profileAddCardBtn = document.querySelector('.profile__add-button');

const userInfo = new UserInfo('.profile-info__username', '.profile-info__user-description');

const popupWithImage = new PopupWithImage('#popup-photo-view');
popupWithImage.setEventListeners();

const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

const editFormValidator = new FormValidator(validationConfig, '#popup-edit .popup__form');
const addFormValidation = new FormValidator(validationConfig, '#popup-add .popup__form');

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

const cardSectionList = new Section( { items: initialCards, renderer: addNewCard }, '.places');


function createCard(item) {
  const card = new Card(item, '#place', popupWithImage.open);
  return card.createCard();
}

function addNewCard(item) {
  cardSectionList.addItem(createCard(item));
}

const enableValidation = () => {
  editFormValidator.enableValidation();
  addFormValidation.enableValidation();
}

cardSectionList.renderItems();

profileEditInfoBtn.addEventListener('click', () => {
  editInfoPopup.setInputValues(userInfo.getUserInfo());
  editFormValidator.resetValidation();
  editInfoPopup.open();
});

profileAddCardBtn.addEventListener('click', () => {
  addFormValidation.resetValidation();
  addCardPopup.open();
});

enableValidation();
