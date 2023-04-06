export default class UserInfo {
  constructor(usernameSelector, descriptionSelector, avatarSelector, onAvatarClick) {
    this._usernameElement = document.querySelector(usernameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._onAvatarClickCallback = onAvatarClick;
  }

  setEventListener() {
    this._avatarElement.parentNode.addEventListener('click', () => this._onAvatarClickCallback());
  }

  getUserInfo() {
    return {
      username: this._usernameElement.textContent,
      description: this._descriptionElement.textContent
    }
  }

  setUserInfo(info) {
      this._info = info;
      this._usernameElement.textContent = info.name;
      this._descriptionElement.textContent = info.about;
    }

    setUserAvatar(avatarUrl){
      this._avatarElement.src = avatarUrl;
    }

    getUserInfoId() {
      return this._info._id;
    }
}
