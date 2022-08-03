// Получаем элемент кнопки ред.профиля
const profileEditBtn = document.querySelector(".profile__edit-btn");

// Получаем элемент кнопки добавление карточки
const profileButtonPlus = document.querySelector(".profile__button-plus");

// Три попап элемента: профиль, биг фото и добавление карточки
const popupProfile = document.querySelector(".popup_type_profile");
const popupNewPlace = document.querySelector(".popup_type_new-place");
const popupBigPhoto = document.querySelector(".popup_type_big-photo");

//Получаем img and title большого папапа с фото
const popupBigPhotoImg = popupBigPhoto.querySelector(".popup__big-img");
const popupBigPhotoTitle = popupBigPhoto.querySelector(".popup__title_type_big-photo");

// Две формы: профиль и добавление карты
const formProfile = popupProfile.querySelector(".popup__form");
const formNewPlace = popupNewPlace.querySelector(".popup__form");

//Три кнопки Close:
const popupCloseBtnProfile = popupProfile.querySelector(".popup__close-btn");
const popupCloseBtnNewPlace = popupNewPlace.querySelector(".popup__close-btn");
const popupCloseBtnBigPhoto = popupBigPhoto.querySelector(".popup__close-btn");

//Поля формы профиля: имя и род занятий
const popupFullnameInp = popupProfile.querySelector(".popup__inp_field_fullname");
const popupOccupationInp = popupProfile.querySelector(".popup__inp_field_occupation");

//Поля формы для добавления карточки: линк и название
const popupNewPlaceLinkInp = popupNewPlace.querySelector(
  ".popup__inp_field_newplacelink"
);
const popupNewPlaceNameInp = popupNewPlace.querySelector(
  ".popup__inp_field_newplacename"
);

//Элементы в профиле: имя и род занятий
const profileFullNname = document.querySelector(".profile__full-name");
const profileOccupation = document.querySelector(".profile__occupation");

const templateCard = document.querySelector("#templateCard").content;

//Элемент куда кладется новая карточка
const placesItem = document.querySelector(".places__items");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
  formNewPlace.reset();
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
  formNewPlace.reset();
  closePopup(popupNewPlace);
});

initialCards.forEach(addNewCard);

