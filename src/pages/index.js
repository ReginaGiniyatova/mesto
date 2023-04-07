import { Card } from '../components/Card.js';
import { FormValidator } from '../components/formValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { validationConfig } from '../utils/constants.js';

import '../pages/index.css';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const apiClient = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '5bf1b9a2-bdaf-45b2-a6be-6aae9b831c55',
    'Content-Type': 'application/json'
  }
});


const editInfoPopup = new PopupWithForm('#popup-edit', values => {
  editInfoPopup.updateSubmitText('async');

  apiClient.patchUserInfo(values)
    .then(data => {
      userInfo.setUserInfo(data);
      editInfoPopup.close();
    })
    .catch(error => console.log(error))
    .finally(data => editInfoPopup.updateSubmitText('default'));
});

editInfoPopup.setEventListeners();
editInfoPopup.setSubmitTextStates({
  'default': 'Сохранить',
  'async': 'Сохранение...'
});

const addCardPopup = new PopupWithForm('#popup-add', values => {
  addCardPopup.updateSubmitText('async');

  apiClient.addNewCard(values)
    .then(data => {
      addNewCard(data);
      addCardPopup.close();
    })
    .catch(error => console.log(error))
    .finally(data => addCardPopup.updateSubmitText('default'));
});

addCardPopup.setEventListeners();
addCardPopup.setSubmitTextStates({
  'default': 'Создать',
  'async': 'Сохранение...'
});


const profileEditInfoBtn = document.querySelector('.profile-info__edit-button');
const profileAddCardBtn = document.querySelector('.profile__add-button');

const userInfo = new UserInfo('.profile-info__username', '.profile-info__user-description', '.profile__avatar');

const popupWithImage = new PopupWithImage('#popup-photo-view');
popupWithImage.setEventListeners();

const editFormValidator = new FormValidator(validationConfig, '#popup-edit .popup__form');
const addFormValidation = new FormValidator(validationConfig, '#popup-add .popup__form');
const avatarFormValidator = new FormValidator(validationConfig, '#popup-avatar .popup__form');

const cardSectionList = new Section( { items: [], renderer: addNewCard }, '.places');

const avatarElement = document.querySelector('.profile__avatar-cover');
avatarElement.addEventListener('click', onAvatarClick);

const removePopup = new PopupWithConfirmation('#popup-remove', (card) => {
  apiClient.deleteCard(card.getCardId())
    .then(data => {
      card.removeCard();
      removePopup.close();
    })
    .catch(error => console.log(error));
});
removePopup.setEventListeners();

const avatarPopup = new PopupWithForm('#popup-avatar', values => {
  avatarPopup.updateSubmitText('async');

  apiClient.uploadAvatar(values.link)
    .then(data => {
      userInfo.setUserAvatar(data.avatar);
      avatarPopup.close();
    })
    .catch(error => console.log(error))
    .finally(data => avatarPopup.updateSubmitText('default'));
});

avatarPopup.setEventListeners();
avatarPopup.setSubmitTextStates({
  'default': 'Сохранить',
  'async': 'Сохранение...'
});


function createCard(item) {
  const card = new Card(item, userInfo.getUserInfoId(), '#place', popupWithImage.open, confirmationCallback, onLikeCallback);
  return card.createCard();
}

function addNewCard(item) {
  cardSectionList.addItem(createCard(item));
}

function confirmationCallback(card) {
  removePopup.open(card);
}

function onLikeCallback(card) {
  if (card.isLiked()) {
    apiClient.removeLike(card.getCardId())
      .then(data => card.updateCard(data))
      .catch(error => console.log(error));
  }
  else {
    apiClient.setLike(card.getCardId())
    .then(data => card.updateCard(data))
    .catch(error => console.log(error));
  }
}

function onAvatarClick() {
  avatarPopup.open();
}

const enableValidation = () => {
  editFormValidator.enableValidation();
  addFormValidation.enableValidation();
  avatarFormValidator.enableValidation();

}

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

Promise.all([apiClient.getUserInfo(), apiClient.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);

    cardSectionList.renderItems(cardsData);
  })
  .catch(error => console.log(error));
