const hideErrorElement = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const showErrorElement = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

const isInputsValid = (formElement, config) => {
  const inputsList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputsList.forEach(inputElement => {
    const isValid = inputElement.validity.valid;

    if(!isValid) showErrorElement(formElement, inputElement, inputElement.validationMessage, config);
    else hideErrorElement(formElement, inputElement, config);
  });

  return inputsList.every(inputElement => inputElement.validity.valid);
};

const disableSubmitButton = (formElement, config) => {
  const buttonSubmit = formElement.querySelector(config.submitButtonSelector);

  buttonSubmit.classList.add(config.inactiveButtonClass);
  buttonSubmit.setAttribute('disabled', '');
};

const enableSubmitButton = (formElement, config) => {
  const buttonSubmit = formElement.querySelector(config.submitButtonSelector);

  buttonSubmit.classList.remove(config.inactiveButtonClass);
  buttonSubmit.removeAttribute('disabled');
};

const enableValidation = config => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  formsList.forEach(formElement => {
    formElement.addEventListener('input', () => {
      if(isInputsValid(formElement, config)) enableSubmitButton(formElement, config);
      else disableSubmitButton(formElement, config);
    })
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__save-btn',
  inactiveButtonClass: 'edit-form__save-btn_disabled',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__error_visible'
});
