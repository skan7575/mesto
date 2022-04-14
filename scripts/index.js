//Создание переменных для редактирования профиля
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
const imagePopupBigSize = popupPicture.querySelector(".popup__picture-caption");
const popupText = popupPicture.querySelector(".popup__text_picture");
const btnCloseImage = document.querySelector("#clouse__button");

const gallery = document.querySelector(".gallery__items");
const templateCard = document.querySelector("#template__item");

// кнопки форм
const createButton = addCardForm.querySelector('[type="submit"]')
// класс выключения кнопки
const disabledClass = 'popup__button-save_disabled';

// Галерея

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

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
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

function createCard(title, link) {
  const card = templateCard.content.querySelector(".card-item").cloneNode(true);
  const cardTitle = card.querySelector("h2");
  const cardImagePreview = card.querySelector(".gallery__pic");
  cardTitle.textContent = title;
  cardImagePreview.src = link;
  cardImagePreview.alt = title;

  const btnLike = card.querySelector(".gallery__like-button");
  btnLike.addEventListener("click", () => {
    btnLike.classList.toggle("gallery__like-button_active");
  });

  const btnRemove = card.querySelector(".gallery__button-remove");
  btnRemove.addEventListener("click", () => {
    card.remove();
  });

  cardImagePreview.addEventListener("click", () => {
    popupText.textContent = title;
    imagePopupBigSize.src = link;
    imagePopupBigSize.alt = title;
    openPopup(popupPicture);
  });

  return card;
}

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  gallery.append(card);
});

const disabledButtons = (button, disabledClass) => {
  button.disabled = true;
  button.classList.add(disabledClass);
}
disabledButtons(createButton, disabledClass);

function addCard(evt) {
  evt.preventDefault();

  const card = createCard(titleInput.value, hrefInput.value);

  gallery.prepend(card);
  titleInput.value = '';
  hrefInput.value = '';

  disabledButtons(createButton, disabledClass);

  closePopup(cardPopup);
}

addCardForm.addEventListener("submit", addCard);
