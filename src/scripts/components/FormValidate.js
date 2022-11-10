export class FormValidator {
    constructor(formData, formElement) {
        this._inputSelector = formData.inputSelector;
        this._submitButtonSelector = formData.submitButtonSelector;
        this._inputErrorClass = formData.inputErrorClass;
        this._errorClass = formData.errorClass;
        this._formElement = formElement;
    }

    enableValidation() {
        this._setEventListeners();
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(
            `.${inputElement.id}-error`
        );
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(
            `.${inputElement.id}-error`
        );
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _isValid(inputElement) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
        }
    }

    _setEventListeners() {
        const inputList = Array.from(
            this._formElement.querySelectorAll(this._inputSelector)
        );
        const buttonElement = this._formElement.querySelector(
            this._submitButtonSelector
        );
        this._formElement.addEventListener("reset", () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, buttonElement);
            }, 0);
        });
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
            inputElement.addEventListener("input", () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }
}