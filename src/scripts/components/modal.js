
export function closeByEsc(evt, openedPopup) {
  if (evt.key === "Escape") {
    closePopup(openedPopup); 
  }
} 

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', (evt) => {
    closeByEsc(evt, popup);
  });
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.addEventListener('keydown', (evt) => {
    closeByEsc(evt, popup);
  });
}

