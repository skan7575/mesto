import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  btnProfile,
  profileForm,
  buttonAddPlace,
  formAddCard,
  buttonEditAvatar,
  formEditAvatar,
  validatorParam
} from "../components/virables.js"
import {api} from "../components/Api.js";


const cardPopup = new PopupWithForm("#edit-popup", addCard)
cardPopup.setEventListeners()

const profilePopup = new PopupWithForm("#edit-profile", handleSubmitFormProfile)
profilePopup.setEventListeners()

const avatarEditPopup = new PopupWithForm("#edit-profile-avatar", handleSubmitFormAvatar)
avatarEditPopup.setEventListeners()

const nameInputProfilePopup = profilePopup.getForm().querySelector("#input__name");
const aboutInputProfilePopup = profilePopup.getForm().querySelector("#input__about");

const picturePopup = new PopupWithImage("#popup__picture")
picturePopup.setEventListeners()

const cardDeletePopup = new PopupWithForm("#popup-delete")
cardDeletePopup.setEventListeners()

const userInfo = new UserInfo({
  nameSelector: ".user__profile-name",
  aboutSelector: ".user__profile-about",
  avatarSelector: ".user__picture"
})

const cardsSection = new Section(
  {
    renderer: function (data) {
      const userId = userInfo.getUserInfo().id
      cardsSection.addItem(createCard(
        data._id,
        data.name,
        data.link,
        data.likes,
        data.owner._id === userId,
        data.likes.find(item => item._id === userId),
      ))
    }
  },
  '.gallery__items'
)

// вызов открытия попапов

buttonEditAvatar.addEventListener("click", () => {
  avatarEditPopup.open()
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
  cardDeletePopup.setSubmitCallback((_, popup) => {
    handleSubmitFormDeleteCard(card, cardId, popup)
  })
  cardDeletePopup.open()
}

function onLikeClick(card, cardId, like) {
  if (like) {
    api.setLike(cardId)
      .then(res => {
        card.setLike(res.likes, true)
      })
      .catch(console.log)

  } else {
    api.deleteLike(cardId)
      .then(res => {
        card.setLike(res.likes, false)
      })
      .catch(console.log)
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

Promise
  .all([
    api.getProfile(),
    api.getInitialCards(),
  ])
  .then((values) => {
    const res = values[0]
    const cardList = values[1]
    userInfo.setUserInfo(res._id, res.name, res.about, res.avatar)
    cardsSection.renderer(cardList)
  })
  .catch(console.log)

function handleSubmitFormProfile(data, popup) {
  api.editProfile(data["input__name"], data["input__about"])
    .then(res => {
      userInfo.setUserInfo(res._id, res.name, res.about, res.avatar)
    })
    .then(res => {
      popup.close()
    })
    .catch(console.log)
}

function handleSubmitFormAvatar(data, popup) {
  api.editAvatar(data['input__href_avatar'])
    .then(res => {
      userInfo.setUserInfo(res._id, res.name, res.about, res.avatar)
    })
    .then(res => {
      popup.close()
    })
    .catch(console.log)
}

function addCard(data, popup) {
  api.addCard(data["input__place"], data["input__href"])
    .then(res => {
      const cardItem = createCard(res._id, res.name, res.link, res.likes, true);
      cardsSection.addItem(cardItem)
    })
    .then(res => {
      popup.close()
    })
    .catch(console.log)

}

function handleSubmitFormDeleteCard(card, cardId, popup) {
  api.deleteCard(cardId)
    .then(res => {
      card.deleteElement()
    })
    .then(res => {
      popup.close()
    })
    .catch(console.log)
}
