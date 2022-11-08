import "./pages/index.css";
import {FormValidator} from "./scripts/components/FormValidate";
import { Api } from "./scripts/components/api.js";
import { Section } from "./scripts/components/section.js";
import { Card } from "./scripts/components/card.js";
import { UserInfo } from "./scripts/components/userinfo.js";
import * as constants from "./scripts/components/constants.js";

const api = new Api(constants.settings);
const userInfo = new UserInfo(
    ".profile__full-name",
    ".profile__occupation",
    ".profile__photo",
    api
);

new FormValidator(constants.validationConfig, constants.formNewPlace).enableValidation();
new FormValidator(constants.validationConfig, constants.formProfile).enableValidation();
new FormValidator(constants.validationConfig, constants.formAvatar).enableValidation();
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
constants.profileEditBtn.addEventListener("click", () => {
    userInfo.getUserInfo().then((user) => {
        profileEditPopup.open();
        constants.popupFullnameInp.value = user.about;
        constants.popupOccupationInp.value = user.name;
    });
});

//Клик по кнопке добавления карточки
constants.profileButtonPlus.addEventListener("click", () => {
    constants.popupNewPlace.open();
});

//Submit формы добавления карточки
constants.formNewPlace.addEventListener("submit", (evt) => {
    evt.submitter.textContent = "Сохранение...";
    evt.preventDefault();
    const card = {
        name: constants.popupNewPlaceNameInp.value,
        link: constants.popupNewPlaceLinkInp.value,
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
                constants.placesItem
            );
            cardList.renderItems();

            constants.popupNewPlace.close();
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
        userInfo.setAvatarInfo(constants.popupInpFieldAvatar.value)
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

constants.profileEditAvatar.addEventListener('click', () => {
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
            constants.placesItem
        );
        cardList.renderItems();
    })
    .catch((err) => {
        console.log(`Ошибка ${err}`);
    });