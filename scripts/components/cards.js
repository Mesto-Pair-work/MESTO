import { openPopup } from "./modal.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createNewCard(obj) {
  const popupBigPhoto = document.querySelector(".popup_type_big-photo");
  const popupBigPhotoImg = popupBigPhoto.querySelector(".popup__big-img");
  const popupBigPhotoTitle = popupBigPhoto.querySelector(
    ".popup__title_type_big-photo"
  );
  const templateCard = document.querySelector("#templateCard").content;
  const placesBox = templateCard.querySelector(".places-box").cloneNode(true);
  const placesBoxPhoto = placesBox.querySelector(".places-box__photo");
  const placesBoxName = placesBox.querySelector(".places-box__name");
  placesBoxPhoto.src = obj.link;
  placesBoxPhoto.alt = obj.name;
  placesBoxName.textContent = obj.name;

  const boxLike = placesBox.querySelector(".places-box__like");
  boxLike.addEventListener("click", function () {
    this.classList.toggle("places-box__like_active");
  });

  const iconDelCard = placesBox.querySelector(".places-box__del-card");
  iconDelCard.addEventListener("click", function () {
    placesBox.remove();
  });

  placesBoxPhoto.addEventListener("click", function () {
    popupBigPhotoImg.src = obj.link;
    popupBigPhotoImg.alt = obj.name;
    popupBigPhotoTitle.textContent = obj.name;
    openPopup(popupBigPhoto);
  });

  return placesBox;
}

export function addNewCard(obj) {
  const placesItem = document.querySelector(".places__items");
  placesItem.prepend(createNewCard(obj));
}
