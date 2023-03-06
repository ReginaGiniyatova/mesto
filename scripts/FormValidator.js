export class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formSelector = formSelector;
  }

  _hideErrorElement(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }

  _showErrorElement(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
  }

  _isInputsValid(formElement, config) {
    const inputsList = Array.from(formElement.querySelectorAll(config.inputSelector));

    inputsList.forEach(inputElement => {
      const isValid = inputElement.validity.valid;

      if(!isValid) this._showErrorElement(formElement, inputElement, inputElement.validationMessage, config);
      else this._hideErrorElement(formElement, inputElement, config);
    });

    return inputsList.every(inputElement => inputElement.validity.valid);
  }

  _disableSubmitButton(formElement, config) {
    const buttonSubmit = formElement.querySelector(config.submitButtonSelector);

    buttonSubmit.classList.add(config.inactiveButtonClass);
    buttonSubmit.setAttribute('disabled', '');
  }

  _enableSubmitButton(formElement, config) {
    const buttonSubmit = formElement.querySelector(config.submitButtonSelector);

    buttonSubmit.classList.remove(config.inactiveButtonClass);
    buttonSubmit.removeAttribute('disabled');
  }

  enableValidation() {
    const formsList = Array.from(document.querySelectorAll(this._formSelector));

    formsList.forEach(formElement => {
      formElement.addEventListener('input', () => {
        if(this._isInputsValid(formElement, this._config)) this._enableSubmitButton(formElement, this._config);
        else this._disableSubmitButton(formElement, this._config);
      })
    });
  }
}
