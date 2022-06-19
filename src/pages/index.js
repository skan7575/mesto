import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section";

const btnProfile = document.querySelector("#button__profile");
const profileForm = document.querySelector("#profile");

const cardPopup = new PopupWithForm("#edit-popup", addCard)
cardPopup.setEventListeners()

const profilePopup = new PopupWithForm("#edit-profile", handleSubmitFormProfile)
profilePopup.setEventListeners()

const nameInputProfilePopup =  profilePopup.getForm().querySelector("#input__name");
const aboutInputProfilePopup = profilePopup.getForm().querySelector("#input__about");

const picturePopup = new PopupWithImage("#popup__picture")
picturePopup.setEventListeners()



const userInfo = new UserInfo({nameSelector: ".user__profile-name", aboutSelector: ".user__profile-about"})

const buttonAddPlace = document.querySelector("#btnAdd");

const formAddCard = document.querySelector("#add__card");

const buttonCreateCard = formAddCard.querySelector('[type="submit"]')

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// const galleryList = document.querySelector('.gallery__items')

// initialCards.forEach((item) => {
//   const cardItem = createCard(item.name, item.link)._generateCard();
//   galleryList.append(cardItem)
// })

const cardsSection = new Section(
  { items: initialCards, renderer: item => createCard(item.name, item.link)},
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

buttonAddPlace.addEventListener("click", () => {
  cardPopup.open()
});

function openPreviewPopup(name, link) {
  picturePopup.setData(link, name)
  picturePopup.open()
}

function handleSubmitFormProfile(data) {
  userInfo.setUserInfo(data["input__name"], data["input__about"]);
}


function createCard(name, link) {
  return new Card(
    name,
    link,
    '#template__item',
    openPreviewPopup
  )
    .generateCard()
}

function addCard(data) {
  const cardItem = createCard(data["input__place"], data["input__href"]);
  cardsSection.addItem(cardItem)

  addCardFormValidator.disabledButton(buttonCreateCard);
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

addCardFormValidator.disabledButton(buttonCreateCard);
addCardFormValidator.enableValidation()
