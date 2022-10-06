const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileButtonPlus = document.querySelector(".profile__button-plus");
const popupProfile = document.querySelector(".popup_type_profile");
const popupNewPlace = document.querySelector(".popup_type_new-place");
const popupBigPhoto = document.querySelector(".popup_type_big-photo");
const popupBigPhotoImg = popupBigPhoto.querySelector(".popup__big-img");
const popupBigPhotoTitle = popupBigPhoto.querySelector(
  ".popup__title_type_big-photo"
);
const formProfile = popupProfile.querySelector(".popup__form");
const formNewPlace = popupNewPlace.querySelector(".popup__form");
const popupCloseBtnProfile = popupProfile.querySelector(".popup__close-btn");
const popupCloseBtnNewPlace = popupNewPlace.querySelector(".popup__close-btn");
const popupCloseBtnBigPhoto = popupBigPhoto.querySelector(".popup__close-btn");
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
const profileFullNname = document.querySelector(".profile__full-name");
const profileOccupation = document.querySelector(".profile__occupation");
const templateCard = document.querySelector("#templateCard").content;
const placesItem = document.querySelector(".places__items");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  if (popup.querySelector(".popup__form")) {
    popup.querySelector(".popup__form").reset();
  }
}

function createNewCard(obj) {
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

function addNewCard(obj) {
  placesItem.prepend(createNewCard(obj));
}

profileEditBtn.addEventListener("click", function () {
  openPopup(popupProfile);
  popupFullnameInp.value = profileFullNname.textContent;
  popupOccupationInp.value = profileOccupation.textContent;
});

popupCloseBtnProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileFullNname.textContent = popupFullnameInp.value;
  profileOccupation.textContent = popupOccupationInp.value;
  closePopup(popupProfile);
});

profileButtonPlus.addEventListener("click", function () {
  openPopup(popupNewPlace);
});

popupCloseBtnNewPlace.addEventListener("click", function () {
  closePopup(popupNewPlace);
});

popupCloseBtnBigPhoto.addEventListener("click", function () {
  closePopup(popupBigPhoto);
});

formNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const card = {
    name: popupNewPlaceNameInp.value,
    link: popupNewPlaceLinkInp.value,
  };
  addNewCard(card);
  closePopup(popupNewPlace);
});

//убираем попап по клику на оверлей и на esc
let popups = document.querySelectorAll(".popup");
popups.forEach(function (popup) {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") closePopup(popup);
  });
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target === this) closePopup(popup);
  });
});

initialCards.forEach(addNewCard);