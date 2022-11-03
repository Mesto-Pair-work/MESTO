"use strict";
import {popupBigPhoto, popupBigPhotoImg, popupBigPhotoTitle} from "./constants.js";
import { openPopup } from "./modal.js";
import { api } from "./api.js";

//Класс принимает в конструктор данные карты(Card) и селектор её template-элемента (selector);
export class Card {
  constructor(selector, card) {
    this._selector = selector;
    this._link = card.link;
    this._title = card.name;
    this._likes = card.likes;
    this._userId = card.userId;
    this._id = card._id;
    this._owner = card.owner;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".places-box")
      .cloneNode(true);

    return cardElement;
  }

  _handleAddLike() {
    if (!this._boxLike.classList.contains("places-box__like_active")) {
      api.addLike(this._id) 
        .then((card) => {
          this._boxLike.classList.toggle("places-box__like_active");
          this._placesBboxLikeNum.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.delLike(this._id) 
        .then((card) => {
          this._boxLike.classList.toggle("places-box__like_active");
          this._placesBboxLikeNum.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _showDelIcon() {
    //Если id-карты и id-юзера совпадают, то показываем иконку корзины для удаления карточки
    if (this._owner._id !== this._userId) {
      this._iconDelCard.remove();
    } else {
      this._iconDelCard.addEventListener("click", () => {
        api.delCard(this._id)
          .then((card) => {
            this._element.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }

  _isLike() {
    //Если в массиве лайков есть мой лайк, то делаем сердечко лайкнутым
    if (this._likes.find((like) => like._id === this._userId)) {
      this._boxLike.classList.add("places-box__like_active");
    }
  }

  _handleOpenBigPhoto() {
    popupBigPhotoImg.src = this._link;
    popupBigPhotoImg.alt = this._title;
    popupBigPhotoTitle.textContent = this._title;
    openPopup(popupBigPhoto); 
  }

  _setEventListeners() {
    this._placesBoxPhoto.addEventListener("click", () => {
      this._handleOpenBigPhoto();
    });

    this._boxLike.addEventListener("click", () => {
      this._handleAddLike();
    });
  }

   //Создаем элемент, навешиваем события, заполняем данными, реализуем логику лайков
   generate() {
    this._element = this._getElement();
    this._iconDelCard = this._element.querySelector(".places-box__del-card");
    this._placesBoxPhoto = this._element.querySelector(".places-box__photo");
    this._placesBoxName = this._element.querySelector(".places-box__name");
    this._placesBboxLikeNum = this._element.querySelector(
      ".places-box__like-num"
    );
    this._boxLike = this._element.querySelector(".places-box__like");
    this._placesBoxPhoto.src = this._link;
    this._placesBoxPhoto.alt = this._title;
    this._placesBoxName.textContent = this._title;
    this._placesBboxLikeNum.textContent = this._likes.length;

    this._isLike();
    this._showDelIcon();
    this._setEventListeners();

    return this._element;
  }

}
