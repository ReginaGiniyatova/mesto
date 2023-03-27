import { Card } from '../components/Card.js';
import { FormValidator } from '../components/formValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { validationConfig, initialCards } from '../utils/constants.js';

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

const editFormValidator = new FormValidator(validationConfig, '#popup-edit .popup__form');
const addFormValidation = new FormValidator(validationConfig, '#popup-add .popup__form');

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
