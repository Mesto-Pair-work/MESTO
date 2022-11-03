import "./pages/index.css";
import { setUserInfo } from "./scripts/components/utils.js";
import { enableValidation } from "./scripts/components/validate.js";
import { openPopup, closePopup } from "./scripts/components/modal.js";
import { api } from "./scripts/components/api.js";
import { Section } from "./scripts/components/section.js";
import { Card } from "./scripts/components/card.js";
import {
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
  placesItem
} from "./scripts/components/constants.js";

//------------------------Events ---------------------------------//

//Клик по кнопке редактирования профиля
profileEditBtn.addEventListener("click", () => {
  openPopup(popupProfile);
  popupFullnameInp.value = profileFullNname.textContent;
  popupOccupationInp.value = profileOccupation.textContent;
});

//Submit формы профиля
formProfile.addEventListener("submit", (evt) => {
  evt.submitter.textContent = "Сохранение...";
  evt.preventDefault();
  api.editUser({
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
  api.setCard(card)
    .then((card) => {
      
      const cardList = new Section(card.owner._id, [card], (card) => {
        const cardElement = new Card("#templateCard", card).generate();
        cardList.setItem(cardElement);
      }, placesItem);
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
  api.editAvatar(popupInpFieldAvatar.value)
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
    setUserInfo(user);
    const userId = user._id;
    const cardList = new Section(userId, cards, (card) => {
      const cardElement = new Card("#templateCard", card).generate();
      cardList.setItem(cardElement);
    }, placesItem);
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(`Какая-то ошибка ${err}`);
  });

//Валидация форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__inp",
  submitButtonSelector: ".popup__save-btn",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__inp-error_active",
});