export default class FormValidator {
  constructor(param, form) {
    this._param = param
    this._form = form
    this._submitButton = this._form.querySelector(this._param.submitButtonSelector)
  }

  _validateInput(input) {
    const inputErrorClass = this._param.inputErrorClass
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`)
    /* Вывовод сообщение об ошибке  */
    errorElement.textContent = input.validationMessage;
    if (input.checkValidity()) {
      input.classList.remove(inputErrorClass);
    } else {
      input.classList.add(inputErrorClass);
    }
  }

  _enableButton() {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._param.inactiveButtonClass);
  }

  disabledButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._param.inactiveButtonClass);
  }

  _setButtonState() {
    if (this._form.checkValidity()) {
      this._enableButton();
    } else {
      this.disabledButton(this._submitButton);
    }
  }

  _handleInput(evt) {
    const input = evt.target;

    this._validateInput(input);

    this._setButtonState();
  }

  enableValidation() {
    this._form.addEventListener('input', (evt) => {
      this._handleInput(evt)
    });
  }
}

