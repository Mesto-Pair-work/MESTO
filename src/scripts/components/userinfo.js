export class UserInfo {
  constructor(fullNameSelector, occupationSelector, avatarSelector, api) {
    this._aboutElement = document.querySelector(occupationSelector);
    this._nameElement = document.querySelector(fullNameSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._api = api;
  }

  getUserInfo() {
    return this._api.getUser().catch((err) => {
      console.log(err);
    });
  }

  setUserInfo(user, ava = false) {
    return this._api
      .editUser(user)
      .then((user) => {
        this._aboutElement.textContent = user.name;
        this._nameElement.textContent = user.about;
        if (ava) {
          this.setAvatarInfo(user.avatar);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setAvatarInfo(url) {
    return this._api
      .editAvatar(url)
      .then((user) => {
        this._avatarElement.src = user.avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
