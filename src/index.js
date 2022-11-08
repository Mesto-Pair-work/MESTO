import "./pages/index.css";
import { FormValidator } from "./scripts/components/FormValidate.js";
import { Api } from "./scripts/components/Api.js";
import { Section } from "./scripts/components/Section.js";
import { Card } from "./scripts/components/Card.js";
import { UserInfo } from "./scripts/components/Userinfo.js";
import * as constants from "./scripts/components/constants.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage";

const api = new Api(constants.settings);
const userInfo = new UserInfo(".profile__full-name", ".profile__occupation", ".profile__photo", api);

//Валидация форм
new FormValidator(constants.dataForm, constants.formNewPlace).enableValidation();
new FormValidator(constants.dataForm, constants.formProfile).enableValidation();
new FormValidator(constants.dataForm, constants.formAvatar).enableValidation();


//Клик по кнопке редактирования профиля
constants.profileEditBtn.addEventListener("click", () => {
  popupProfileForm.open();
  userInfo.getUserInfo().then((user) => {
    constants.popupFullnameInp.value = user.about;
    constants.popupOccupationInp.value = user.name;
  });
});
//Клик по кнопке добавления карточки
constants.profileButtonPlus.addEventListener("click", () => {
  popupNewPlaceForm.open();
});
//Клик по аватару
constants.profileEditAvatar.addEventListener("click", () => {
  popupAvatarForm.open();
});
//Функция обработчик сабмита для формы аватара
const handleSubmitAvatar = function(evt, {avatarurl}) {
  evt.submitter.textContent = "Сохранение...";
  userInfo.setAvatarInfo(avatarurl).finally(() => {
    evt.submitter.textContent = "Обновить";
    popupAvatarForm.close();
  });
}
//Функция обработчик сабмита для формы профайла
const handleSubmitProfile = function (evt, { fullname, occupation }) {
  evt.submitter.textContent = "Сохранение...";
  userInfo
    .setUserInfo({
      name: fullname,
      about: occupation,
    })
    .finally(() => {
      popupProfileForm.close();
      evt.submitter.textContent = "Сохранить";
    });
};
//Функция обработчик сабмита для карточки
const handleSubmitNewPlace = function(evt, {newplacename, newplacelink}) {
  evt.submitter.textContent = "Сохранение...";
  const card = {
    name: newplacename,
    link: newplacelink,
  };
  api
    .setCard(card)
    .then((card) => {
      const cardList = new Section(card.owner._id, [card], (card) => {
          const cardElement = new Card("#templateCard", card, api, popupBigPhoto.open.bind(popupBigPhoto)).generate();
          cardList.setItem(cardElement);
        }, constants.placesItem);
      cardList.renderItems();
      popupNewPlaceForm.close();
    })
    .finally((card) => {
      evt.submitter.textContent = "Создать";
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupProfileForm = new PopupWithForm(".popup_type_profile", handleSubmitProfile);
const popupAvatarForm = new PopupWithForm(".popup_type_avatar", handleSubmitAvatar);
const popupNewPlaceForm = new PopupWithForm(".popup_type_new-place", handleSubmitNewPlace);
const popupBigPhoto = new PopupWithImage(".popup_type_big-photo");
popupNewPlaceForm.setEventListeners();
popupProfileForm.setEventListeners();
popupAvatarForm.setEventListeners();
popupBigPhoto.setEventListeners();


//Достаем юзера и все карточки с сервера, вносим всё в разметку
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user, true);
    const userId = user._id;
    const cardList = new Section(
      userId,
      cards,
      (card) => {
        const cardElement = new Card("#templateCard", card, api, popupBigPhoto.open.bind(popupBigPhoto)).generate();
        cardList.setItem(cardElement);
      },
      constants.placesItem
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  });
