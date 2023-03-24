import { Card } from './Card.js';
import { FormValidator } from './formValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';


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
    link: './images/place-isaac.jpg'
  },
  {
    name: 'Казанский собор',
    link: './images/place-kazanskiy.jpg'
  },
  {
    name: 'Атлант',
    link: './images/place-atlant.jpg'
  },
  {
    name: 'Спас на Крови',
    link: './images/place-spas-na-krovi.jpg'
  },
  {
    name: 'Триумфальная арка',
    link: './images/place-dvorcovaya.jpg'
  },
  {
    name: 'Барклай-де-Толли',
    link: './images/place-statue.jpg'
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
