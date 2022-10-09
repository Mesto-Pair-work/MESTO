export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  if (popup.querySelector(".popup__form")) {
    popup.querySelector(".popup__form").reset();
    popup.classList.remove();
  }
}
