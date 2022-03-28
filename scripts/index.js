//Создание переменных для редактирования профиля
let btnProfile = document.querySelector('#button__profile');
let popupOpened = document.querySelector('#edit-profile');
let popupOpenedAdd = document.querySelector('#edit-popup');
let btnClose = document.querySelector('#clouse-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#input__name');
let jobInput = formElement.querySelector('#input__about');

// Сюда вставляем данные редактирование профиля
let profileName = document.querySelector('.user__profile-name');
let profileAbout = document.querySelector('.user__profile-about');


//Переменные для закрытия

// Созданы переменные и функции для добавление и удаление псевдокласса класса popup_opened
btnProfile.addEventListener('click', open);
function open() {
  popupOpened.classList.add('popup_opened')
  nameInput.value = profileName.textContent;
  jobInput.value  = profileAbout.textContent;
}
btnClose.addEventListener('click', close);
function close() {
  popupOpened.classList.remove('popup_opened')
}
function closeAdd() {
  popupOpenedAdd.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.


    // Выберите элементы, куда должны быть вставлены значения полей
    console.log(profileAbout.textContent);
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    close();
}
formElement.addEventListener('submit', formSubmitHandler);


//инпуты добавления
let addCardForm = document.getElementsByName('add__card')[0];
let titleInput = addCardForm.querySelector('#input__place');
let hrefInput = addCardForm.querySelector('#input__href');
// Переменные куда будет выводиться информация
let cardTitle = document.querySelector('.gallery__title');
let cardHref = document.querySelector('.gallery__pic');

function addCard (evt) {
  evt.preventDefault();

  addElementToGallery(titleInput.value, hrefInput.value, false)

  closeAdd();
}

addCardForm.addEventListener('submit', addCard);



//Попап добавления

let popupOpenedEdit = document.querySelector('#edit-popup');
let btnAdd = document.querySelector('#btnAdd');
let btnCloseEdit = document.querySelector('#clouse-button__edit')


btnAdd.addEventListener('click', openEdit);
function openEdit() {
  popupOpenedEdit.classList.add('popup_opened')
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

btnCloseEdit.addEventListener('click', closeEdit);
function closeEdit() {
  popupOpenedEdit.classList.remove('popup_opened')
}



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
    .querySelector('.gallery__item')
    .cloneNode(true);
  // из темплейта забираю зголовок и картинку, чтобы заменить их свойства
  card.querySelector('.gallery__title').textContent = title;
  card.querySelector('.gallery__pic').src = href;

  let btnLike = card.querySelector('.gallery__like-button');
  btnLike.addEventListener('click', function () {
    btnLike.classList.toggle('gallery__like-button_active');
  });

  let btnRemove = card.querySelector('.gallery__button-remove');
  btnRemove.addEventListener('click', function(){
    card.remove();
  });

  let image = card.querySelector('.gallery__pic');
  let popupPicture = document.querySelector('.popup__picture');
  let imagePopup = popupPicture.querySelector('img');
  let popupText = popupPicture.querySelector('.popup__picture-text');
  image.addEventListener('click', function () {
    popupText.textContent = title;
    imagePopup.src = href;
    imagePopup.alt = title;
    popupPicture.classList.add('popup_opened');
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
let popupPicture = document.querySelector('.popup__picture');
let clouse__button = document.querySelector('#clouse__button')
clouse__button.addEventListener('click', closePicture);
function closePicture () {
  popupPicture.classList.remove('popup_opened');
}

