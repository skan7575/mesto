let btnProfile = document.querySelector('#button__profile');
let popupOpened = document.querySelector('.popup');
let btnClose = document.querySelector('#clouse-button')
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('#input__name');
let jobInput = formElement.querySelector('#input__about');
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.user__profile-name');
let profileAbout = document.querySelector('.user__profile-about');

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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


// JS для сердечка будет тут

