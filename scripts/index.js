import { Card, initialCards } from './Card.js';
import { FormValidator } from './formValidator.js';

const popupCloseElementList = document.querySelectorAll('.popup__close-btn');
const popupEditInfo = document.querySelector('#popup-edit');
const formEditInfo = document.querySelector('form[name="edit-form"]');

const popupAddCard = document.querySelector('#popup-add');
const formAddCard = document.querySelector('form[name="add-form"]');

const popupImageView = document.querySelector('#popup-photo-view');

const profileEditInfoBtn = document.querySelector('.profile-info__edit-button');
const profileAddCardBtn = document.querySelector('.profile__add-button');

const openPopup = popup => {
  popup.classList.add('popup_opened');

  registerPopupCloseOnClickListener(popup);
  registerPopupCloseOnEscListener(popup);
};
const closePopup = popup => {
  popup.classList.remove('popup_opened');

  removePopupCloseOnClickListener(popup);
  removePopupCloseOnEscListener();
};

const formUsernameField = document.querySelector('input[name="edit-form_username"]');
const formDescriptionField = document.querySelector('input[name="edit-form_description"]');
const profileUsername = document.querySelector('.profile-info__username');
const profileDescription = document.querySelector('.profile-info__user-description');

const placeTemplate = document.querySelector('#place').content;
const placesElement = document.querySelector('.places');

const image = popupImageView.querySelector('.popup__image');
const label = popupImageView.querySelector('.popup__label');

const formAddNameField = document.querySelector('input[name="edit-form_name"]');
const formAddLinkField = document.querySelector('input[name="edit-form_link"]');

function fillEditInfoDefaultValues() {
  formUsernameField.value = profileUsername.textContent;
  formDescriptionField.value = profileDescription.textContent;
}

function handleEditInfoSaveClick(event) {
  profileUsername.textContent = formUsernameField.value;
  profileDescription.textContent = formDescriptionField.value;

  event.preventDefault();
}

function initCards() {
  initialCards.forEach(item => {
    placesElement.append(createCard(item));
  });
}

function createCard(item) {
  const card = new Card(item, '#place');
  return card.createCard();
}

export function toggleCardLike(event) {
  const target = event.target;
  target.classList.toggle('place__like-btn_active');
}

function addNewCard(name, link, alt) {
  const item = {
    name: name,
    link: link,
    alt: alt
  }

  placesElement.prepend(createCard(item));
}

export function removeCard(event) {
  const parent = event.target.closest('.place');
  parent.remove();
}

export function showPopupImage(name, link, alt) {
  openPopup(popupImageView);

  image.setAttribute("src", link);
  image.setAttribute("alt", alt);

  label.textContent = name;
}

profileEditInfoBtn.addEventListener('click', () => {
  clearErrorsState(popupEditInfo);
  fillEditInfoDefaultValues();

  openPopup(popupEditInfo);
});


profileAddCardBtn.addEventListener('click', () => {
  clearErrorsState(popupAddCard);
  formAddCard.reset();

  openPopup(popupAddCard);
});

formEditInfo.addEventListener('submit', function(event) {
  handleEditInfoSaveClick(event);
  closePopup(popupEditInfo);
})

formAddCard.addEventListener('submit', event => {
  addNewCard(formAddNameField.value, formAddLinkField.value, formAddNameField.value);

  formAddCard.reset();
  closePopup(popupAddCard);

  event.preventDefault();
})

const clearErrorsState = (popup) => {
  const errorsList = Array.from(popup.querySelectorAll('.form__error'));
  const inputsList = Array.from(popup.querySelectorAll('.form__input'));

  errorsList.forEach(errorElement => {
    if(errorElement.classList.contains('form__error_visible'))
      errorElement.classList.remove('form__error_visible');
  });

  inputsList.forEach(inputElement => {
    if(inputElement.classList.contains('form__input_type_error'))
    inputElement.classList.remove('form__input_type_error');
  });
};

const handleCloseClickEvent = (event) => {
  const popup = event.target.closest('.popup');

  if(event.target.classList.contains('popup__close-btn') || event.target.classList.contains('popup'))
  closePopup(popup);
}

const registerPopupCloseOnClickListener = popup => popup.addEventListener('click', handleCloseClickEvent);
const removePopupCloseOnClickListener = popup => popup.addEventListener('click', handleCloseClickEvent);

const handleKeyboardEvent = (event, popup) => {
  if(event.code === 'Escape')
    closePopup(popup);
};

const registerPopupCloseOnEscListener = (popup) => document.addEventListener('keydown', event => handleKeyboardEvent(event, popup));
const removePopupCloseOnEscListener = () => document.removeEventListener('keydown', handleKeyboardEvent);

const enableValidation = () => {
  const validationConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: 'form__save-btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  };

  const editFormValidator = new FormValidator(validationConfig, '#popup-edit .popup__form');
  editFormValidator.enableValidation();

  const addFormValidation = new FormValidator(validationConfig, '#popup-add .popup__form');
  addFormValidation.enableValidation();
}

initCards();
enableValidation();

