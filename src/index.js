import "./pages/index.css";
import {
  getInitialCards,
  getUser,
  editUser,
  setCard,
  editAvatar,
} from "./scripts/components/api.js";
import { addUser } from "./scripts/components/utils.js";
import { enableValidation } from "./scripts/components/validate.js";
import {
  openPopup,
  closePopup,
  closeByEsc,
} from "./scripts/components/modal.js";
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
  formProfile.querySelector(".popup__save-btn").textContent = "Сохранение...";
  evt.preventDefault();
  editUser({
    name: popupFullnameInp.value,
    about: popupOccupationInp.value,
  })
    .then((user) => {
      addUser(user);
      closePopup(popupProfile);
    })
    .finally((user) => {
      formProfile.querySelector(".popup__save-btn").textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
});
profileButtonPlus.addEventListener("click", () => {
  formNewPlace.reset();
  openPopup(popupNewPlace);
});
formNewPlace.addEventListener("submit", (evt) => {
  formNewPlace.querySelector(".popup__save-btn").textContent = "Сохранение...";
  evt.preventDefault();
  const card = {
    name: popupNewPlaceNameInp.value,
    link: popupNewPlaceLinkInp.value,
  };
  setCard(card)
    .then((card) => {
      addNewCard(card, card.owner._id);
      closePopup(popupNewPlace);
    })
    .finally((card) => {
      formNewPlace.querySelector(".popup__save-btn").textContent = "Создать";
    })
    .catch((err) => {
      console.log(err);
    });
});
profileEditAvatar.addEventListener("click", () => {
  formAvatar.reset();
  openPopup(popupAvatar);
});
formAvatar.addEventListener("submit", (evt) => {
  formAvatar.querySelector(".popup__save-btn").textContent = "Сохранение...";
  evt.preventDefault();
  editAvatar(popupInpFieldAvatar.value)
    .then((user) => {
      addUser(user);
      formAvatar.querySelector(".popup__save-btn").textContent = "Обновить";
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    });
});
popups.forEach(function (popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) closePopup(popup);
  });
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup.querySelector(".popup__close-btn"))
      closePopup(popup);
  });
});
//-----------------------------------------------------------------//

Promise.all([getUser(), getInitialCards()])
  .then(([user, cards]) => {
    addUser(user);
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
