import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, popupOpenClass, popupCloseBtnClass, handleSubmit, formSelector, inputSelector, saveBtnSelector,) {
        super(popupSelector, popupOpenClass, popupCloseBtnClass);

        this._handleSubmit = handleSubmit;
        this._formElement = this._popupElement.querySelector(formSelector);
        this._inputElements = this._formElement.querySelectorAll(inputSelector)
        this._saveBtnElement = this._formElement.querySelector(saveBtnSelector);
    }

    renderDownload(isDownloading) {
        if (isDownloading) {
            this._saveBtnElement.textContent = "Сохранение...";
        } else {
            this._saveBtnElement.textContent = "Сохранить";
        }
    }

    _getInputValues() {
        const values = {};
        this._inputElements.forEach((input) => {
            values[input.name] = input.value;
        });

        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }

    close() {
        this._formElement.reset();
        super.close();
    }

}