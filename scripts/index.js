let popup = document.querySelector('.popup');
let formUsernameField = document.querySelector('input[name="edit-form_username"]');
let formDescriptionField = document.querySelector('input[name="edit-form_description"]');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popupSaveBtn = document.querySelector('.edit-form__save-btn');

let profileUsername = document.querySelector('.profile-info__username');
let profileDescription = document.querySelector('.profile-info__user-description');
let profileEditBtn = document.querySelector('.profile-info__edit-button');

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function fillDefaultValues(name, desc) {
  formUsernameField.value = name;
  formDescriptionField.value = desc;
}

function handleSaveClick(event, name, desc) {
  event.preventDefault();

  profileUsername.textContent = name;
  profileDescription.textContent = desc;
}

profileEditBtn.addEventListener('click', function() {
  togglePopup(popup);
  fillDefaultValues(profileUsername.textContent, profileDescription.textContent);
});

popupCloseBtn.addEventListener('click', function() { togglePopup(popup); });

popupSaveBtn.addEventListener('click', function(event) {
  handleSaveClick(event, formUsernameField.value, formDescriptionField.value);
  togglePopup(popup);
})
