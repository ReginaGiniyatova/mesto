import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._popupElement.querySelector('.popup__image');
    this._label = this._popupElement.querySelector('.popup__label');
  }

  open = (name, link) => {
    super.open();

    this._image.setAttribute("src", link);
    this._image.setAttribute("alt", name);

    this._label.textContent = name;
  }
}
