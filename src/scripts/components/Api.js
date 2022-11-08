export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponce = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponce);
  }

  setCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._checkResponce);
  }

  editUser = (user) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(this._checkResponce);
  };

  getUser = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponce);
  };

  delCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponce);
  };

  addLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponce);
  };

  delLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponce);
  };

  editAvatar = (url) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponce);
  };
}
