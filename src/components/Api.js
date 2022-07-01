import {baseLink, secretToken} from "./virables";

class Api {
  constructor({baseUrl, headers}) {
    this.bdlink = baseUrl
    this.headers = headers
  }
  getProfile() {
    return fetch(`${this.bdlink}users/me`,{
      headers: {
        authorization: `${secretToken}`
      }
    })
      .then(this._getResponseData)
      .catch(console.log)
  }
  editProfile(name, about) {
    return fetch(`${baseLink}users/me`,{
      method: 'PATCH',
      headers: {
        authorization: `${secretToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getResponseData)
      .catch(console.log)
  }
  addCard(name, link) {
    return fetch(`${this.bdlink}cards`,{
      method: 'POST',
      headers: {
        authorization: `${secretToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link,
      })
    })
      .then(this._getResponseData)
      .catch(console.log)
  }
  getInitialCards() {
    return fetch(`${this.bdlink}cards`, {
      headers: {
        authorization: `${secretToken}`
      }
    })
      .then(this._getResponseData)
      .catch(console.log)
  }

  deleteCard(cardId) {
    return fetch(`${this.bdlink}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${secretToken}`
      }
    })
      .then(this._getResponseData)
      .catch(console.log)
  }
  setLike(cardId) {
    return fetch(`${this.bdlink}cards/${cardId}/likes`,{
      method: 'PUT',
      headers: {
        authorization: `${secretToken}`
      }
    })
      .then(this._getResponseData)
      .catch(console.log)
  }
  deleteLike(cardId) {
    return fetch(`${this.bdlink}cards/${cardId}/likes`,{
      method: 'DELETE',
      headers: {
        authorization: `${secretToken}`
      }
    })
      .then(this._getResponseData)
      .catch(console.log)
  }

  getAvatar(avatar) {
    return fetch(`${this.bdlink}users/me/avatar`, {
        method: 'PATCH',
      headers: {
        authorization: `${secretToken}`
      },
        body: JSON.stringify(avatar)
    })
      .then(this._getResponseData)
      .catch(console.log)
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

}

export const api = new Api ({
  baseUrl: baseLink,
  headers: {
    authorization: secretToken,
    'Content-Type': 'application/json'
  }
})

