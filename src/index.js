import "./pages/index.css";
import {FormValidator} from "./scripts/components/FormValidate.js";
import {Api} from "./scripts/components/Api.js";
import {Section} from "./scripts/components/Section.js";
import {Card} from "./scripts/components/Card.js";
import {UserInfo} from "./scripts/components/Userinfo.js";
import * as constants from "./scripts/utils/constants.js";
import {PopupWithForm} from "./scripts/components/PopupWithForm.js";
import {PopupWithImage} from "./scripts/components/PopupWithImage.js";

const api = new Api(constants.settings);
const userInfo = new UserInfo(
    ".profile__full-name",
    ".profile__occupation",
    ".profile__photo"
);

//Валидация форм
new FormValidator(constants.validationConfig,constants.formNewPlace).enableValidation();
new FormValidator(constants.validationConfig,constants.formProfile).enableValidation();
new FormValidator(constants.validationConfig,constants.formAvatar).enableValidation();

const createCard = function (item) {
    return new Card(
        "#templateCard",
        item,
        api,
        popupBigPhoto.open.bind(popupBigPhoto)
    ).generate();
};

const cardList = new Section((item) => {
    const cardElement = createCard(item);
    cardList.setItem(cardElement);
}, constants.placesItem);

//Клик по кнопке редактирования профиля
constants.profileEditBtn.addEventListener("click", () => {
    const user = userInfo.getUserInfo();
    popupProfileForm.open();
    popupProfileForm.setInputValues(user);
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
const handleSubmitAvatar = function ({avatarurl}) {
    return api.editAvatar(avatarurl).then((user) => {
        userInfo.setUserInfo(user);
    });
};

//Функция обработчик сабмита для формы профайла
const handleSubmitProfile = function ({fullname, occupation}) {
    return api
        .editUser({
            name: fullname,
            about: occupation,
        })
        .then((user) => {
            userInfo.setUserInfo(user);
        });
};

//Функция обработчик сабмита для карточки
const handleSubmitNewPlace = function ({newplacename, newplacelink}) {
    const card = {
        name: newplacename,
        link: newplacelink,
    };
    return api
        .setCard(card)
        .then((card) => {
            card.userId = card.owner._id;
            const cardElement = createCard(card);
            cardList.setItem(cardElement, true);
        });
};

const popupProfileForm = new PopupWithForm(
    ".popup_type_profile",
    handleSubmitProfile
);
const popupAvatarForm = new PopupWithForm(
    ".popup_type_avatar",
    handleSubmitAvatar
);
const popupNewPlaceForm = new PopupWithForm(
    ".popup_type_new-place",
    handleSubmitNewPlace
);
const popupBigPhoto = new PopupWithImage(".popup_type_big-photo");
popupNewPlaceForm.setEventListeners();
popupProfileForm.setEventListeners();
popupAvatarForm.setEventListeners();
popupBigPhoto.setEventListeners();

//Достаем юзера и все карточки с сервера, вносим всё в разметку
Promise.all([api.getUser(), api.getInitialCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        cardList.renderItems(cards, user._id);
    })
    .catch((err) => {
        console.log(err);
    });
