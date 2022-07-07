import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form")
    this._button = this._form.querySelector('button[type="submit"]')
    this._submitCallback = submitCallback
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
    this._popupButtonTextDefault = this._button.textContent
  }

  setSubmitCallback(submitCallback) {
    this._submitCallback = submitCallback
  }

  getForm() {
    return this._form
  }

  open() {
    this._button.textContent = this._popupButtonTextDefault
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    const values = {}
    this._inputs
      .forEach(item => {
        values[item.id] = item.value
      })
    return values
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._button.textContent = "сохранение ..."
      this._submitCallback(this._getInputValues(), this)
    })
  }
}
