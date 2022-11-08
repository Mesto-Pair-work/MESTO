import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupselector) {
        super(popupselector);
    }

    open(link, title) {
        super.open(this._popup);
        this._popup.querySelector(".popup__big-img").src = link;
        this._popup.querySelector(".popup__title_type_big-photo").textContent =
            title;
    }
}
