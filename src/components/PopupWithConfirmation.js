import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);

    this._submitCallback = submitCallback;
    this._formElement = this._popupElement.querySelector('form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitCallback(this._card);
    });
  }

  open(card) {
    super.open();
    this._card = card;
  }

}
