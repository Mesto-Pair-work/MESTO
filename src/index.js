import "./pages/index.css";
import FormValidator from "./scripts/components/FormValidate";
import { openPopup, closePopup } from "./scripts/components/modal.js";
import { Api } from "./scripts/components/api.js";
import { Section } from "./scripts/components/section.js";
import { Card } from "./scripts/components/card.js";
import { UserInfo } from "./scripts/components/userinfo.js";
import {
  settings,
  popups,
  profileEditBtn,
  profileEditAvatar,
  profileButtonPlus,
  popupProfile,
  popupNewPlace,
  popupAvatar,
  formAvatar,
  formProfile,
  formNewPlace,
  popupFullnameInp,
  popupOccupationInp,
  popupNewPlaceLinkInp,
  popupNewPlaceNameInp,
  popupInpFieldAvatar,
  profileFullNname,
  profileOccupation,
  placesItem, validationConfig,
} from "./scripts/components/constants.js";

const api = new Api(settings);
const userInfo = new UserInfo(
  ".profile__full-name",
  ".profile__occupation",
  ".profile__photo",
  api
);

//------------------------Events ---------------------------------//

//Клик по кнопке редактирования профиля
profileEditBtn.addEventListener("click", () => {
  openPopup(popupProfile);
  userInfo.getUserInfo().then((user) => {
    popupFullnameInp.value = user.about;
    popupOccupationInp.value = user.name;
  });
});

//Submit формы профиля
formProfile.addEventListener("submit", (evt) => {
  evt.submitter.textContent = "Сохранение...";
  evt.preventDefault();
  userInfo
    .setUserInfo({
      name: popupFullnameInp.value,
      about: popupOccupationInp.value,
    })
    .finally(() => {
      evt.target.reset();
      evt.submitter.textContent = "Сохранить";
      closePopup(popupProfile);
    });
});

//Клик по кнопке добавления карточки
profileButtonPlus.addEventListener("click", () => {
  openPopup(popupNewPlace);
});

//Submit формы добавления карточки
formNewPlace.addEventListener("submit", (evt) => {
  evt.submitter.textContent = "Сохранение...";
  evt.preventDefault();
  const card = {
    name: popupNewPlaceNameInp.value,
    link: popupNewPlaceLinkInp.value,
  };
  api
    .setCard(card)
    .then((card) => {
      const cardList = new Section(
        card.owner._id,
        [card],
        (card) => {
          const cardElement = new Card("#templateCard", card, api).generate();
          cardList.setItem(cardElement);
        },
        placesItem
      );
      cardList.renderItems();

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

//Клик по аватару
profileEditAvatar.addEventListener("click", () => {
  openPopup(popupAvatar);
});

//Submit формы добавления нового аватара
formAvatar.addEventListener("submit", (evt) => {
  evt.submitter.textContent = "Сохранение...";
  evt.preventDefault();
  userInfo.setAvatarInfo(popupInpFieldAvatar.value)
  .finally(() => {
    evt.submitter.textContent = "Обновить";
    closePopup(popupAvatar);
    evt.target.reset();
  })
});

//Перебираем все попапы и навешиваем на них события ( клик вне попапа и клик по крестику)
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

//Достаем юзера и все карточки с сервера, вносим всё в разметку
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user, true);
    const userId = user._id;
    const cardList = new Section(
      userId,
      cards,
      (card) => {
        const cardElement = new Card("#templateCard", card, api).generate();
        cardList.setItem(cardElement);
      },
      placesItem
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  });

//Валидация форм
const avatarValidForm = new FormValidator(validationConfig, formAvatar)
const profileValidForm = new FormValidator(validationConfig, formProfile)
const newPlaceValidForm = new FormValidator(validationConfig, formNewPlace)

newPlaceValidForm.enableValidation()
profileValidForm.enableValidation()
avatarValidForm.enableValidation()
