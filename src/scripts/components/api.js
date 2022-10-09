const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "d3efd322-579e-46e2-8334-d27c812c6b90",
    "Content-Type": "application/json",
  },
};

export const setCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const editUser = (user) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const delCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  export const delLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };


  export const editAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };



