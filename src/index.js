import "./pages/index.css";
//import { openPopup, closePopup } from "./scripts/components/modal.js";
import FormValidator from "./scripts/components/FormValidate";
import {Api} from "./scripts/components/api.js";
import {Section} from "./scripts/components/section.js";
import {Card} from "./scripts/components/card.js";
import {UserInfo} from "./scripts/components/userinfo.js";
import {
    settings,
    profileEditBtn,
    profileEditAvatar,
    profileButtonPlus,
    popupNewPlace,
    formAvatar,
    formProfile,
    formNewPlace,
    popupFullnameInp,
    popupOccupationInp,
    popupNewPlaceLinkInp,
    popupNewPlaceNameInp,
    popupInpFieldAvatar,
    //profileFullNname,
    //profileOccupation,
    placesItem, validationConfig,
} from "./scripts/components/constants.js";


import PopupWithForm from "./scripts/components/PopupWithForm";

const api = new Api(settings);
const userInfo = new UserInfo(
    ".profile__full-name",
    ".profile__occupation",
    ".profile__photo",
    api
);

//------------------------Events ---------------------------------//

//Клик по кнопке редактирования профиля
const profileEditPopup = new PopupWithForm('.popup_type_profile', {
    submittingForm: (data) => {
        profileEditPopup.renderDownload(true);
        userInfo.setUserInfo({name: data['fullname'], about: data['occupation']})
            .then(() => {
                profileEditPopup.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                profileEditPopup.renderDownload(false);
            })
    }
})
profileEditPopup.setEventListeners();
profileEditBtn.addEventListener("click", () => {
    userInfo.getUserInfo().then((user) => {
        profileEditPopup.open();
        popupFullnameInp.value = user.about;
        popupOccupationInp.value = user.name;
    });
});

//Клик по кнопке добавления карточки
profileButtonPlus.addEventListener("click", () => {
    popupNewPlace.open();
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

const editAvatar = new PopupWithForm(".popup_type_avatar", {
    submittingForm: (data) => {
        editAvatar.renderDownload(true);
        userInfo.setAvatarInfo(popupInpFieldAvatar.value)
            .then(() => {
                editAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                editAvatar.renderDownload(false);
            })
    }
});

editAvatar.setEventListeners();

profileEditAvatar.addEventListener('click', () => {
    editAvatar.open();
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
