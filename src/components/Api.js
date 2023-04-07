
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

    _checkResponse(res) {
        if (res.ok) return res.json();
        else return Promise.reject(`Error: ${res.status}`);
    }

    _request(url, options) {
      return fetch(url, options)
        .then(this._checkResponse);
    }

    getUserInfo(){
      return this._request(`${this._baseUrl}/users/me`, {
        headers: this._headers
      });
    }

    getInitialCards(){
      return this._request(`${this._baseUrl}/cards`, {
        headers: this._headers
      });
    }

    patchUserInfo(values){
      return this._request(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: values.username,
          about: values.description
        })
      });
    }

    addNewCard(card){
      return this._request(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: card.name,
          link: card.link
        })
      });
    }

    deleteCard(cardId){
      return this._request(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers});
    }

    setLike(cardId) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      });
    }

    removeLike(cardId) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      });
    }

    uploadAvatar(avatarUrl) {
      return this._request(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
      });
    }
}
