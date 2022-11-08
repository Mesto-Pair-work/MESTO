export default class Popup {
    constructor(popupelector) {
        this._popup = document.querySelector(popupselector);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            const openedPopup = document.querySelector(".popup_opened");
            openedPopup.classList.remove("popup_opened");
        }
    }

    setEventListeners() {
        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target === this._popup) this.close();
        });
        const crossButton = this._popup.querySelector(".popup__close-btn");
        crossButton.addEventListener("click", () => {
            this.close();
        });
    }

}
