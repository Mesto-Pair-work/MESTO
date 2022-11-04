import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(data) {
        const imageElement = document.querySelector(".popup__big-img");
        const imageTitle = document.querySelector(".popup__title_type_big-photo");
        console.log(imageElement)
        imageElement.alt = data.name;
        imageElement.src = data.link;
        imageTitle.textContent = data.name;
        super.open();
    }
}