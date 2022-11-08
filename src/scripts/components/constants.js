//----------------------Elements --------------------------------------------------------------//
export const popups = document.querySelectorAll(".popup");
export const profileEditBtn = document.querySelector(".profile__edit-btn");
export const profileEditAvatar = document.querySelector(".profile__edit-avatar");
export const profileButtonPlus = document.querySelector(".profile__button-plus");
export const popupProfile = document.querySelector(".popup_type_profile");
export const popupNewPlace = document.querySelector(".popup_type_new-place");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const formAvatar = popupAvatar.querySelector(".popup__form");
export const formProfile = popupProfile.querySelector(".popup__form");
export const formNewPlace = popupNewPlace.querySelector(".popup__form");
export const popupFullnameInp = popupProfile.querySelector(
    ".popup__inp_field_fullname"
);
export const popupOccupationInp = popupProfile.querySelector(
    ".popup__inp_field_occupation"
);
export const popupNewPlaceLinkInp = popupNewPlace.querySelector(
    ".popup__inp_field_newplacelink"
);
export const popupNewPlaceNameInp = popupNewPlace.querySelector(
    ".popup__inp_field_newplacename"
);
export const popupInpFieldAvatar = popupAvatar.querySelector(
    ".popup__inp_field_avatar"
);
export const profileFullNname = document.querySelector(".profile__full-name");
export const profileOccupation = document.querySelector(".profile__occupation");

export const placesItem = document.querySelector(".places__items");


export const popupBigPhoto = document.querySelector(".popup_type_big-photo");
export const popupBigPhotoImg = popupBigPhoto.querySelector(".popup__big-img");
export const popupBigPhotoTitle = popupBigPhoto.querySelector(
    ".popup__title_type_big-photo"
);

export const settings = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
    headers: {
        authorization: 'd3efd322-579e-46e2-8334-d27c812c6b90',
        'Content-Type': 'application/json'
    }
};

export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__inp",
    submitButtonSelector: ".popup__save-btn",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__inp-error_active",
};