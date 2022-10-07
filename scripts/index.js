import { Validate } from "./components/validate.js";
import { openPopup, closePopup } from "./components/modal.js";
import { initialCards, addNewCard } from "./components/cards.js";

//----------------------Elements --------------------------------------------------------------//
const popups = document.querySelectorAll(".popup");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileButtonPlus = document.querySelector(".profile__button-plus");
const popupProfile = document.querySelector(".popup_type_profile");
const popupNewPlace = document.querySelector(".popup_type_new-place");
const formProfile = popupProfile.querySelector(".popup__form");
const formNewPlace = popupNewPlace.querySelector(".popup__form");
const popupFullnameInp = popupProfile.querySelector(".popup__inp_field_fullname");
const popupOccupationInp = popupProfile.querySelector(".popup__inp_field_occupation");
const popupNewPlaceLinkInp = popupNewPlace.querySelector(".popup__inp_field_newplacelink");
const popupNewPlaceNameInp = popupNewPlace.querySelector(".popup__inp_field_newplacename");
const profileFullNname = document.querySelector(".profile__full-name");
const profileOccupation = document.querySelector(".profile__occupation");
//---------- --------------------------------------------------------------------------------------//

//------------------------Events ---------------------------------//
profileEditBtn.addEventListener("click", () => {
  openPopup(popupProfile);
  popupFullnameInp.value = profileFullNname.textContent;
  popupOccupationInp.value = profileOccupation.textContent;
});
formProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileFullNname.textContent = popupFullnameInp.value;
  profileOccupation.textContent = popupOccupationInp.value;
  closePopup(popupProfile);
});
profileButtonPlus.addEventListener("click", () => {
  openPopup(popupNewPlace);
});
formNewPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const card = {
    name: popupNewPlaceNameInp.value,
    link: popupNewPlaceLinkInp.value,
  };
  addNewCard(card);
  closePopup(popupNewPlace);
});
popups.forEach(function (popup) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") closePopup(popup);
  });
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) closePopup(popup);
  });
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup.querySelector(".popup__close-btn"))
      closePopup(popup);
  });
});
//-----------------------------------------------------------------//

initialCards.forEach(addNewCard);

Validate.enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__inp",
  submitButtonSelector: ".popup__save-btn",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__inp-error_active",
});
