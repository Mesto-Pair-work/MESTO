import { openPopup } from "./modal.js";
import { delCard, addLike, delLike } from "./api.js";


function createNewCard(card) {
  const popupBigPhoto = document.querySelector(".popup_type_big-photo");
  const popupBigPhotoImg = popupBigPhoto.querySelector(".popup__big-img");
  const popupBigPhotoTitle = popupBigPhoto.querySelector(".popup__title_type_big-photo");
  const templateCard = document.querySelector("#templateCard").content;
  const placesBox = templateCard.querySelector(".places-box").cloneNode(true);
  const placesBoxEmotion = placesBox.querySelector(".places-box__emotion");
  const placesBoxPhoto = placesBox.querySelector(".places-box__photo");
  const placesBoxName = placesBox.querySelector(".places-box__name");
  const placesBboxLikeNum = placesBox.querySelector(".places-box__like-num");
  placesBoxPhoto.src = card.link;
  placesBoxPhoto.alt = card.name;
  placesBoxName.textContent = card.name;
  placesBboxLikeNum.textContent = card.likes.length;

  const boxLike = placesBox.querySelector(".places-box__like");
  if(card.likes.find(like => like._id === card.userId)) {
    boxLike.classList.add("places-box__like_active");
  }

  boxLike.addEventListener("click", function () {
    this.classList.toggle("places-box__like_active");
    if(this.classList.contains("places-box__like_active")) {
      addLike(card._id)
      .then((card) => {
        placesBboxLikeNum.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      delLike(card._id)
      .then((card) => {
        placesBboxLikeNum.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });

  if(card.owner._id === card.userId) {
    const iconDelCard = document.createElement("button");
    iconDelCard.setAttribute("type", "button");
    iconDelCard.setAttribute("aria-label", "del-card");
    iconDelCard.className = "places-box__del-card";
    placesBoxEmotion.append(iconDelCard);

    iconDelCard.addEventListener("click", function () {
      //Не стал реализовывать задание "Попап удаления карточки" (не успеваю), просто поставил системную заглушку
      if(confirm("Вы уверены, что хотите удалить эту карточку?")) {
        placesBox.remove();
        delCard(card._id);
      }
    });
  }

  placesBoxPhoto.addEventListener("click", function () {
    popupBigPhotoImg.src = card.link;
    popupBigPhotoImg.alt = card.name;
    popupBigPhotoTitle.textContent = card.name;
    openPopup(popupBigPhoto);
  });

  return placesBox;
}

export function addNewCard(card, userId) {  
  card.userId = userId;
  const placesItem = document.querySelector(".places__items");
  placesItem.prepend(createNewCard(card));
}



