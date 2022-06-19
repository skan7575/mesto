export default class Popup {

  _popupOpenedClass = "popup_opened"
  _closeButtonClass = ".popup__close-button"

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseBinded = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add(this._popupOpenedClass)
    document.addEventListener('keydown', this._handleEscCloseBinded)
  }

  close() {
    this._popup.classList.remove(this._popupOpenedClass);
    document.removeEventListener('keydown', this._handleEscCloseBinded)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector(this._closeButtonClass)
      .addEventListener('click', () => {
        this.close()
      })

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._popupOpenedClass)) {
        this.close()
      }
    })
  }
}

