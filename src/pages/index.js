import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {btnProfile, profileForm, buttonAddPlace, formAddCard, buttonEditAvatar, formEditAvatar} from "../components/virables.js"
import { api } from "../components/Api.js";



const cardPopup = new PopupWithForm("#edit-popup", addCard)
cardPopup.setEventListeners()

const profilePopup = new PopupWithForm("#edit-profile", handleSubmitFormProfile)
profilePopup.setEventListeners()

const AvatarEditPopup = new PopupWithForm("#edit-profile-avatar", handleSubmitFormAvatar)
AvatarEditPopup.setEventListeners()

const nameInputProfilePopup =  profilePopup.getForm().querySelector("#input__name");
const aboutInputProfilePopup = profilePopup.getForm().querySelector("#input__about");

const picturePopup = new PopupWithImage("#popup__picture")
picturePopup.setEventListeners()

const userInfo = new UserInfo({nameSelector: ".user__profile-name", aboutSelector: ".user__profile-about", avatarSelector: ".user__picture"})

const cardsSection = new Section(
  { items: [], renderer: function (item) {
    }},
  '.gallery__items'
)

cardsSection.renderer()

// вызов открытия попапов

buttonEditAvatar.addEventListener("click", () => {
  AvatarEditPopup.open()
  avatarFormValidator.disabledButton();
});

btnProfile.addEventListener("click", () => {
  const user = userInfo.getUserInfo()
  nameInputProfilePopup.value = user.name
  aboutInputProfilePopup.value = user.about

  profilePopup.open()
});

function openPreviewPopup(name, link) {
  picturePopup.setData(link, name)
  picturePopup.open()
}

function openCardDeleteConfirmPopup(card, cardId) {
  const cardDeletePopup = new PopupWithForm("#popup-delete", () => {
    handleSubmitFormDeleteCard(card, cardId)
  })
  cardDeletePopup.setEventListeners()
  cardDeletePopup.open()
}


function onLikeClick(card, cardId, like) {
  if (like) {
   api.setLike(cardId).then(res => {
     card.setLike(res.likes, true)
   })
  } else {
    api.deleteLike(cardId).then(res => {
      card.setLike(res.likes, false)
    })
  }
}

function createCard(cardId, name, link, likes, canDelete, isLiked) {
  return new Card(
    cardId,
    name,
    link,
    likes,
    isLiked,
    '#template__item',
    openPreviewPopup,
    openCardDeleteConfirmPopup,
    canDelete,
    onLikeClick
  )
    .generateCard()

}


const validatorParam = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'error'
};

const profileFormValidator = new FormValidator(
  validatorParam,
  profileForm
)

profileFormValidator.enableValidation()

const avatarFormValidator = new FormValidator(
  validatorParam,
  formEditAvatar
)
avatarFormValidator.enableValidation()

const addCardFormValidator = new FormValidator(
  validatorParam,
  formAddCard
)
addCardFormValidator.enableValidation()

buttonAddPlace.addEventListener("click", () => {
  cardPopup.open()
  addCardFormValidator.disabledButton();
});

api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)

    api.getInitialCards()
      .then(cardList => {
        cardList.forEach(data => {
          const cardItem = createCard(
            data._id,
            data.name,
            data.link,
            data.likes,
            data.owner._id === res._id,
            data.likes.find(item => item._id === res._id),
            );
          cardsSection.addItem(cardItem)
        })
      })
  })

function handleSubmitFormProfile(data, popup) {
  api.editProfile(data["input__name"], data["input__about"])
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar)
      popup.close()
    })
}

function handleSubmitFormAvatar(data, popup) {
  api.editAvatar(data['input__href_avatar'])
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar)
      popup.close()
    })
}

function addCard(data, popup) {
  api.addCard(data["input__place"], data["input__href"])
    .then(res => {
      const cardItem = createCard(res._id, res.name, res.link, res.likes, true);
      cardsSection.addItem(cardItem)
      popup.close()
    })
}

function handleSubmitFormDeleteCard(card, cardId) {
  api.deleteCard(cardId)
    .then(res => {
      card.deleteElement()
    })
}
