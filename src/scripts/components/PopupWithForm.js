import Popup from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, {submittingForm}) {
        super(popupSelector);

        this._submittingForm = submittingForm;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputElements = this._formElement.querySelectorAll('.popup__inp')
        this._saveBtnElement = this._formElement.querySelector('.popup__save-btn');
        this._defaultBtnText = this._saveBtnElement.textContent;
    }

    renderDownload(isDownloading) {
        if (isDownloading) {
            this._saveBtnElement.textContent = "Сохранение...";
        } else {
            this._saveBtnElement.textContent = this._defaultBtnText;
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
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submittingForm(this._getInputValues());
        });
    }

    close() {
        this._formElement.reset();
        super.close();
    }

}