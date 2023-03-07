export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;

    this._formElement = document.querySelector(this._formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
    this._buttonSubmit = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _hideErrorElement(errorElement, inputElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }

  _showErrorElement(errorElement, inputElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _isInputValid = (inputElement) => inputElement.validity.valid;
  _isEveryInputValid = () => Array.from(this._inputList).every(input => input.validity.valid);

  _disableSubmitButton(config) {
    this._buttonSubmit.classList.add(config.inactiveButtonClass);
    this._buttonSubmit.setAttribute('disabled', '');
  }

  _enableSubmitButton(config) {
    this._buttonSubmit.classList.remove(config.inactiveButtonClass);
    this._buttonSubmit.removeAttribute('disabled');
  }

  _setSubmitState() {
    if(this._isEveryInputValid()) this._enableSubmitButton(this._config);
    else this._disableSubmitButton(this._config);
  }

  _clearErrorsState(popup) {
    this._inputList.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      if(errorElement.classList.contains('form__error_visible'))
        errorElement.classList.remove('form__error_visible');
      if(inputElement.classList.contains('form__input_type_error'))
        inputElement.classList.remove('form__input_type_error');
    });
  }

  _setEventListener(inputElement) {
    inputElement.addEventListener('input', () => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

      if(this._isInputValid(inputElement)) this._hideErrorElement(errorElement, inputElement, this._config);
      else this._showErrorElement(errorElement, inputElement, this._config);

      this._setSubmitState();
    });
  }

  reset() {
    this._clearErrorsState();
    this._setSubmitState();
  }

  enableValidation() {
     this.reset();
     this._inputList.forEach(inputElement => this._setEventListener(inputElement));
  }
}
