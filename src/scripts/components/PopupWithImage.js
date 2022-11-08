import Popup from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._bigPhoto = this._popup.querySelector('.popup__big-img');
        this._titlePhoto = this._popup.querySelector('.popup__title_type_big-photo');
    }

    open(data) {
        this._bigPhoto.alt = data.name;
        this._bigPhoto.src = data.link;
        this._titlePhoto.textContent = data.name;
        super.open();
    }
}