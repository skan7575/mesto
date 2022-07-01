import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {baseLink, secretToken, btnProfile, profileForm, buttonAddPlace, formAddCard, initialCards} from "../components/virables.js"
import { api } from "../components/Api.js";



const cardPopup = new PopupWithForm("#edit-popup", addCard)
cardPopup.setEventListeners()

const profilePopup = new PopupWithForm("#edit-profile", handleSubmitFormProfile)
profilePopup.setEventListeners()

const nameInputProfilePopup =  profilePopup.getForm().querySelector("#input__name");
const aboutInputProfilePopup = profilePopup.getForm().querySelector("#input__about");

const picturePopup = new PopupWithImage("#popup__picture")
picturePopup.setEventListeners()

const userInfo = new UserInfo({nameSelector: ".user__profile-name", aboutSelector: ".user__profile-about"})

const cardsSection = new Section(
  { items: [], renderer: function (item) {
      cardsSection.addItem(createCard(item.name, item.link))
    }},
  '.gallery__items'
)

cardsSection.renderer()

// вызов открытия попапов

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

function handleSubmitFormProfile(data) {
  api.editProfile(data["input__name"], data["input__about"])
    .then(res => {
      userInfo.setUserInfo(data["input__name"], data["input__about"]);
    })
}


function createCard(name, link, likes) {
  return new Card(
    name,
    link,
    likes,
    '#template__item',
    openPreviewPopup
  )
    .generateCard()

}

function addCard(data) {
  api.addCard(data["input__place"], data["input__href"])
    .then(res => {
      const cardItem = createCard(data["input__place"], data["input__href"], data.likes);
      cardsSection.addItem(cardItem)
    })
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

const addCardFormValidator = new FormValidator(
  validatorParam,
  formAddCard
)

buttonAddPlace.addEventListener("click", () => {
  cardPopup.open()
  addCardFormValidator.disabledButton();
});


addCardFormValidator.enableValidation()


api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
  })
api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const cardItem = createCard(data.name, data.link, data.likes);
      cardsSection.addItem(cardItem)
    })
  })
