const profilePhoto = document.querySelector(".profile__photo");
const profileFullName = document.querySelector(".profile__full-name");
const profileOccupation = document.querySelector(".profile__occupation");

export function setUserInfo(user) {
  profilePhoto.src = user.avatar;
  profileFullName.textContent = user.name;
  profileOccupation.textContent = user.about;
}

