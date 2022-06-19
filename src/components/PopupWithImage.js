import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  _captionSelector = ".popup__picture-caption"
  _textSelector = ".popup__text_picture"

  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popup.querySelector(this._captionSelector)
    this._text = this._popup.querySelector(this._textSelector)
  }

  setData(image, label) {
    this._image = image
    this._label = label
  }

  open() {
    this._caption.src = this._image
    this._caption.alt = this._label
    this._text.textContent = this._label
    super.open();
  }
}
