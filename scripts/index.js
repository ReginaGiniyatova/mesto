import { Card } from './Card.js';
import { FormValidator } from './formValidator.js';

const popupEditInfo = document.querySelector('#popup-edit');
const formEditInfo = document.querySelector('form[name="edit-form"]');

const popupAddCard = document.querySelector('#popup-add');
const formAddCard = document.querySelector('form[name="add-form"]');

const popupImageView = document.querySelector('#popup-photo-view');

const profileEditInfoBtn = document.querySelector('.profile-info__edit-button');
const profileAddCardBtn = document.querySelector('.profile__add-button');

const openPopup = popup => popup.classList.add('popup_opened');
const closePopup = popup => popup.classList.remove('popup_opened');

const formUsernameField = document.querySelector('input[name="edit-form_username"]');
const formDescriptionField = document.querySelector('input[name="edit-form_description"]');
const profileUsername = document.querySelector('.profile-info__username');
const profileDescription = document.querySelector('.profile-info__user-description');

const placesElement = document.querySelector('.places');

const image = popupImageView.querySelector('.popup__image');
const label = popupImageView.querySelector('.popup__label');

const formAddNameField = document.querySelector('input[name="edit-form_name"]');
const formAddLinkField = document.querySelector('input[name="edit-form_link"]');

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

function fillEditInfoDefaultValues() {
  formUsernameField.value = profileUsername.textContent;
  formDescriptionField.value = profileDescription.textContent;
}

function handleEditInfoSaveClick() {
  profileUsername.textContent = formUsernameField.value;
  profileDescription.textContent = formDescriptionField.value;
}

function initCards() {
  initialCards.forEach(item => {
    placesElement.append(createCard(item));
  });
}

function createCard(item) {
  const card = new Card(item, '#place', showPopupImage);
  return card.createCard();
}

function addNewCard(name, link) {
  const item = {
    name: name,
    link: link
    }

  placesElement.prepend(createCard(item));
}


function showPopupImage(name, link, alt) {
  openPopup(popupImageView);

  image.setAttribute("src", link);
  image.setAttribute("alt", alt);

  label.textContent = name;
}

const handleCloseClickEvent = (event) => {
  const popup = event.currentTarget;

  if(event.target.classList.contains('popup__close-btn') || event.target.classList.contains('popup'))
  closePopup(popup);
}

const registerPopupCloseOnClickListener = popup => popup.addEventListener('click', handleCloseClickEvent);

const handleKeyboardEvent = (event) => {
  const popup = document.querySelector('.popup_opened');

  if(popup && event.code === 'Escape')
    closePopup(popup);
};

const registerPopupCloseOnEscListener = () => document.addEventListener('keydown', handleKeyboardEvent);

const enableValidation = () => {
  editFormValidator.enableValidation();
  addFormValidation.enableValidation();
}

const setEventsListeners = () => {
  profileEditInfoBtn.addEventListener('click', () => {
    fillEditInfoDefaultValues();
    editFormValidator.reset();
    openPopup(popupEditInfo);
  });

  profileAddCardBtn.addEventListener('click', () => {
    formAddCard.reset();
    addFormValidation.reset();
    openPopup(popupAddCard);
  });

  formEditInfo.addEventListener('submit', function(event) {
    handleEditInfoSaveClick();
    closePopup(popupEditInfo);

    event.preventDefault();
  });

  formAddCard.addEventListener('submit', event => {
    addNewCard(formAddNameField.value, formAddLinkField.value, formAddNameField.value);

    formAddCard.reset();
    closePopup(popupAddCard);

    event.preventDefault();
  });

  registerPopupCloseOnClickListener(popupImageView);
  registerPopupCloseOnClickListener(popupEditInfo);
  registerPopupCloseOnClickListener(popupAddCard);
  registerPopupCloseOnEscListener();
}

initCards();
setEventsListeners();
enableValidation();




