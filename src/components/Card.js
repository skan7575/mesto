export default class Card {
  constructor(cardId, name, link, likes, isLikeActive, selectorElement, onClick, onDeleteClick, canDelete, onLikeClick) {
    this._cardId = cardId
    this._name = name;
    this._link = link;
    this._selectorElement = selectorElement;
    this._onClick = onClick;
    this._likes = likes
    this._isLikeActive = isLikeActive
    this._onDeleteClick = onDeleteClick
    this._canDelete = canDelete
    this._onLikeClick = onLikeClick
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
    this.setLike(this._likes, this._isLikeActive)
    this._setEventListeners()
    if (this._canDelete) {
      this._btnRemove.classList.remove('gallery__button-remove_disabled')
    } else {
      this._btnRemove.classList.add('gallery__button-remove_disabled')
    }
    return this._element;
  }

  setLike(likes, isLikeActive) {
    this._likes = likes

    const likeCounter = this._element.querySelector('.gallery__like-counter')
    if (this._likes) {
      likeCounter.textContent = this._likes.length
    } else {
      likeCounter.textContent = "0"
    }

    this._isLikeActive = isLikeActive
    if (isLikeActive) {
      this._btnLike.classList.add("gallery__like-button_active");
    } else {
      this._btnLike.classList.remove("gallery__like-button_active");
    }
  }

  deleteElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._picturesImage.addEventListener('click', () => {
      this._onClick(this._name, this._link)
    });
    this._btnRemove.addEventListener('click', () => {
      this._onDeleteClick(this, this._cardId)
    });
    this._btnLike.addEventListener('click', () => {
      this._onLikeClick(this, this._cardId, !this._isLikeActive)
    })
  }

}
