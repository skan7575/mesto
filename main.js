/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/Card.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Card = /*#__PURE__*/function () {
  function Card(cardId, name, link, likes, isLikeActive, selectorElement, onClick, onDeleteClick, canDelete, onLikeClick) {
    _classCallCheck(this, Card);

    this._cardId = cardId;
    this._name = name;
    this._link = link;
    this._selectorElement = selectorElement;
    this._onClick = onClick;
    this._likes = likes;
    this._isLikeActive = isLikeActive;
    this._onDeleteClick = onDeleteClick;
    this._canDelete = canDelete;
    this._onLikeClick = onLikeClick;
  }

  _createClass(Card, [{
    key: "_getTemplate",
    value: function _getTemplate() {
      var cardTemplate = document.querySelector(this._selectorElement);
      var cardElement = cardTemplate.content.querySelector(".card-item").cloneNode(true);
      return cardElement;
    }
  }, {
    key: "generateCard",
    value: function generateCard() {
      this._element = this._getTemplate();
      this._picturesImage = this._element.querySelector('.gallery__pic');
      this._btnRemove = this._element.querySelector(".gallery__button-remove");
      this._btnLike = this._element.querySelector(".gallery__like-button");
      this._element.querySelector('.gallery__title').textContent = this._name;
      this._picturesImage.src = this._link;
      this._picturesImage.alt = this._name;
      this.setLike(this._likes, this._isLikeActive);

      this._setEventListeners();

      if (this._canDelete) {
        this._btnRemove.classList.remove('gallery__button-remove_disabled');
      } else {
        this._btnRemove.classList.add('gallery__button-remove_disabled');
      }

      return this._element;
    }
  }, {
    key: "setLike",
    value: function setLike(likes, isLikeActive) {
      this._likes = likes;

      var likeCounter = this._element.querySelector('.gallery__like-counter');

      if (this._likes) {
        likeCounter.textContent = this._likes.length;
      } else {
        likeCounter.textContent = "0";
      }

      this._isLikeActive = isLikeActive;

      if (isLikeActive) {
        this._btnLike.classList.add("gallery__like-button_active");
      } else {
        this._btnLike.classList.remove("gallery__like-button_active");
      }
    }
  }, {
    key: "deleteElement",
    value: function deleteElement() {
      this._element.remove();

      this._element = null;
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this = this;

      this._picturesImage.addEventListener('click', function () {
        _this._onClick(_this._name, _this._link);
      });

      this._btnRemove.addEventListener('click', function () {
        _this._onDeleteClick(_this, _this._cardId);
      });

      this._btnLike.addEventListener('click', function () {
        _this._onLikeClick(_this, _this._cardId, !_this._isLikeActive);
      });
    }
  }]);

  return Card;
}();


