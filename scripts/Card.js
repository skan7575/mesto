export default class Card {
  constructor(name, link, selectorElement) {
    this._name = name;
    this._link = link;
    this._selectorElement = selectorElement;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(`#${this._selectorElement}`);
    const cardElement = cardTemplate.content.querySelector(".card-item").cloneNode(true);
    return cardElement;
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._picturesImage = this._element.querySelector('.gallery__pic');
    this._btnRemove = this._element.querySelector(".gallery__button-remove");
    this._btnLike = this._element.querySelector(".gallery__like-button");

    this._element.querySelector('.gallery__title').textContent = this._name;
    this._picturesImage.src = this._link;
    this._picturesImage.alt = this._name;
    this._setEventListeners()
    return this._element;
  }

  _handleLike() {
    this._btnLike.classList.toggle("gallery__like-button_active");
  }

  _deleteElement() {
    this._element.remove()
  }

  _openPopup() {
    this._popupPicture = document.querySelector("#popup__picture");
    this._popupPicture.classList.add("popup_opened");
    this._popupPicture.querySelector(".popup__text_picture").textContent = this._name;
    this._popupPicture.querySelector(".popup__picture-caption").alt = this._name;
    this._popupPicture.querySelector(".popup__picture-caption").src = this._link;

  }

  _setEventListeners() {
    this._picturesImage.addEventListener('click', () => {
      this._openPopup()
    });
    this._btnRemove.addEventListener('click', () => {
      this._deleteElement()
    });
    this._btnLike.addEventListener('click', () => {
      this._handleLike()
    })
  }

}
