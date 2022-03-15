let btn__profile = document.querySelector('#button__profile');
let popup_opened = document.querySelector('.popup');
let btn__close = document.querySelector('#clouse-button')

// Созданы переменные и функции для добавление и удаление псевдокласса класса popup_opened
btn__profile.addEventListener('click', open);
function open() {
  popup_opened.classList.add('popup_opened')
}
btn__close.addEventListener('click', close);
function close() {
  popup_opened.classList.remove('popup_opened')
}

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#input__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('#input__about');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    nameInput.value;
    jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profile_name = document.querySelector('.user__profile-name');
    let profile_about = document.querySelector('.user__profile-about');
    console.log(profile_about.textContent);
    // Вставьте новые значения с помощью textContent
    profile_name.textContent = nameInput.value;
    profile_about.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


// JS для сердечка будет тут

