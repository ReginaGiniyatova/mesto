
export class Card {
  constructor(data, templateSelector, showPopupImageFunction) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._showPopupImage = showPopupImageFunction;
  }

  _getTemplate() {
    const placeElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    return placeElement;
  }

  _toggleCardLike(event) {
    const target = event.target;
    target.classList.toggle('place__like-btn_active');
  }

  _removeCard(event) {
    const parent = event.target.closest('.place');
    parent.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.place__image').addEventListener('click', () => { this._showPopupImage(this._name, this._link, this._name); });
    this._element.querySelector('.place__like-btn').addEventListener('click', this._toggleCardLike);
    this._element.querySelector('.place__delete-btn').addEventListener('click', this._removeCard);
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placeImageElement = this._element.querySelector('.place__image');

    placeImageElement.setAttribute("src", this._link);
    placeImageElement.setAttribute("alt", this._name);


    this._element.querySelector('.place__title').textContent = this._name;

    return this._element;
  }

}
