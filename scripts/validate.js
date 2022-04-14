const validateInput = (input, isValid,inputErrorClass) => {

  const errorElement = input.parentNode.querySelector('span')
  /* Вывовод сообщение об ошибке  */
  errorElement.textContent = input.validationMessage;
  if (isValid) {
    input.classList.remove(inputErrorClass);
  } else {
    input.classList.add(inputErrorClass);
  }
}


const enableButton = (button, inActiveButtonClass) => {
  button.disabled = false;
  button.classList.remove(inActiveButtonClass);
}
const disabledButton = (button, inActiveButtonClass) => {
  button.disabled = true;
  button.classList.add(inActiveButtonClass);
}

const setButtonState = (button, isValid, inActiveButtonClass) => {
  if (isValid) {
    enableButton(button, inActiveButtonClass);
  } else {
    disabledButton(button, inActiveButtonClass);
  }
}

const handleInput = (evt, inactiveButtonClass, submitButtonSelector, inputErrorClass) => {
  const currentForm = evt.currentTarget;
  const input = evt.target;
  const submitButton = currentForm.querySelector(submitButtonSelector);

  validateInput(input, input.checkValidity(), inputErrorClass);

  setButtonState(submitButton, currentForm.checkValidity(), inactiveButtonClass);
}

const handleSubmit = (evt) => {
  evt.preventDefault();

  const correntForm = evt.target;

  if (correntForm.checkValidity()) {
    correntForm.reset();
  }
}

function enableValidation(param) {
  document
    .querySelectorAll(param.formSelector)
    .forEach((form) => {
      form.addEventListener('submit', handleSubmit);
      form.addEventListener('input', (evt) => {
        handleInput(evt, param.inactiveButtonClass, param.submitButtonSelector, param.inputErrorClass)
      });
    })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'error'
});
