import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupselector, submittingForm) {
        super(popupselector);
        this._submittingForm = submittingForm;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._popup.querySelectorAll(".popup__inp ");
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submittingForm(evt, this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

}
