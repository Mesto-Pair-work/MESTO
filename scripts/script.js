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
const popupBigPhotoTitle = popupBigPhoto.querySelector(".popup__title_big-photo");

// Две формы: профиль и добавление карты
const formProfile = popupProfile.querySelector(".popup__form");
const formNewPlace = popupNewPlace.querySelector(".popup__form");

//Три кнопки Close:
const popupCloseBtnProfile = popupProfile.querySelector(".popup__close-btn");
const popupCloseBtnNewPlace = popupNewPlace.querySelector(".popup__close-btn");
const popupCloseBtnBigPhoto = popupBigPhoto.querySelector(".popup__close-btn");

//Поля формы профиля: имя и род занятий
const popupFullnameInp = popupProfile.querySelector(".popup__fullname-inp");
const popupOccupationInp = popupProfile.querySelector(".popup__occupation-inp");

//Поля формы для добавления карточки: линк и название
const popupNewPlaceLinkInp = popupNewPlace.querySelector(
  ".popup__newplacelink-inp"
);
const popupNewPlaceNameInp = popupNewPlace.querySelector(
  ".popup__newplacename-inp"
);

//Элементы в профиле: имя и род занятий
const profileFullNname = document.querySelector(".profile__full-name");
const profileOccupation = document.querySelector(".profile__occupation");

const templateCard = document.querySelector("#templateCard").content;

function clerAllFields(form) {
  form.querySelectorAll("input").forEach((inp) => (inp.value = ""));
}

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

profileEditBtn.addEventListener("click", function () {
  togglePopup(popupProfile);
  popupFullnameInp.value = profileFullNname.textContent;
  popupOccupationInp.value = profileOccupation.textContent;
});

popupCloseBtnProfile.addEventListener("click", function () {
  togglePopup(popupProfile);
});

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileFullNname.textContent = popupFullnameInp.value;
  profileOccupation.textContent = popupOccupationInp.value;
  togglePopup(popupProfile);
});

profileButtonPlus.addEventListener("click", function () {
  togglePopup(popupNewPlace);
});

popupCloseBtnNewPlace.addEventListener("click", function () {
  togglePopup(popupNewPlace);
  clerAllFields(formNewPlace);
});

popupCloseBtnBigPhoto.addEventListener("click", function () {
  togglePopup(popupBigPhoto);
});

formNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const card = {
    name: popupNewPlaceNameInp.value,
    link: popupNewPlaceLinkInp.value,
  };
  addNewCard(card);
  clerAllFields(formNewPlace);
  togglePopup(popupNewPlace);
});

const initialCards = [
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

const placesItems = document.querySelector(".places__items");

function addNewCard(obj) {
  const placesBox = templateCard.querySelector(".places-box").cloneNode(true);
  const placesBoxPhoto = placesBox.querySelector(".places-box__photo");
  const placesBoxName = placesBox.querySelector(".places-box__name");
  placesBoxPhoto.src = obj.link;
  placesBoxPhoto.alt = obj.name;
  placesBoxName.textContent = obj.name;

  let likeEmotion = placesBox.querySelector(".places-box__like");
  likeEmotion.addEventListener("click", function () {
    this.classList.toggle("places-box__like_active");
  });

  let delCard = placesBox.querySelector(".places-box__del-card");
  delCard.addEventListener("click", function () {
    placesBox.remove();
  });

  placesBoxPhoto.addEventListener("click", function () {
    if(popupBigPhotoImg.src) popupBigPhotoImg.src = "";
    popupBigPhotoImg.src = obj.link;
    popupBigPhotoImg.alt = obj.name;
    popupBigPhotoTitle.textContent = obj.name;
    togglePopup(popupBigPhoto);
  });

  placesItems.prepend(placesBox);
}

initialCards.forEach(addNewCard);
