export default class Card {
  constructor(name, link, selectorElement, onClick) {
    this._name = name;
    this._link = link;
    this._selectorElement = selectorElement;
    this._onClick = onClick
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._selectorElement);
    const cardElement = cardTemplate.content.querySelector(".card-item").cloneNode(true);
    return cardElement;
  }

  generateCard() {
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
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._picturesImage.addEventListener('click', () => {
      this._onClick(this._name, this._link)
    });
    this._btnRemove.addEventListener('click', () => {
      this._deleteElement()
    });
    this._btnLike.addEventListener('click', () => {
      this._handleLike()
    })
  }

}
