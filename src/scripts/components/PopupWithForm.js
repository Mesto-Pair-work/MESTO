import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupselector, handleSubmitForm) {
        super(popupselector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector(".popup__form");
        this._saveBtnElement = this._formElement.querySelector('.popup__save-btn');
        this._defaultBtnText = this._saveBtnElement.textContent;
    }

    _getInputValues() {
        const inputValues = {};
        this._popup.querySelectorAll(".popup__inp ").forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(evt, this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
    renderDownload(isDownloading) {
        if (isDownloading) {
            this._saveBtnElement.textContent = "Сохранение...";
        } else {
            this._saveBtnElement.textContent = this._defaultBtnText;
        }
    }

}
