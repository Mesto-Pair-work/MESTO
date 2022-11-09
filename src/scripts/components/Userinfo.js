export class UserInfo {
  constructor(fullNameSelector, occupationSelector, avatarSelector) {
    this._aboutElement = document.querySelector(occupationSelector);
    this._nameElement = document.querySelector(fullNameSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      about: this._aboutElement.textContent,
      name: this._nameElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo(user, ava = false) {
    this._aboutElement.textContent = user.about;
    this._nameElement.textContent = user.name;
    if (ava) {
      this._avatarElement.src = user.avatar;
    }
  }
}
