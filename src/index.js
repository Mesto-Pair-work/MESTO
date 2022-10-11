import "./pages/index.css";
import {
  getInitialCards,
  getUser,
  editUser,
  setCard,
  editAvatar,
} from "./scripts/components/api.js";
import { setUserInfo } from "./scripts/components/utils.js";
import { enableValidation } from "./scripts/components/validate.js";
import { openPopup, closePopup } from "./scripts/components/modal.js";
import { addNewCard } from "./scripts/components/cards.js";

//----------------------Elements --------------------------------------------------------------//
const popups = document.querySelectorAll(".popup");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEditAvatar = document.querySelector(".profile__edit-avatar");
const profileButtonPlus = document.querySelector(".profile__button-plus");
const popupProfile = document.querySelector(".popup_type_profile");
const popupNewPlace = document.querySelector(".popup_type_new-place");
const popupAvatar = document.querySelector(".popup_type_avatar");
const formAvatar = popupAvatar.querySelector(".popup__form");
const formProfile = popupProfile.querySelector(".popup__form");
const formNewPlace = popupNewPlace.querySelector(".popup__form");
const popupFullnameInp = popupProfile.querySelector(
  ".popup__inp_field_fullname"
);
const popupOccupationInp = popupProfile.querySelector(
  ".popup__inp_field_occupation"
);
const popupNewPlaceLinkInp = popupNewPlace.querySelector(
  ".popup__inp_field_newplacelink"
);
const popupNewPlaceNameInp = popupNewPlace.querySelector(
  ".popup__inp_field_newplacename"
);
const popupInpFieldAvatar = popupAvatar.querySelector(
  ".popup__inp_field_avatar"
);
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
  evt.submitter.textContent = "Сохранение...";
  evt.preventDefault();
  editUser({
    name: popupFullnameInp.value,
    about: popupOccupationInp.value,
  })
    .then((user) => {
      setUserInfo(user);
      closePopup(popupProfile);
      evt.target.reset();
    })
    .finally((user) => {
      evt.submitter.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
});
profileButtonPlus.addEventListener("click", () => {
  openPopup(popupNewPlace);
});
formNewPlace.addEventListener("submit", (evt) => {
  evt.submitter.textContent = "Сохранение...";
  evt.preventDefault();
  const card = {
    name: popupNewPlaceNameInp.value,
    link: popupNewPlaceLinkInp.value,
  };
  setCard(card)
    .then((card) => {
      addNewCard(card, card.owner._id);
      closePopup(popupNewPlace);
      evt.target.reset();
    })
    .finally((card) => {
      evt.submitter.textContent = "Создать";
    })
    .catch((err) => {
      console.log(err);
    });
});
profileEditAvatar.addEventListener("click", () => {
  openPopup(popupAvatar);
});
formAvatar.addEventListener("submit", (evt) => {
  evt.submitter.textContent = "Сохранение...";
  evt.preventDefault();
  editAvatar(popupInpFieldAvatar.value)
    .then((user) => {
      setUserInfo(user);
      closePopup(popupAvatar);
      evt.target.reset();
    })
    .finally((card) => {
      evt.submitter.textContent = "Обновить";
    })
    .catch((err) => {
      console.log(err);
    });
});
popups.forEach(function (popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) closePopup(popup);
  });
  const crossButton = popup.querySelector(".popup__close-btn");
  crossButton.addEventListener("click", () => {
    closePopup(popup);
  });
});
//-----------------------------------------------------------------//

Promise.all([getUser(), getInitialCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    cards.forEach((card) => {
      addNewCard(card, user._id);
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__inp",
  submitButtonSelector: ".popup__save-btn",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__inp-error_active",
});
