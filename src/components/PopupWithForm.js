import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form")
    this._submitCallback = submitCallback
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
  }

  getForm() {
    return this._form
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    let values = {}
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
      this._submitCallback(this._getInputValues())
      this.close()
    })
  }
}
