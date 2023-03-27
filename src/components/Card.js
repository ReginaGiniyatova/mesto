
export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const placeElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    return placeElement;
  }

  _toggleCardLike() {
    this._likeBtn.classList.toggle('place__like-btn_active');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => { this._handleCardClick(this._name, this._link); });
    this._likeBtn.addEventListener('click', () =>  this._toggleCardLike());
    this._dltBtn.addEventListener('click', () => this._removeCard());
  }

  createCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector('.place__image');
    this._likeBtn = this._element.querySelector('.place__like-btn');
    this._dltBtn = this._element.querySelector('.place__delete-btn');
    this._setEventListeners();



    this._imageElement.setAttribute("src", this._link);
    this._imageElement.setAttribute("alt", this._name);


    this._element.querySelector('.place__title').textContent = this._name;

    return this._element;
  }

}
