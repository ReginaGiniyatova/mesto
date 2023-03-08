export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;

    this._formElement = document.querySelector(this._formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
    this._buttonSubmit = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _hideErrorElement(errorElement, inputElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _showErrorElement(errorElement, inputElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _isInputValid = (inputElement) => inputElement.validity.valid;
  _isEveryInputValid = () => Array.from(this._inputList).every(input => input.validity.valid);

  _disableSubmitButton() {
    this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
    this._buttonSubmit.setAttribute('disabled', '');
  }

  _enableSubmitButton() {
    this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    this._buttonSubmit.removeAttribute('disabled');
  }

  _setSubmitState() {
    if(this._isEveryInputValid()) this._enableSubmitButton();
    else this._disableSubmitButton();
  }

  _clearErrorsState() {
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      this._hideErrorElement(errorElement, inputElement);
    });
  }

  _setEventListener(inputElement) {
    inputElement.addEventListener('input', () => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

      if(this._isInputValid(inputElement)) this._hideErrorElement(errorElement, inputElement);
      else this._showErrorElement(errorElement, inputElement);

      this._setSubmitState();
    });
  }

  resetValidation() {
    this._clearErrorsState();
    this._setSubmitState();
  }

  enableValidation() {
     this._inputList.forEach(inputElement => this._setEventListener(inputElement));
  }
}
