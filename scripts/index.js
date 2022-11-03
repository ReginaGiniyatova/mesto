let popup = document.querySelector('.popup');
let formUsernameField = document.querySelector('input[name="edit-form_username"]');
let formDescriptionField = document.querySelector('input[name="edit-form_description"]');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let form = document.querySelector('form[name="edit-form"]');

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

form.addEventListener('submit', function(event) {
  handleSaveClick(event, formUsernameField.value, formDescriptionField.value);
  togglePopup(popup);
})
