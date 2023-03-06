import { showPopupImage, toggleCardLike, removeCard } from "./index.js";

export const initialCards = [
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

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const placeElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    return placeElement;
  }

  _setEventListeners() {
    this._element.querySelector('.place__image').addEventListener('click', () => { showPopupImage(this._name, this._link, this._alt); });
    this._element.querySelector('.place__like-btn').addEventListener('click', toggleCardLike);
    this._element.querySelector('.place__delete-btn').addEventListener('click', removeCard);
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placeImageElement = this._element.querySelector('.place__image');

    placeImageElement.setAttribute("src", this._link);
    placeImageElement.setAttribute("alt", this._alt);


    this._element.querySelector('.place__title').textContent = this._name;

    return this._element;
  }

}
