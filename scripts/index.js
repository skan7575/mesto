//Создание переменных для редактирования профиля
const btnProfile = document.querySelector("#button__profile");
const popupOpened = document.querySelector("#edit-profile");
const popupOpenedAdd = document.querySelector("#edit-popup");
const btnCloseProfile = document.querySelector("#clouse-button");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector("#input__name");
const aboutInput = formElement.querySelector("#input__about");

// Сюда вставляем данные редактирование профиля
const profileName = document.querySelector(".user__profile-name");
const profileAbout = document.querySelector(".user__profile-about");

//Попап добавления

const popupOpenedEdit = document.querySelector("#edit-popup");
const btnAdd = document.querySelector("#btnAdd");
const btnCloseAdd = document.querySelector("#clouse-button__edit");

//инпуты добавления
const cardFormAdd = document.querySelector("#add__card");
const titleInput = cardFormAdd.querySelector("#input__place");
const hrefInput = cardFormAdd.querySelector("#input__href");

const popupPicture = document.querySelector("#popup__picture");
const imagePopup = popupPicture.querySelector("img");
const popupText = popupPicture.querySelector(".popup__text_picture");
const btnCloseImage = document.querySelector("#clouse__button");

const gallery = document.querySelector(".gallery__items");
const templateCard = document.querySelector("#template__item");

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
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popupElement.classList.add("popup_opened");
}
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}
// вызов открытия попапов

btnProfile.addEventListener("click", () => {
  openPopup(popupOpened);
});
btnAdd.addEventListener("click", () => {
  openPopup(popupOpenedEdit);
});

// вызовы закрытия попапов

btnCloseAdd.addEventListener("click", () => {
  closePopup(popupOpenedEdit);
});
btnCloseProfile.addEventListener("click", () => {
  closePopup(popupOpened);
});
btnCloseImage.addEventListener("click", () => {
  closePopup(popupPicture);
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleSubmitFormProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupOpened);
}
formElement.addEventListener("submit", handleSubmitFormProfile);

function createCard(title, link) {
  const card = templateCard.content.querySelector(".card-item").cloneNode(true);
  const cardTitle = card.querySelector("h2");
  const cardImage = card.querySelector("img");
  cardTitle.textContent = title;
  cardImage.src = link;
  cardImage.alt = title;

  const btnLike = card.querySelector(".gallery__like-button");
  btnLike.addEventListener("click", () => {
    btnLike.classList.toggle("gallery__like-button_active");
  });

  const btnRemove = card.querySelector(".gallery__button-remove");
  btnRemove.addEventListener("click", () => {
    card.remove();
  });

  const image = card.querySelector(".gallery__pic");
  image.addEventListener("click", () => {
    popupText.textContent = title;
    imagePopup.src = link;
    imagePopup.alt = title;
    openPopup(popupPicture);
  });

  return card;
}

initialCards.forEach((item) => {
  const card = createCard(item.name, item.link);
  gallery.append(card);
});

function addCard(evt) {
  evt.preventDefault();

  const card = createCard(titleInput.value, hrefInput.value);

  gallery.prepend(card);

  closePopup(popupOpenedAdd);
}

cardFormAdd.addEventListener("submit", addCard);
