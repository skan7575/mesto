import './pages/index.css';
import Card from './scripts/Card.js';
import FormValidator from "./scripts/FormValidator.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";

const btnProfile = document.querySelector("#button__profile");
const profileForm = document.querySelector("#profile");

const cardPopup = new PopupWithForm("#edit-popup", addCard)
cardPopup.setEventListeners()

const profilePopup = new PopupWithForm("#edit-profile", handleSubmitFormProfile)
profilePopup.setEventListeners()

const picturePopup = new PopupWithImage("#popup__picture")
picturePopup.setEventListeners()


const userInfo = new UserInfo({nameSelector: ".user__profile-name", aboutSelector: ".user__profile-about"})

const openCardAddButton = document.querySelector("#btnAdd");

const addCardForm = document.querySelector("#add__card");

const createButton = addCardForm.querySelector('[type="submit"]')

const disabledClass = 'popup__button-save_disabled';
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

const galleryList = document.querySelector('.gallery__items')

initialCards.forEach((item) => {
  const cardItem = createCard(item.name, item.link)._generateCard();
  galleryList.append(cardItem)
})

// вызов открытия попапов

btnProfile.addEventListener("click", () => {
  const user = userInfo.getUserInfo()
  profilePopup.getForm().querySelector("#input__name").value = user.name
  profilePopup.getForm().querySelector("#input__about").value = user.about

  profilePopup.open()
});

openCardAddButton.addEventListener("click", () => {
  cardPopup.open()
});

function openPreviewPopup(name, link) {
  picturePopup.setData(link, name)
  picturePopup.open()
}

function handleSubmitFormProfile(data) {
  userInfo.setUserInfo(data["input__name"], data["input__about"]);
}

profileForm.addEventListener("submit", handleSubmitFormProfile);

function createCard(name, link) {
  return new Card(
    name,
    link,
    'template__item',
    openPreviewPopup
  )
}

function addCard(data) {
  const cardItem = createCard(data["input__place"], data["input__href"])._generateCard();

  galleryList.prepend(cardItem)

  addCardFormValidator.disabledButton(createButton, disabledClass);
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
  addCardForm
)

addCardFormValidator.disabledButton(createButton, disabledClass);
addCardFormValidator.enableValidation()
