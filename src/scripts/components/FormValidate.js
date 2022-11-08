export class FormValidator {
    constructor({inputSelector, submitButtonSelector, inputErrorClass, errorClass,}, formElement) {
        this._formElement = formElement;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
    }

    enableValidation() {
        this._setEventListeners();
    };

    _setEventListeners() {
        Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, buttonElement);
            }, 0);
        });

        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
        }
    };

    _hasInvalidInput(inputList) {

        return inputList.some((inputElement) => {
            console.log(inputElement.validity.valid)
            return !inputElement.validity.valid;

        })
    };

    _isValid(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(
                inputElement,
                inputElement.validationMessage,
            );
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hideInputError(inputElement,) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };

    _showInputError(inputElement, errorMessage,) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
}