;// CONCATENATED MODULE: ./src/components/FormValidator.js
function FormValidator_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FormValidator_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function FormValidator_createClass(Constructor, protoProps, staticProps) { if (protoProps) FormValidator_defineProperties(Constructor.prototype, protoProps); if (staticProps) FormValidator_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var FormValidator = /*#__PURE__*/function () {
  function FormValidator(param, form) {
    FormValidator_classCallCheck(this, FormValidator);

    this._param = param;
    this._form = form;
    this._submitButton = this._form.querySelector(this._param.submitButtonSelector);
  }

  FormValidator_createClass(FormValidator, [{
    key: "_validateInput",
    value: function _validateInput(input) {
      var inputErrorClass = this._param.inputErrorClass;
      var errorElement = input.parentNode.querySelector("#".concat(input.id, "-error"));
      /* Вывовод сообщение об ошибке  */

      errorElement.textContent = input.validationMessage;

      if (input.checkValidity()) {
        input.classList.remove(inputErrorClass);
      } else {
        input.classList.add(inputErrorClass);
      }
    }
  }, {
    key: "_enableButton",
    value: function _enableButton() {
      this._submitButton.disabled = false;

      this._submitButton.classList.remove(this._param.inactiveButtonClass);
    }
  }, {
    key: "disabledButton",
    value: function disabledButton() {
      this._submitButton.disabled = true;

      this._submitButton.classList.add(this._param.inactiveButtonClass);
    }
  }, {
    key: "_setButtonState",
    value: function _setButtonState() {
      if (this._form.checkValidity()) {
        this._enableButton();
      } else {
        this.disabledButton(this._submitButton);
      }
    }
  }, {
    key: "_handleInput",
    value: function _handleInput(evt) {
      var input = evt.target;

      this._validateInput(input);

      this._setButtonState();
    }
  }, {
    key: "enableValidation",
    value: function enableValidation() {
      var _this = this;

      this._form.addEventListener('input', function (evt) {
        _this._handleInput(evt);
      });
    }
  }]);

  return FormValidator;
}();


;// CONCATENATED MODULE: ./src/components/Popup.js
function Popup_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Popup_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Popup_createClass(Constructor, protoProps, staticProps) { if (protoProps) Popup_defineProperties(Constructor.prototype, protoProps); if (staticProps) Popup_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Popup = /*#__PURE__*/function () {
  function Popup(popupSelector) {
    Popup_classCallCheck(this, Popup);

    _defineProperty(this, "_popupOpenedClass", "popup_opened");

    _defineProperty(this, "_closeButtonClass", ".popup__close-button");

    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseBinded = this._handleEscClose.bind(this);
  }

  Popup_createClass(Popup, [{
    key: "open",
    value: function open() {
      this._popup.classList.add(this._popupOpenedClass);

      document.addEventListener('keydown', this._handleEscCloseBinded);
    }
  }, {
    key: "close",
    value: function close() {
      this._popup.classList.remove(this._popupOpenedClass);

      document.removeEventListener('keydown', this._handleEscCloseBinded);
    }
  }, {
    key: "_handleEscClose",
    value: function _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this = this;

      this._popup.querySelector(this._closeButtonClass).addEventListener('click', function () {
        _this.close();
      });

      this._popup.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains(_this._popupOpenedClass)) {
          _this.close();
        }
      });
    }
  }]);

  return Popup;
}();


;// CONCATENATED MODULE: ./src/components/PopupWithImage.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function PopupWithImage_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PopupWithImage_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function PopupWithImage_createClass(Constructor, protoProps, staticProps) { if (protoProps) PopupWithImage_defineProperties(Constructor.prototype, protoProps); if (staticProps) PopupWithImage_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function PopupWithImage_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var PopupWithImage = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithImage, _Popup);

  var _super = _createSuper(PopupWithImage);

  function PopupWithImage(popupSelector) {
    var _this;

    PopupWithImage_classCallCheck(this, PopupWithImage);

    _this = _super.call(this, popupSelector);

    PopupWithImage_defineProperty(_assertThisInitialized(_this), "_captionSelector", ".popup__picture-caption");

    PopupWithImage_defineProperty(_assertThisInitialized(_this), "_textSelector", ".popup__text_picture");

    _this._caption = _this._popup.querySelector(_this._captionSelector);
    _this._text = _this._popup.querySelector(_this._textSelector);
    return _this;
  }

  PopupWithImage_createClass(PopupWithImage, [{
    key: "setData",
    value: function setData(image, label) {
      this._image = image;
      this._label = label;
    }
  }, {
    key: "open",
    value: function open() {
      this._caption.src = this._image;
      this._caption.alt = this._label;
      this._text.textContent = this._label;

      _get(_getPrototypeOf(PopupWithImage.prototype), "open", this).call(this);
    }
  }]);

  return PopupWithImage;
}(Popup);


;// CONCATENATED MODULE: ./src/components/PopupWithForm.js
function PopupWithForm_typeof(obj) { "@babel/helpers - typeof"; return PopupWithForm_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, PopupWithForm_typeof(obj); }

function PopupWithForm_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PopupWithForm_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function PopupWithForm_createClass(Constructor, protoProps, staticProps) { if (protoProps) PopupWithForm_defineProperties(Constructor.prototype, protoProps); if (staticProps) PopupWithForm_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function PopupWithForm_get() { if (typeof Reflect !== "undefined" && Reflect.get) { PopupWithForm_get = Reflect.get.bind(); } else { PopupWithForm_get = function _get(target, property, receiver) { var base = PopupWithForm_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return PopupWithForm_get.apply(this, arguments); }

function PopupWithForm_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = PopupWithForm_getPrototypeOf(object); if (object === null) break; } return object; }

function PopupWithForm_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) PopupWithForm_setPrototypeOf(subClass, superClass); }

