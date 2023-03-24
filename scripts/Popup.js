export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup__close-btn') || event.target.classList.contains('popup'))
      this.close();
    } );
  }

  _handleEscClose = event => {
    if(event.code === 'Escape') {
        this.close();
      };
  }
}
