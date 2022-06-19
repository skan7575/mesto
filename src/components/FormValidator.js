export default class FormValidator {
  constructor(param, form) {
    this._param = param
    this._form = form
    this._submitButton = this._form.querySelector(this._param.submitButtonSelector)
  }

  _validateInput(input) {
    const inputErrorClass = this._param.inputErrorClass
    const errorElement = input.closest('.popup__label').querySelector('span')
    /* Вывовод сообщение об ошибке  */
    errorElement.textContent = input.validationMessage;
    if (input.checkValidity()) {
      input.classList.remove(inputErrorClass);
    } else {
      input.classList.add(inputErrorClass);
    }
  }

  _enableButton(button) {
    button.disabled = false;
    button.classList.remove(this._param.inactiveButtonClass);
  }

  disabledButton(button) {
    button.disabled = true;
    button.classList.add(this._param.inactiveButtonClass);
  }

  _setButtonState(button) {
    if (this._form.checkValidity()) {
      this._enableButton(button);
    } else {
      this.disabledButton(button);
    }
  }

  _handleInput(evt) {
    const input = evt.target;

    this._validateInput(input);

    this._setButtonState(this._submitButton);
  }

  enableValidation() {
    // this._form.addEventListener('submit', this._handleSubmit);
    this._form.addEventListener('input', (evt) => {
      this._handleInput(evt)
    });
  }
}