function PopupWithForm_setPrototypeOf(o, p) { PopupWithForm_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return PopupWithForm_setPrototypeOf(o, p); }

function PopupWithForm_createSuper(Derived) { var hasNativeReflectConstruct = PopupWithForm_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = PopupWithForm_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = PopupWithForm_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return PopupWithForm_possibleConstructorReturn(this, result); }; }

function PopupWithForm_possibleConstructorReturn(self, call) { if (call && (PopupWithForm_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return PopupWithForm_assertThisInitialized(self); }

function PopupWithForm_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function PopupWithForm_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function PopupWithForm_getPrototypeOf(o) { PopupWithForm_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return PopupWithForm_getPrototypeOf(o); }



var PopupWithForm = /*#__PURE__*/function (_Popup) {
  PopupWithForm_inherits(PopupWithForm, _Popup);

  var _super = PopupWithForm_createSuper(PopupWithForm);

  function PopupWithForm(popupSelector, submitCallback) {
    var _this;

    PopupWithForm_classCallCheck(this, PopupWithForm);

    _this = _super.call(this, popupSelector);
    _this._form = _this._popup.querySelector(".popup__form"); // this._button = this._form.find(':submit')

    _this._button = _this._form.querySelector('button[type="submit"]');
    _this._submitCallback = submitCallback;
    _this._inputs = Array.from(_this._form.querySelectorAll('.popup__input'));
    return _this;
  }

  PopupWithForm_createClass(PopupWithForm, [{
    key: "getForm",
    value: function getForm() {
      return this._form;
    }
  }, {
    key: "open",
    value: function open() {
      this._button.textContent = "сохранить";

      PopupWithForm_get(PopupWithForm_getPrototypeOf(PopupWithForm.prototype), "open", this).call(this);
    }
  }, {
    key: "close",
    value: function close() {
      PopupWithForm_get(PopupWithForm_getPrototypeOf(PopupWithForm.prototype), "close", this).call(this);

      this._form.reset();
    }
  }, {
    key: "_getInputValues",
    value: function _getInputValues() {
      var values = {};

      this._inputs.forEach(function (item) {
        values[item.id] = item.value;
      });

      return values;
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this;

      PopupWithForm_get(PopupWithForm_getPrototypeOf(PopupWithForm.prototype), "setEventListeners", this).call(this);

      this._popup.addEventListener("submit", function (evt) {
        evt.preventDefault();
        _this2._button.textContent = "сохранение ...";

        _this2._submitCallback(_this2._getInputValues(), _this2); // this.close()

      });
    }
  }]);

  return PopupWithForm;
}(Popup);


;// CONCATENATED MODULE: ./src/components/UserInfo.js
function UserInfo_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function UserInfo_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function UserInfo_createClass(Constructor, protoProps, staticProps) { if (protoProps) UserInfo_defineProperties(Constructor.prototype, protoProps); if (staticProps) UserInfo_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var UserInfo = /*#__PURE__*/function () {
  function UserInfo(_ref) {
    var nameSelector = _ref.nameSelector,
        aboutSelector = _ref.aboutSelector,
        avatarSelector = _ref.avatarSelector;

    UserInfo_classCallCheck(this, UserInfo);

    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  UserInfo_createClass(UserInfo, [{
    key: "getUserInfo",
    value: function getUserInfo() {
      return {
        name: this._name.textContent,
        about: this._about.textContent
      };
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(name, about, avatar) {
      this._name.textContent = name;
      this._about.textContent = about;
      this._avatar.src = avatar;
    }
  }]);

  return UserInfo;
}();


;// CONCATENATED MODULE: ./src/components/Section.js
function Section_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Section_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Section_createClass(Constructor, protoProps, staticProps) { if (protoProps) Section_defineProperties(Constructor.prototype, protoProps); if (staticProps) Section_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Section = /*#__PURE__*/function () {
  function Section(_ref, containerSelector) {
    var items = _ref.items,
        renderer = _ref.renderer;

    Section_classCallCheck(this, Section);

    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  Section_createClass(Section, [{
    key: "renderer",
    value: function renderer() {
      var _this = this;

      this._items.forEach(function (item) {
        _this._renderer(item);
      });
    }
  }, {
    key: "addItem",
    value: function addItem(element) {
      this._containerSelector.prepend(element);
    }
  }]);

  return Section;
}();


;// CONCATENATED MODULE: ./src/components/virables.js
var baseLink = "https://nomoreparties.co/v1/cohort-44/";
var secretToken = "018813d9-9fe2-45e7-bf4b-f013d9732180";
var btnProfile = document.querySelector("#button__profile");
var profileForm = document.querySelector("#profile");
var buttonAddPlace = document.querySelector("#btnAdd");
var formAddCard = document.querySelector("#add__card");
var buttonEditAvatar = document.querySelector("#button-edit-image");
var formEditAvatar = document.querySelector("#edit__avatar-form");
;// CONCATENATED MODULE: ./src/components/Api.js
function Api_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Api_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Api_createClass(Constructor, protoProps, staticProps) { if (protoProps) Api_defineProperties(Constructor.prototype, protoProps); if (staticProps) Api_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Api = /*#__PURE__*/function () {
  function Api(_ref) {
    var baseUrl = _ref.baseUrl,
        headers = _ref.headers;

    Api_classCallCheck(this, Api);

    this.bdlink = baseUrl;
    this.headers = headers;
  }

  Api_createClass(Api, [{
    key: "getProfile",
    value: function getProfile() {
      return fetch("".concat(this.bdlink, "users/me"), {
        headers: {
          authorization: "".concat(secretToken)
        }
      }).then(this._getResponseData).catch(console.log);
    }
  }, {
    key: "editProfile",
    value: function editProfile(name, about) {
      return fetch("".concat(baseLink, "users/me"), {
        method: 'PATCH',
        headers: {
          authorization: "".concat(secretToken),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
      }).then(this._getResponseData).catch(console.log);
    }
  }, {
    key: "editAvatar",
    value: function editAvatar(avatar) {
      return fetch("".concat(baseLink, "users/me/avatar"), {
        method: 'PATCH',
        headers: {
          authorization: "".concat(secretToken),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avatar
        })
      }).then(this._getResponseData).catch(console.log);
    }
  }, {
    key: "addCard",
    value: function addCard(name, link) {
      return fetch("".concat(this.bdlink, "cards"), {
        method: 'POST',
        headers: {
          authorization: "".concat(secretToken),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      }).then(this._getResponseData).catch(console.log);
    }
  }, {
    key: "getInitialCards",
    value: function getInitialCards() {
      return fetch("".concat(this.bdlink, "cards"), {
        headers: {
          authorization: "".concat(secretToken)
        }
      }).then(this._getResponseData).catch(console.log);
    }
  }, {
    key: "deleteCard",
    value: function deleteCard(cardId) {
      return fetch("".concat(this.bdlink, "cards/").concat(cardId), {
        method: 'DELETE',
        headers: {
          authorization: "".concat(secretToken)
        }
      }).then(this._getResponseData).catch(console.log);
    }
  }, {
    key: "setLike",
    value: function setLike(cardId) {
      return fetch("".concat(this.bdlink, "cards/").concat(cardId, "/likes"), {
        method: 'PUT',
        headers: {
          authorization: "".concat(secretToken)
        }
      }).then(this._getResponseData).catch(console.log);
    }
  }, {
    key: "deleteLike",
    value: function deleteLike(cardId) {
      return fetch("".concat(this.bdlink, "cards/").concat(cardId, "/likes"), {
        method: 'DELETE',
        headers: {
          authorization: "".concat(secretToken)
        }
      }).then(this._getResponseData).catch(console.log);
    }
  }, {
    key: "_getResponseData",
    value: function _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
    }
  }]);

  return Api;
}();

var api = new Api({
  baseUrl: baseLink,
  headers: {
    authorization: secretToken,
    'Content-Type': 'application/json'
  }
});
;// CONCATENATED MODULE: ./src/pages/index.js









var cardPopup = new PopupWithForm("#edit-popup", addCard);
cardPopup.setEventListeners();
var profilePopup = new PopupWithForm("#edit-profile", handleSubmitFormProfile);
profilePopup.setEventListeners();
var AvatarEditPopup = new PopupWithForm("#edit-profile-avatar", handleSubmitFormAvatar);
AvatarEditPopup.setEventListeners();
var nameInputProfilePopup = profilePopup.getForm().querySelector("#input__name");
var aboutInputProfilePopup = profilePopup.getForm().querySelector("#input__about");
var picturePopup = new PopupWithImage("#popup__picture");
picturePopup.setEventListeners();
var userInfo = new UserInfo({
  nameSelector: ".user__profile-name",
  aboutSelector: ".user__profile-about",
  avatarSelector: ".user__picture"
});
var cardsSection = new Section({
  items: [],
  renderer: function renderer(item) {}
}, '.gallery__items');
cardsSection.renderer(); // вызов открытия попапов

buttonEditAvatar.addEventListener("click", function () {
  AvatarEditPopup.open();
  avatarFormValidator.disabledButton();
});
btnProfile.addEventListener("click", function () {
  var user = userInfo.getUserInfo();
  nameInputProfilePopup.value = user.name;
  aboutInputProfilePopup.value = user.about;
  profilePopup.open();
});

function openPreviewPopup(name, link) {
  picturePopup.setData(link, name);
  picturePopup.open();
}

function openCardDeleteConfirmPopup(card, cardId) {
  var cardDeletePopup = new PopupWithForm("#popup-delete", function () {
    handleSubmitFormDeleteCard(card, cardId);
  });
  cardDeletePopup.setEventListeners();
  cardDeletePopup.open();
}

function onLikeClick(card, cardId, like) {
  if (like) {
    api.setLike(cardId).then(function (res) {
      card.setLike(res.likes, true);
    });
  } else {
    api.deleteLike(cardId).then(function (res) {
      card.setLike(res.likes, false);
    });
  }
}

function createCard(cardId, name, link, likes, canDelete, isLiked) {
  return new Card(cardId, name, link, likes, isLiked, '#template__item', openPreviewPopup, openCardDeleteConfirmPopup, canDelete, onLikeClick).generateCard();
}

var validatorParam = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'error'
};
var profileFormValidator = new FormValidator(validatorParam, profileForm);
profileFormValidator.enableValidation();
var avatarFormValidator = new FormValidator(validatorParam, formEditAvatar);
avatarFormValidator.enableValidation();
var addCardFormValidator = new FormValidator(validatorParam, formAddCard);
addCardFormValidator.enableValidation();
buttonAddPlace.addEventListener("click", function () {
  cardPopup.open();
  addCardFormValidator.disabledButton();
});
api.getProfile().then(function (res) {
  userInfo.setUserInfo(res.name, res.about, res.avatar);
  api.getInitialCards().then(function (cardList) {
    cardList.forEach(function (data) {
      var cardItem = createCard(data._id, data.name, data.link, data.likes, data.owner._id === res._id, data.likes.find(function (item) {
        return item._id === res._id;
      }));
      cardsSection.addItem(cardItem);
    });
  });
});

function handleSubmitFormProfile(data, popup) {
  api.editProfile(data["input__name"], data["input__about"]).then(function (res) {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    popup.close();
  });
}

function handleSubmitFormAvatar(data, popup) {
  api.editAvatar(data['input__href_avatar']).then(function (res) {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    popup.close();
  });
}

function addCard(data, popup) {
  api.addCard(data["input__place"], data["input__href"]).then(function (res) {
    var cardItem = createCard(res._id, res.name, res.link, res.likes, true);
    cardsSection.addItem(cardItem);
    popup.close();
  });
}

function handleSubmitFormDeleteCard(card, cardId) {
  api.deleteCard(cardId).then(function (res) {
    card.deleteElement();
  });
}
/******/ })()
;