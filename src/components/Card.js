
export class Card {
  constructor(data, ownerId, templateSelector, handleCardClick, confirmationCallback, onLikeCallback) {
    this._name = data.name;
    this._ownerId = ownerId;
    this._confirmationCallback = confirmationCallback;
    this._data = data;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._onLikeCallback = onLikeCallback;
  }

  _getTemplate() {
    const placeElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    return placeElement;
  }

  _toggleCardLike() {
    this._likeBtn.classList.toggle('place__like-btn_active');
  }

  _showDeleteBtn() {
    this._dltBtn.classList.add('place__delete-btn_visible');
  }

  _renederLikesCount() {
    this._likeCount.textContent = this._data.likes.length;
  }

  getCardId() {
    return this._data._id;
  }

  _isMyCard() {
    return this._data.owner._id === this._ownerId;
  }

  isLiked() {
    return this._data.likes.find(like => like._id === this._ownerId);
  }

  updateCard(data) {
    this._data = data;
    this._renederLikesCount();
    this._toggleCardLike();
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => { this._handleCardClick(this._name, this._link); });
    this._likeBtn.addEventListener('click', () =>  this._onLikeCallback(this));
    this._dltBtn.addEventListener('click', () => this._confirmationCallback(this));
  }

  createCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector('.place__image');
    this._likeBtn = this._element.querySelector('.place__like-btn');
    this._likeCount = this._element.querySelector('.place__like-count');
    this._dltBtn = this._element.querySelector('.place__delete-btn');
    this._setEventListeners();

    if (this._isMyCard()) this._showDeleteBtn();
    if (this.isLiked()) this._toggleCardLike();

    this._renederLikesCount();

    this._imageElement.setAttribute("src", this._link);
    this._imageElement.setAttribute("alt", this._name);


    this._element.querySelector('.place__title').textContent = this._name;

    return this._element;
  }
}
