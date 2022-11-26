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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};
