const validateInput = (input, isValid, selectorPrefix) => {
  const errorElement = input.parentNode.querySelector(`#${input.id}-${selectorPrefix}`);

  /* Вывовод сообщение об ошибке  */
  errorElement.textContent = input.validationMessage;
  input.classList.add('form__input_type_error');
  if (isValid) {
    input.classList.remove('form__input_type_error');
  } else {
    input.classList.add('form__input_type_error');
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

const isButtonState = (button, isValid, inActiveButtonClass) => {
  if (isValid) {
    enableButton(button, inActiveButtonClass);
  } else {
    disabledButton(button, inActiveButtonClass);
  }
}

const handleInput = (evt, inactiveButtonClass, submitButtonSelector, selectorPrefix) => {
  const currentForm = evt.currentTarget;
  const input = evt.target;
  const submitButton = currentForm.querySelector(submitButtonSelector);
  const isValid = currentForm.checkValidity();
  validateInput(input, isValid, selectorPrefix);

  isButtonState(submitButton, isValid, inactiveButtonClass);
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
      form.addEventListener('sumbit', handleSubmit);
      form.addEventListener('input', (evt) => {
        handleInput(evt, param.inactiveButtonClass, param.submitButtonSelector, 'error')
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
