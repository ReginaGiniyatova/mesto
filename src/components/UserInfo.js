export default class UserInfo {
  constructor(usernameSelector, descriptionSelector, avatarSelector) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      username: this._usernameElement.textContent,
      description: this._descriptionElement.textContent
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
      this._name = name;
      this._about = about;
      this._avatar = avatar;
      this._id = _id;

      this._usernameElement.textContent = name;
      this._descriptionElement.textContent = about;
    }

    setUserAvatar(avatarUrl){
      this._avatarElement.src = avatarUrl;
    }

    getUserInfoId() {
      return this._id;
    }
}
