import Card from './Card.js';
const btnProfile = document.querySelector("#button__profile");
const profilePopup  = document.querySelector("#edit-profile");
const cardPopup = document.querySelector("#edit-popup");
const btnCloseProfile = document.querySelector("#clouse-button");
const profileForm = document.querySelector("#profile");
const nameInputProfileForm = profileForm.querySelector("#input__name");
const aboutInputProfileForm = profileForm.querySelector("#input__about");
const popups = document.querySelectorAll('.popup');

// Сюда вставляем данные редактирование профиля
const profileName = document.querySelector(".user__profile-name");
const profileAbout = document.querySelector(".user__profile-about");


// кнопка открытия попапа для добавление карточке
const openCardAddButton = document.querySelector("#btnAdd");
// крестик редактирования профиля
const closePupupEditProfileButton = document.querySelector("#clouse-button__edit");

//инпуты добавления

const addCardForm = document.querySelector("#add__card");
const titleInput = addCardForm.querySelector("#input__place");
const hrefInput = addCardForm.querySelector("#input__href");

const popupPicture = document.querySelector("#popup__picture");
const btnCloseImage = document.querySelector("#clouse__button");


// кнопки форм
const createButton = addCardForm.querySelector('[type="submit"]')
// класс выключения кнопки
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
  const card = new Card(
    item.name,
    item.link,
    'template__item',
    openPreviewPopup
  )
  const cardItem = card._generateCard();
  galleryList.append(cardItem)
})


function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape)
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape)
}

// вызов открытия попапов

btnProfile.addEventListener("click", () => {
  nameInputProfileForm.value = profileName.textContent;
  aboutInputProfileForm.value = profileAbout.textContent;
  openPopup(profilePopup );
});
openCardAddButton.addEventListener("click", () => {
  openPopup(cardPopup);
});


// вызовы закрытия попапов
closePupupEditProfileButton.addEventListener("click", () => {
  closePopup(cardPopup);
});
btnCloseProfile.addEventListener("click", () => {
  closePopup(profilePopup );
});
btnCloseImage.addEventListener("click", () => {
  closePopup(popupPicture);
});

// закрытие Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup !== null) {
      closePopup(openedPopup);
    }
  }
}

// закрытие кликом по фону

popups.forEach((item) => {
  item.addEventListener('mousedown', clickClosePopup)
})

function clickClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

const disabledButtons = (button, disabledClass) => {
  button.disabled = true;
  button.classList.add(disabledClass);
}
disabledButtons(createButton, disabledClass);

function openPreviewPopup(name, link) {
  popupPicture.querySelector(".popup__text_picture").textContent = name;
  popupPicture.querySelector(".popup__picture-caption").alt = name;
  popupPicture.querySelector(".popup__picture-caption").src = link;
  openPopup(popupPicture)
}

function handleSubmitFormProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInputProfileForm.value;
  profileAbout.textContent = aboutInputProfileForm.value;
  closePopup(profilePopup );
}

profileForm.addEventListener("submit", handleSubmitFormProfile);

function addCard(evt) {
  evt.preventDefault();
  const card = new Card(
    titleInput.value,
    hrefInput.value,
    'template__item',
    openPreviewPopup
  )

  const cardItem = card._generateCard();


  galleryList.prepend(cardItem)

  titleInput.value = '';
  hrefInput.value = '';

  disabledButtons(createButton, disabledClass);

  closePopup(cardPopup);
}
addCardForm.addEventListener("submit", addCard);

console.log(galleryList)
