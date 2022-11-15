const initialCards = [
  {
    name: 'Исаакиевский собор',
    link: './images/place-isaac.jpg',
    alt: 'музей-памятник исаакиевский собор на исаакиевской площади'
  },
  {
    name: 'Казанский собор',
    link: './images/place-kazanskiy.jpg',
    alt: 'казанский кафедральный собор на казанской площади'
  },
  {
    name: 'Атлант',
    link: './images/place-atlant.jpg',
    alt: 'скульптура алтанта на миллионной улице'
  },
  {
    name: 'Спас на Крови',
    link: './images/place-spas-na-krovi.jpg',
    alt: 'храм спаса на крови на набережной канала грибоедова'
  },
  {
    name: 'Триумфальная арка',
    link: './images/place-dvorcovaya.jpg',
    alt: 'триумфальная арка на дворцовой площади'
  },
  {
    name: 'Барклай-де-Толли',
    link: './images/place-statue.jpg',
    alt: 'памятник князю барклаю-де-толли'
  }
];

const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
const popupEditInfo = document.querySelector('#popup-edit');
const formEditInfo = document.querySelector('form[name="edit-form"]');

const popupAddCard = document.querySelector('#popup-add');
const formAddCard = document.querySelector('form[name="add-form"]');

const popupImageView = document.querySelector('#popup-photo-view');

const profileEditInfoBtn = document.querySelector('.profile-info__edit-button');
const profileAddCardBtn = document.querySelector('.profile__add-button');

const openPopup = popup => { popup.classList.add('popup_opened'); };
const closePopup = popup => { popup.classList.remove('popup_opened'); };

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
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__image').setAttribute("src", item.link);
  placeElement.querySelector('.place__image').setAttribute("alt", item.alt);
  placeElement.querySelector('.place__image').addEventListener('click', () => { showPopupImage(item.name, item.link, item.alt); });
  placeElement.querySelector('.place__title').textContent = item.name;
  placeElement.querySelector('.place__like-btn').addEventListener('click', toggleCardLike);
  placeElement.querySelector('.place__delete-btn').addEventListener('click', removeCard);

  return placeElement;
}

function toggleCardLike(event) {
  const target = event.target;
  target.classList.toggle('place__like-btn_active');
}

function addNewCard(name, link, alt) {
  let item = {
    name: name,
    link: link,
    alt: alt
  }

  placesElement.prepend(createCard(item));
}

function removeCard(event) {
  const parent = event.target.closest('.place');
  parent.remove();
}

function showPopupImage(name, link, alt) {
  openPopup(popupImageView);

  image.setAttribute("src", link);
  image.setAttribute("alt", alt);

  label.textContent = name;
}

profileEditInfoBtn.addEventListener('click', () => {
  fillEditInfoDefaultValues();
  openPopup(popupEditInfo);
});


profileAddCardBtn.addEventListener('click', () => { openPopup(popupAddCard); });

formEditInfo.addEventListener('submit', function(event) {
  handleEditInfoSaveClick(event);
  closePopup(popupEditInfo);
})

formAddCard.addEventListener('submit', event => {
  addNewCard(formAddNameField.value, formAddLinkField.value, formAddNameField.value);

  formAddNameField.value = '';
  formAddLinkField.value = '';

  closePopup(popupAddCard);

  event.preventDefault();
})

popupCloseBtns.forEach(btn => {
  const popup = btn.closest('.popup')
  btn.addEventListener('click', () => closePopup(popup));
});

initCards();
