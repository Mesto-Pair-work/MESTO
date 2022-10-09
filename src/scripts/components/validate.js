export const Validate = (function () {
  const showInputError = (formElement, inputElement, errorMessage, data) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(data.errorClass);
  };
  const hideInputError = (formElement, inputElement, data) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.errorClass);
    errorElement.textContent = "";
  };
  const isValid = (formElement, inputElement, data) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        data
      );
    } else {
      hideInputError(formElement, inputElement, data);
    }
  };
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  };
  const setEventListeners = (formElement, data) => {
    const inputList = Array.from(
      formElement.querySelectorAll(data.inputSelector)
    );
    const buttonElement = formElement.querySelector(data.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement, data);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  return {
    enableValidation: (data) => {
      const formList = Array.from(document.querySelectorAll(data.formSelector));
      formList.forEach((formElement) => {
        setEventListeners(formElement, data);
      });
    },
  };
})();
