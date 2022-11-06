export default class Popup {
    constructor(popupSelector, popupOpenClass, popupCloseBtnClass) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupOpenClass = popupOpenClass;
        this._popupCloseBtnClass = popupCloseBtnClass;
        this._closeByEsc = this._closeByEsc.bind(this);
    }

    _closeByEsc(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    open() {
        this._popupElement.classList.add(this._popupOpenClass);
        document.addEventListener('keydown', this._closeByEsc);
    }

    close() {
        this._popupElement.classList.remove(this._popupOpenClass);
        document.removeEventListener('keydown', this._closeByEsc);
    }

    setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains(this._popupOpenClass) || evt.target.classList.contains(this._popupCloseBtnClass)) {
                this.close();
            }
        });
    }
}