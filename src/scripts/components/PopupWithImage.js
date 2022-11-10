import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupselector) {
        super(popupselector);
        this._popupBigImg = this._popup.querySelector(".popup__big-img");
        this._popupTitle = this._popup.querySelector(".popup__title_type_big-photo")
    }

    open(link, title) {
        super.open();
        this._popupBigImg.src = link;
        this._popupBigImg.alt = title;
        this._popupTitle.textContent = title;
    }
}
