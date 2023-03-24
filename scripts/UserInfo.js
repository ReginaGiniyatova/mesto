export default class UserInfo {
  constructor(usernameSelector, descriptionSelector) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      username: this._usernameElement.textContent,
      description: this._descriptionElement.textContent
    }
  }

  setUserInfo({ username, description }) {
      this._usernameElement.textContent = username;
      this._descriptionElement.textContent = description;
    }
}
