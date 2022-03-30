//Создание переменных для редактирования профиля
const btnProfile = document.querySelector('#button__profile');
const popupOpened = document.querySelector('#edit-profile');
const popupOpenedAdd = document.querySelector('#edit-popup');
const btnClose = document.querySelector('#clouse-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#input__name');
const jobInput = formElement.querySelector('#input__about');

// Сюда вставляем данные редактирование профиля
const profileName = document.querySelector('.user__profile-name');
const profileAbout = document.querySelector('.user__profile-about');

//Попап добавления

const popupOpenedEdit = document.querySelector('#edit-popup');
const btnAdd = document.querySelector('#btnAdd');
const btnCloseEdit = document.querySelector('#clouse-button__edit')

//инпуты добавления
const addCardForm = document.getElementsByName('add__card')[0];
const titleInput = addCardForm.querySelector('#input__place');
const hrefInput = addCardForm.querySelector('#input__href');
// Переменные куда будет выводиться информация
const cardTitle = document.querySelector('.gallery__title');
const cardHref = document.querySelector('.gallery__pic');

const popupPicture = document.querySelector('#popup__picture');
const clouse__button = document.querySelector('#clouse__button')

// Галерея

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function OpenPopup(popupid) {
  popupid.classList.add('popup_opened');
}
function ClousePopup(popupid) {
  popupid.classList.remove('popup_opened');
}
// вызовы откртия попапов
btnProfile.addEventListener('click', function(){
  OpenPopup(popupOpened);
});
btnAdd.addEventListener('click', function(){
  OpenPopup(popupOpenedEdit);
})

// вызовы закрытия попапов

btnCloseEdit.addEventListener('click', function(){
  ClousePopup(popupOpenedEdit);
});
btnClose.addEventListener('click', function(){
  ClousePopup(popupOpened);
})





// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handlerSubmitForm (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.


    // Выберите элементы, куда должны быть вставлены значения полей
    console.log(profileAbout.textContent);
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    ClousePopup(popupOpened);

}
formElement.addEventListener('submit', handlerSubmitForm);



function addCard (evt) {
  evt.preventDefault();

  addElementToGallery(titleInput.value, hrefInput.value, false)

  ClousePopup(popupOpenedAdd);
}

addCardForm.addEventListener('submit', addCard);


/**
 * Метод добавления элементав галерею
 * @param {String} title заголовок
 * @param {String} href ссылка на картинку
 * @param {Boolean} last флаг позиции, true - добавление в конец списка
 */
function addElementToGallery(title, href, last) {
  //Получаю мой список в верстке UL
  const gallery = document.querySelector('.gallery__items');
  // Получаю Template
  const card = document
    .querySelector('#template__item')
    .content
    .querySelector('.card-item')
    .cloneNode(true);
  // из темплейта забираю зголовок и картинку, чтобы заменить их свойства
  card.querySelector('.gallery__title').textContent = title;
  card.querySelector('.gallery__pic').src = href;

  const btnLike = card.querySelector('.gallery__like-button');
  btnLike.addEventListener('click', function () {
    btnLike.classList.toggle('gallery__like-button_active');
  });

  const btnRemove = card.querySelector('.gallery__button-remove');
  btnRemove.addEventListener('click', function(){
    card.remove();
  });

  const image = card.querySelector('.gallery__pic');
  const popupPicture = document.querySelector('#popup__picture');
  const imagePopup = popupPicture.querySelector('img');
  const popupText = popupPicture.querySelector('.popup__text_picture');
  image.addEventListener('click', function () {
    popupText.textContent = title;
    imagePopup.src = href;
    imagePopup.alt = title;
    OpenPopup(popupPicture);
  });


  if (last) {
    gallery.append(card);
  } else {
    gallery.prepend(card);
  }
}

initialCards.forEach(function (item) {
  addElementToGallery(item.name, item.link, false);
})

clouse__button.addEventListener('click', closePicture);
function closePicture () {
  popupPicture.classList.remove('popup_opened');
}

