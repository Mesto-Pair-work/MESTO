import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupselector, submittingForm) {
        super(popupselector);
        this._submittingForm = submittingForm;
        this._form = this._popup.querySelector(".popup__form");
        this._submitBtn = this._form.querySelector(".popup__save-btn");
        this._submitBtnText = this._submitBtn.textContent;
        this._inputList = this._popup.querySelectorAll(".popup__inp ");
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    _renderLoading(isLoading, loadingText = "Сохранение...") {
        if (isLoading) {
            this._submitBtn.textContent = loadingText;
        } else {
            this._submitBtn.textContent = this._submitBtnText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._renderLoading(true);
            this._submittingForm(this._getInputValues())
                .then(() => {
                    this.close();
                })
                .finally(() => {
                    this._renderLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
