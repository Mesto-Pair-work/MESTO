export default class Popup {

    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeBtn = this._popup.querySelector(".popup__close-btn");
        this._closeByEsc = this._closeByEsc.bind(this);
    }

    open () {
        this._popup.classList.add("popup_opened");
        document.addEventListener('keydown', this._closeByEsc);
    }

    close () {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._closeByEsc);
    }

    _closeByEsc (evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners () {
        this._closeBtn.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                this.close();
            }
        });
    }
}