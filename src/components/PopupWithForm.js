import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);

    this._submitCallback = submitCallback;
    this._formElement = this._popupElement.querySelector('form');
    this._submitBtn = this._formElement.querySelector('button');
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
  }

  _getInputValues() {
    this._values = {};

    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setInputValues(values) {
    this._inputList.forEach(input => {
      if (values[input.name]) input.value = values[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();

      this._submitCallback(this._getInputValues());
    });
  }

  setSubmitTextStates(states) {
    this._submitTextStates = states;
  }

  updateSubmitText(state) {
    if (this._submitTextStates[state])
      this._submitBtn.textContent = this._submitTextStates[state];
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
