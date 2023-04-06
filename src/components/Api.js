
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
    getUserInfo(){
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Error: ${res.status}`);
      });
    }
    getInitialCards(){
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Error: ${res.status}`);
      });
    }

    patchUserInfo(values){
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: values.username,
          about: values.description
        })
      })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Error: ${res.status}`);
      });
    }

    addNewCard(card){
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: card.name,
          link: card.link
        })
      })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Error: ${res.status}`);
      });
    }

    deleteCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers})
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Error: ${res.status}`);
      });
    }

    setLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Error: ${res.status}`);
      });
    }

    removeLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Error: ${res.status}`);
      });
    }

    uploadAvatar(avatarUrl) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
      })
      .then(res => {
        if (res.ok) return res.json();
        else return Promise.reject(`Error: ${res.status}`);
      });
    }
}
