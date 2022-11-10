export class UserInfo {
    constructor(fullNameSelector, occupationSelector, avatarSelector) {
        this._aboutElement = document.querySelector(occupationSelector);
        this._nameElement = document.querySelector(fullNameSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            occupation: this._aboutElement.textContent,
            fullname: this._nameElement.textContent,
            avatar: this._avatarElement.src
        };
    }

    setUserInfo({name, about, avatar}) {
        this._aboutElement.textContent = about;
        this._nameElement.textContent = name;
        this._avatarElement.src = avatar;
    }
}
