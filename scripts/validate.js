export default class FormValidator {
  constructor(param, form) {
    this._param = param
    this._form = form
  }

  _validateInput(input, isValid,inputErrorClass) {
    const errorElement = input.parentNode.querySelector('span')
    /* Вывовод сообщение об ошибке  */
    errorElement.textContent = input.validationMessage;
    if (isValid) {
      input.classList.remove(inputErrorClass);
    } else {
      input.classList.add(inputErrorClass);
    }
  }

  _enableButton(button, inActiveButtonClass) {
    button.disabled = false;
    button.classList.remove(inActiveButtonClass);
  }

  _disabledButton (button, inActiveButtonClass) {
    button.disabled = true;
    button.classList.add(inActiveButtonClass);
  }

  _setButtonState(button, isValid, inActiveButtonClass) {
    if (isValid) {
      this._enableButton(button, inActiveButtonClass);
    } else {
      this._disabledButton(button, inActiveButtonClass);
    }
  }

  _handleInput(evt)  {
    const currentForm = evt.currentTarget;
    const input = evt.target;
    const submitButton = currentForm.querySelector(this._param.submitButtonSelector);

    this._validateInput(input, input.checkValidity(),  this._param.inputErrorClass);

    this._setButtonState(submitButton, currentForm.checkValidity(), this._param.inactiveButtonClass);
  }

   _handleSubmit(evt) {
    evt.preventDefault();

    if (this._form.checkValidity()) {
      this._form.reset();
    }
  }

  enableValidation() {
    // this._form.addEventListener('submit', this._handleSubmit);
    this._form.addEventListener('submit', (evt) => {
      this._handleSubmit(evt)
    });
    this._form.addEventListener('input', (evt) => {
      this._handleInput(evt)
    });
  }
}

