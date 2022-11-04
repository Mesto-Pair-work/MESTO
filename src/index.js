import "./pages/index.css";
import {setUserInfo} from "./scripts/components/utils.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import {openPopup, closePopup} from "./scripts/components/modal.js";
import {api} from "./scripts/components/api.js";
import {Section} from "./scripts/components/section.js";
import {Card} from "./scripts/components/card.js";
import {
    popups,
    profileEditBtn,
    profileEditAvatar,
    profileButtonPlus,
    popupProfile,
    popupNewPlace,
    /*popupAvatar,*/
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
    placesItem,
    validationConfig,
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
        //popupNewPlaces.open()
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
            //popupNewPlaces.close()
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
    popupAvatar.open();
});

//Submit формы добавления нового аватара
function submitFormAvatar(avatarLink) {

    event.submitter.textContent = "Сохранение...";
    event.preventDefault();
    api.editAvatar(popupInpFieldAvatar.value)
        .then((user) => {
            setUserInfo(user);
            popupAvatar.close();
            event.target.reset();
        })
        .finally((card) => {
            event.submitter.textContent = "Обновить";
        })
        .catch((err) => {
            console.log(err);
        });
}

const popupAvatar = new PopupWithForm('.popup_type_avatar', 'popup_opened', 'popup__close-btn', submitFormAvatar, '.popup__form', '.popup__inp', '.popup__save-btn');
popupAvatar.setEventListeners();
const popupNewPlaces = new PopupWithImage('.popup__big-img', '.popup__title_type_big-photo');
popupNewPlaces.setEventListeners();

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
const avatarValidForm = new FormValidator(validationConfig, formAvatar)
const profileValidForm = new FormValidator(validationConfig, formProfile)
const newPlaceValidForm = new FormValidator(validationConfig, formNewPlace)

newPlaceValidForm.enableValidation()
profileValidForm.enableValidation()
avatarValidForm.enableValidation()