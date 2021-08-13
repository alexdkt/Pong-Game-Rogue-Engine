(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rogue-engine"), require("three"));
	else if(typeof define === 'function' && define.amd)
		define(["rogue-engine", "three"], factory);
	else if(typeof exports === 'object')
		exports["rogue-engine-user-scripts"] = factory(require("rogue-engine"), require("three"));
	else
		root["rogue-engine-user-scripts"] = factory(root["rogue-engine"], root["three"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_rogue_engine__, __WEBPACK_EXTERNAL_MODULE_three__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Assets/Components/BallController.re.ts":
/*!************************************************!*\
  !*** ./Assets/Components/BallController.re.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BallController)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameUtils/GameStateController */ "./Assets/Components/GameUtils/GameStateController.ts");
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};



const { Prop } = rogue_engine__WEBPACK_IMPORTED_MODULE_0__;
class BallController extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.safeDistance = 10;
    this.initPosition = new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(0, 0);
    this.isPlaying = false;
  }
  awake() {
    this.ballCollider = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.getComponentByName("Collider", this.object3d);
    this.playAudioClipPlayer = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.getComponentByName("AudioHitPlayer", this.object3d);
    this.playAudioClipWall = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.getComponentByName("AudioHitWall", this.object3d);
    _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.default.onChangeGameState((state) => {
      if (state.new == _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.StartGameplay) {
        this.object3d.position.set(this.initPosition.x, this.initPosition.y, this.object3d.position.z);
        this.direction = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0.7, Math.random(), 0);
        this.isPlaying = true;
      } else if (state.new == _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.EndGameplay) {
        this.isPlaying = false;
      }
    });
  }
  start() {
    this.detectCollisions();
    this.initPosition.set(this.object3d.position.x, this.object3d.position.y);
  }
  update() {
    if (!this.isPlaying)
      return;
    this.moveBall();
    this.checkIfBallIsInField();
  }
  moveBall() {
    this.object3d.translateOnAxis(this.direction, rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Runtime.deltaTime * this.averageSpeed);
  }
  checkIfBallIsInField() {
    let posX = this.object3d.position.x;
    if (posX > this.safeDistance) {
      this.setPlayerPoint({ whoScored: "cpu" });
    } else if (posX < -this.safeDistance) {
      this.setPlayerPoint({ whoScored: "user" });
    }
  }
  setPlayerPoint(pointData) {
    if (!this.isPlaying)
      return;
    this.isPlaying = false;
    _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.default.changeState(_GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.EndGameplay, pointData);
  }
  detectCollisions() {
    if (!this.ballCollider)
      return;
    this.ballCollider.onCollisionEnter((collider) => {
      if (collider.tag === this.ballCollider.tag)
        return;
      if (collider.tag == "Wall") {
        this.direction.y *= -1;
        this.playAudioClipWall.play();
      }
      if (collider.tag == "Player") {
        var rndX = Math.random() * 0.7;
        var rndY = Math.random() * 0.3;
        this.direction.x = this.direction.x > 0 ? -1 - rndX : 1 + rndX;
        this.direction.y += rndY;
        this.playAudioClipPlayer.play();
      }
    });
  }
}
__name(BallController, "BallController");
__decorateClass([
  Prop("Number")
], BallController.prototype, "averageSpeed", 2);
__decorateClass([
  Prop("Number")
], BallController.prototype, "safeDistance", 2);
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(BallController);


/***/ }),

/***/ "./Assets/Components/Collider.re.ts":
/*!******************************************!*\
  !*** ./Assets/Components/Collider.re.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Collider)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};


const { Prop } = rogue_engine__WEBPACK_IMPORTED_MODULE_0__;
const _Collider = class extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.isStatic = true;
    this.collidingWith = [];
    this.collisionsThisFrame = [];
    this.onCollisionEnterCallbacks = [];
    this.onCollisionStayCallbacks = [];
    this.onCollisionExitCallbacks = [];
  }
  awake() {
    this.calculateCollisionPoints(this.object3d);
  }
  afterUpdate() {
    this.detectCollisions();
    this.detectEndedCollisions();
  }
  onCollisionEnter(callback) {
    this.onCollisionEnterCallbacks.push(callback);
  }
  onCollisionStay(callback) {
    this.onCollisionStayCallbacks.push(callback);
  }
  onCollisionExit(callback) {
    this.onCollisionExitCallbacks.push(callback);
  }
  calculateCollisionPoints(object) {
    const bbox = new three__WEBPACK_IMPORTED_MODULE_1__.Box3().setFromObject(object);
    this.bounds = {
      xMin: bbox.min.x,
      xMax: bbox.max.x,
      yMin: bbox.min.y,
      yMax: bbox.max.y
    };
  }
  iterateComponents(callbak) {
    if (!rogue_engine__WEBPACK_IMPORTED_MODULE_0__.components)
      return;
    for (let objectUUID in rogue_engine__WEBPACK_IMPORTED_MODULE_0__.components) {
      const objectComponents = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.components[objectUUID];
      if (!objectComponents)
        return;
      for (let i = 0; i < objectComponents.length; i++) {
        const component = objectComponents[i];
        callbak(component);
      }
    }
  }
  detectCollisions() {
    this.collisionsThisFrame = [];
    this.calculateCollisionPoints(this.object3d);
    if (!this.bounds)
      return;
    this.iterateComponents((component) => {
      if (component instanceof _Collider) {
        if (!component.bounds || component === this)
          return;
        if (this.bounds.xMin <= component.bounds.xMax && this.bounds.xMax >= component.bounds.xMin && this.bounds.yMin <= component.bounds.yMax && this.bounds.yMax >= component.bounds.yMin) {
          this.collisionsThisFrame.push(component);
          const isEnter = this.collidingWith.find((collider) => collider === component) === void 0;
          this.runCollisionCallbacks(component, isEnter);
          if (!this.isStatic) {
            this.pushBackFromCollidingObject(component);
          }
        }
      }
    });
  }
  detectEndedCollisions() {
    const endedCollisions = [];
    for (let i = 0; i < this.collidingWith.length; i++) {
      const currentCollider = this.collidingWith[i];
      if (this.collisionsThisFrame.find((collider) => collider === currentCollider) === void 0) {
        endedCollisions.push(currentCollider);
      }
    }
    for (let i = 0; i < endedCollisions.length; i++) {
      let collider = endedCollisions[i];
      this.collidingWith.splice(this.collidingWith.indexOf(collider), 1);
      for (const callback of this.onCollisionExitCallbacks) {
        callback(collider);
      }
    }
  }
  runCollisionCallbacks(collider, isEnter) {
    if (isEnter) {
      for (const callback of this.onCollisionEnterCallbacks) {
        callback(collider);
      }
      this.collidingWith.push(collider);
    }
    for (const callback of this.onCollisionStayCallbacks) {
      callback(collider);
    }
  }
  pushBackFromCollidingObject(collider) {
    let thisCenterZ;
    if (this.bounds.xMin <= collider.bounds.xMax && this.bounds.xMax >= collider.bounds.xMin) {
      const objectCenterX = (collider.bounds.xMax - collider.bounds.xMin) / 2 + collider.bounds.xMin;
      const thisCenterX = (this.bounds.xMax - this.bounds.xMin) / 2 + this.bounds.xMin;
      if (objectCenterX > thisCenterX) {
        this.object3d.position.x -= 1;
      } else {
        this.object3d.position.x += 1;
      }
    }
  }
};
let Collider = _Collider;
__name(Collider, "Collider");
__decorateClass([
  Prop("String")
], Collider.prototype, "tag", 2);
__decorateClass([
  Prop("Boolean")
], Collider.prototype, "isStatic", 2);

rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(Collider);


/***/ }),

/***/ "./Assets/Components/GameData.re.ts":
/*!******************************************!*\
  !*** ./Assets/Components/GameData.re.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameData)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameUtils/GameStateController */ "./Assets/Components/GameUtils/GameStateController.ts");
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });


class GameData extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this._scoreUser = 0;
    this._scoreCpu = 0;
    this._bestScore = 0;
  }
  get scoreUser() {
    return this._scoreUser;
  }
  get scoreCpu() {
    return this._scoreCpu;
  }
  get bestScore() {
    return this._bestScore;
  }
  addScoreUser(amount) {
    this._scoreUser += amount;
    return this._scoreUser;
  }
  addScoreCpu(amount) {
    this._scoreCpu += amount;
    return this._scoreCpu;
  }
  awake() {
    _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.default.onChangeGameState((state) => {
      if (state.new == _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.GameState.StartGameplay && state.old == _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.GameState.ScoreMenu) {
        this._scoreUser = 0;
        this._scoreCpu = 0;
      }
    });
  }
}
__name(GameData, "GameData");
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(GameData);


/***/ }),

/***/ "./Assets/Components/GameLifeCycle.re.ts":
/*!***********************************************!*\
  !*** ./Assets/Components/GameLifeCycle.re.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameLifeCycle)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameUtils/GameStateController */ "./Assets/Components/GameUtils/GameStateController.ts");
/* harmony import */ var _UiManager_re__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UiManager.re */ "./Assets/Components/UiManager.re.ts");
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};



const { Prop } = rogue_engine__WEBPACK_IMPORTED_MODULE_0__;
class GameLifeCycle extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.matchPoints = 3;
  }
  awake() {
    this.uiManager = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.getComponent(_UiManager_re__WEBPACK_IMPORTED_MODULE_2__.default);
    this.gameData = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.getComponentByName("GameData", this.object3d);
    this.playAudioClipGameOver = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.getComponentByName("AudioGameOver", this.object3d);
    _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.default.onChangeGameState((state) => {
      if (state.new == _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.GameState.EndGameplay) {
        let userScore = 0;
        let cpuScore = 0;
        if (state.userData.whoScored == "user") {
          userScore = this.gameData.addScoreUser(1);
          this.uiManager.setScoreUI(state.userData.whoScored, userScore);
        } else if (state.userData.whoScored == "cpu") {
          cpuScore = this.gameData.addScoreCpu(1);
          this.uiManager.setScoreUI(state.userData.whoScored, cpuScore);
        }
        if (this.matchPoints == userScore || this.matchPoints == cpuScore) {
          _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.default.changeState(_GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.GameState.ScoreMenu);
          this.switchToScoreMenu();
        } else {
          setTimeout(() => {
            _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.default.changeState(_GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.GameState.StartGameplay);
          }, 1e3);
        }
      }
    });
  }
  start() {
    _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.default.changeState(_GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_1__.GameState.MainMenu);
  }
  pauseGame() {
  }
  switchToScoreMenu() {
    this.uiManager.hideUIGamePlay();
    this.uiManager.showUIEndGame();
    this.playAudioClipGameOver.play();
  }
}
__name(GameLifeCycle, "GameLifeCycle");
__decorateClass([
  Prop("Number")
], GameLifeCycle.prototype, "matchPoints", 2);
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(GameLifeCycle);


/***/ }),

/***/ "./Assets/Components/GameUtils/GameStateController.ts":
/*!************************************************************!*\
  !*** ./Assets/Components/GameUtils/GameStateController.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameState": () => (/* binding */ GameState),
/* harmony export */   "default": () => (/* binding */ GameStateController)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var GameState;
(function(GameState2) {
  GameState2[GameState2["None"] = 0] = "None";
  GameState2[GameState2["Loading"] = 1] = "Loading";
  GameState2[GameState2["MainMenu"] = 2] = "MainMenu";
  GameState2[GameState2["StartGameplay"] = 3] = "StartGameplay";
  GameState2[GameState2["Pause"] = 4] = "Pause";
  GameState2[GameState2["EndGameplay"] = 5] = "EndGameplay";
  GameState2[GameState2["ScoreMenu"] = 6] = "ScoreMenu";
})(GameState || (GameState = {}));
;
class GameStateController {
  static changeState(newGameState, _userData = {}) {
    if (this.changingState) {
      this.queueGameStates.push({ newGameState, _userData });
      return;
    }
    this.changingState = true;
    console.log("Attempting change game state from " + GameState[this.gameState] + " to " + GameState[newGameState]);
    for (let i = 0; i < this.changeGameStateCb.length; i++) {
      this.changeGameStateCb[i]({
        old: this.gameState,
        new: newGameState,
        userData: _userData
      });
    }
    this.gameState = newGameState;
    this.changingState = false;
    if (this.queueGameStates.length > 0) {
      var gameStateChangeRequest = this.queueGameStates.shift();
      this.changeState(gameStateChangeRequest.newGameState, gameStateChangeRequest._userData);
    }
  }
  static onChangeGameState(cb) {
    this.changeGameStateCb.push(cb);
  }
}
__name(GameStateController, "GameStateController");
GameStateController.gameState = 0;
GameStateController.changeGameStateCb = [];
GameStateController.queueGameStates = [];
GameStateController.changingState = false;


/***/ }),

/***/ "./Assets/Components/GameUtils/StyleDeclarations.ts":
/*!**********************************************************!*\
  !*** ./Assets/Components/GameUtils/StyleDeclarations.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StyleDeclarations)
/* harmony export */ });
/* harmony import */ var _WindowUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WindowUtils */ "./Assets/Components/GameUtils/WindowUtils.ts");
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

class StyleDeclarations {
}
__name(StyleDeclarations, "StyleDeclarations");
StyleDeclarations.mainFont = "@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap')";
StyleDeclarations.startGameContainer = "margin: auto;height: 100%;display: none;background-color: rgba(0, 0, 0, 0.7);align-content: space-around;justify-content: center;flex-wrap: wrap;flex-direction: column;align-items: center;font-family: 'Press Start 2P', cursive;";
StyleDeclarations.playGameContainer = !_WindowUtils__WEBPACK_IMPORTED_MODULE_0__.default.isPortrait() ? "margin: auto;height: 100%;display: none;background-color: transparent;place-content: space-around center;flex-flow: column wrap;align-items: flex-start;align-content: flex-start;flex-wrap: nowrap;flex-direction: row;justify-content: space-evenly;font-family: 'Press Start 2P', cursive;" : "margin: auto;height: 80%;display: flex;background-color: transparent;align-items: flex-start;place-content: flex-start space-evenly;flex-flow: row nowrap;font-family: 'Press Start 2P', cursive;flex-direction: column;";
StyleDeclarations.endGameContainer = "margin: auto;height: 100%;display: none;background-color: rgba(0, 0, 0, 0.7);;align-content: space-around;justify-content: center;flex-wrap: wrap;flex-direction: column;align-items: center;font-family: 'Press Start 2P', cursive;";
StyleDeclarations.gameTitle = "color: white; text-align: center;";
StyleDeclarations.playBtn = "cursor: pointer; color: white; position: relative; text-align: center;";
StyleDeclarations.score = "float:left;textAlign:center;font-size: 30px;margin:10px;lineHeight:50px;justify-content: top;color:white;display:flex;";
StyleDeclarations.bestScore = "float:left;textAlign:center;margin:10px;lineHeight:30px;color:white;display:flex;";
StyleDeclarations.endScore = "float:left;textAlign:center;margin:10px;lineHeight:30px;color:white;display:flex;";
StyleDeclarations.endBestScore = "float:left;textAlign:center;margin:50px;lineHeight:30px;color:white;display:flex;";
StyleDeclarations.replayBtn = "cursor: pointer; color: white; position: relative;display:flex;";


/***/ }),

/***/ "./Assets/Components/GameUtils/WindowUtils.ts":
/*!****************************************************!*\
  !*** ./Assets/Components/GameUtils/WindowUtils.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WindowUtils)
/* harmony export */ });
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const _WindowUtils = class {
  static onResizeComplete(cb) {
    this.onResizeCompleteCb.push(cb);
    if (this.onResizeCompleteCb.length == 1) {
      window.addEventListener("resize", () => {
        this.rtime = new Date();
        if (this.timeout === false) {
          this.timeout = true;
          setTimeout(() => {
            this.resizeend();
          }, this.delta);
        }
      });
    }
  }
  static resizeend() {
    const newTime = new Date();
    const diff = newTime.getTime() - this.rtime.getTime();
    if (diff < this.delta) {
      setTimeout(() => {
        this.resizeend();
      }, this.delta);
    } else {
      this.timeout = false;
      for (let i = 0; i < this.onResizeCompleteCb.length; i++) {
        this.onResizeCompleteCb[i]();
      }
    }
  }
  static isPortrait() {
    return window.innerWidth <= window.innerHeight;
  }
  static isLandscape() {
    return window.innerWidth > window.innerHeight;
  }
  static isMobile() {
    let check = false;
    (function(a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        check = true;
    })(navigator.userAgent || navigator.vendor);
    return check;
  }
  static getRogueCanvas() {
    return document.getElementById("rogue-ui");
  }
  static getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }
  static getClickEventName() {
    return _WindowUtils.isMobile() ? "touchstart" : "click";
  }
};
let WindowUtils = _WindowUtils;
__name(WindowUtils, "WindowUtils");
WindowUtils.clickEventName = _WindowUtils.isMobile() ? "touchstart" : "click";
WindowUtils.timeout = false;
WindowUtils.delta = 600;
WindowUtils.onResizeCompleteCb = [];



/***/ }),

/***/ "./Assets/Components/InputController.re.ts":
/*!*************************************************!*\
  !*** ./Assets/Components/InputController.re.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputController)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameUtils/GameStateController */ "./Assets/Components/GameUtils/GameStateController.ts");
/* harmony import */ var _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameUtils/WindowUtils */ "./Assets/Components/GameUtils/WindowUtils.ts");
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};




const { Prop } = rogue_engine__WEBPACK_IMPORTED_MODULE_0__;
class InputController extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.moveX = false;
    this.moveY = true;
    this.target = new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(0, 0);
  }
  awake() {
    _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.default.onChangeGameState((e) => {
      if (e.new == _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.StartGameplay) {
        this.isPlaying = true;
      } else if (e.new == _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.EndGameplay) {
        this.isPlaying = false;
      }
    });
    this.useTouches = _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_3__.default.isMobile();
  }
  start() {
    this.raycaster = new three__WEBPACK_IMPORTED_MODULE_1__.Raycaster();
    this.divContainer = _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_3__.default.getRogueCanvas();
    ;
    this.rect = this.divContainer.getBoundingClientRect();
    _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_3__.default.onResizeComplete(() => {
      this.resizeWindowRect();
    });
  }
  resizeWindowRect() {
    this.rect = this.divContainer.getBoundingClientRect();
  }
  update() {
    if (!this.isPlaying)
      return;
    this.handleInput();
  }
  handleInput() {
    let inputX, inputY;
    if (this.useTouches) {
      var touches = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Input.touch.touches;
      if (!touches || touches.length == 0) {
        return;
      }
      inputX = touches[0].x;
      inputY = touches[0].y;
    } else {
      inputX = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Input.mouse.x;
      inputY = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Input.mouse.y;
    }
    this.target.set((inputX - this.rect.left) / this.rect.width * 2 - 1, -((inputY - this.rect.top) / this.rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.target, rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Runtime.camera);
    let origin = this.raycaster.ray.origin;
    if (this.moveX)
      this.object3d.position.x = origin.x;
    if (this.moveY)
      this.object3d.position.y = origin.y;
  }
}
__name(InputController, "InputController");
__decorateClass([
  Prop("Boolean")
], InputController.prototype, "moveX", 2);
__decorateClass([
  Prop("Boolean")
], InputController.prototype, "moveY", 2);
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(InputController);


/***/ }),

/***/ "./Assets/Components/PlayAudioClip.ts":
/*!********************************************!*\
  !*** ./Assets/Components/PlayAudioClip.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayAudioClip)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

const { Prop } = rogue_engine__WEBPACK_IMPORTED_MODULE_0__;
class PlayAudioClip extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.volume = 1;
    this.playOnAwake = true;
    this.loop = false;
    this.muted = false;
  }
  start() {
    this.clip.setVolume(this.volume);
    this.clip.setLoop(this.loop);
    if (this.playOnAwake && !this.muted)
      this.clip && this.clip.play();
  }
  play() {
    if (!this.muted)
      this.clip && this.clip.play();
  }
}
__name(PlayAudioClip, "PlayAudioClip");
__decorateClass([
  Prop("Audio")
], PlayAudioClip.prototype, "clip", 2);
__decorateClass([
  Prop("Number")
], PlayAudioClip.prototype, "volume", 2);
__decorateClass([
  Prop("Boolean")
], PlayAudioClip.prototype, "playOnAwake", 2);
__decorateClass([
  Prop("Boolean")
], PlayAudioClip.prototype, "loop", 2);
__decorateClass([
  Prop("Boolean")
], PlayAudioClip.prototype, "muted", 2);
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(PlayAudioClip);


/***/ }),

/***/ "./Assets/Components/PlayerCpuAI.re.ts":
/*!*********************************************!*\
  !*** ./Assets/Components/PlayerCpuAI.re.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayerCpuAI)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameUtils/GameStateController */ "./Assets/Components/GameUtils/GameStateController.ts");
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};



const { Prop } = rogue_engine__WEBPACK_IMPORTED_MODULE_0__;
class PlayerCpuAI extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.responseSpeed = 1;
    this.initPosition = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
  }
  awake() {
    _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.default.onChangeGameState((e) => {
      if (e.new == _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.StartGameplay) {
        this.object3d.position.set(this.initPosition.x, this.initPosition.y, this.initPosition.z);
      }
    });
  }
  start() {
    this.initPosition = this.object3d.position;
  }
  update() {
    this.object3d.position.y = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.lerp(this.object3d.position.y, this.ball.position.y, this.responseSpeed);
  }
}
__name(PlayerCpuAI, "PlayerCpuAI");
__decorateClass([
  Prop("Object3D")
], PlayerCpuAI.prototype, "ball", 2);
__decorateClass([
  Prop("Number")
], PlayerCpuAI.prototype, "responseSpeed", 2);
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(PlayerCpuAI);


/***/ }),

/***/ "./Assets/Components/PlayerUser.re.ts":
/*!********************************************!*\
  !*** ./Assets/Components/PlayerUser.re.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayerUser)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameUtils/GameStateController */ "./Assets/Components/GameUtils/GameStateController.ts");
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });



class PlayerUser extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.initPosition = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
  }
  awake() {
    _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.default.onChangeGameState((e) => {
      if (e.new == _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.StartGameplay) {
        this.object3d.position.set(this.initPosition.x, this.initPosition.y, this.initPosition.z);
      }
    });
  }
  start() {
    this.initPosition = this.object3d.position;
  }
}
__name(PlayerUser, "PlayerUser");
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(PlayerUser);


/***/ }),

/***/ "./Assets/Components/ResponsiveCamera.re.ts":
/*!**************************************************!*\
  !*** ./Assets/Components/ResponsiveCamera.re.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResponsiveCamera)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameUtils/WindowUtils */ "./Assets/Components/GameUtils/WindowUtils.ts");
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};



const { Prop } = rogue_engine__WEBPACK_IMPORTED_MODULE_0__;
class ResponsiveCamera extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.zoomOffset = 0.9;
    this.isWindowPortrait = false;
    this.objBoundingBox = new three__WEBPACK_IMPORTED_MODULE_1__.Box3();
    this.objCenter = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
    this.objSize = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
  }
  awake() {
    this.camera = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Runtime.camera;
  }
  start() {
    this.calcObjectBounds();
    window.addEventListener("load", (event) => {
      this.handleWindowScreen();
    });
    _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_2__.default.onResizeComplete(() => {
      this.handleWindowScreen();
    });
  }
  calcObjectBounds() {
    this.objBoundingBox.setFromObject(this.target);
    this.objBoundingBox.getCenter(this.objCenter);
    this.objBoundingBox.getSize(this.objSize);
  }
  handleWindowScreen() {
    this.handleOrientation();
    this.handleScreenSize();
    this.handleDevice();
    this.camera.updateProjectionMatrix();
  }
  handleScreenSize() {
    var sizeFieldInCamY = this.objSize.y * 0.1;
    var sizeFieldInCamX = this.objSize.x * 0.1;
    var aspect = _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_2__.default.getAspectRatio();
    if (!this.isWindowPortrait) {
      if (1 / aspect < sizeFieldInCamY) {
        this.camera.zoom = this.zoomOffset * sizeFieldInCamY * 2 / aspect;
      } else {
        this.camera.zoom = this.zoomOffset / sizeFieldInCamX;
      }
    } else {
      if (aspect > sizeFieldInCamY) {
        this.camera.zoom = this.zoomOffset / sizeFieldInCamX / aspect;
      } else {
        this.camera.zoom = this.zoomOffset * sizeFieldInCamY * 2;
      }
    }
  }
  handleDevice() {
    this.camera.position.x = _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_2__.default.isMobile() ? 1.5 : 0;
  }
  handleOrientation() {
    if (!this.isWindowPortrait && _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_2__.default.isPortrait()) {
      this.camera.rotation.z = three__WEBPACK_IMPORTED_MODULE_1__.MathUtils.degToRad(90);
      this.isWindowPortrait = true;
    }
    if (this.isWindowPortrait && !_GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_2__.default.isPortrait()) {
      this.camera.rotation.z = 0;
      this.isWindowPortrait = false;
    }
  }
}
__name(ResponsiveCamera, "ResponsiveCamera");
__decorateClass([
  Prop("Object3D")
], ResponsiveCamera.prototype, "target", 2);
__decorateClass([
  Prop("Number")
], ResponsiveCamera.prototype, "zoomOffset", 2);
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(ResponsiveCamera);


/***/ }),

/***/ "./Assets/Components/UiManager.re.ts":
/*!*******************************************!*\
  !*** ./Assets/Components/UiManager.re.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UiManager)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameUtils/StyleDeclarations */ "./Assets/Components/GameUtils/StyleDeclarations.ts");
/* harmony import */ var _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameUtils/GameStateController */ "./Assets/Components/GameUtils/GameStateController.ts");
/* harmony import */ var _GameData_re__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GameData.re */ "./Assets/Components/GameData.re.ts");
/* harmony import */ var _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GameUtils/WindowUtils */ "./Assets/Components/GameUtils/WindowUtils.ts");
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};





const { Prop } = rogue_engine__WEBPACK_IMPORTED_MODULE_0__;
class UiManager extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.playOnAwake = true;
    this.title = "my game name";
  }
  awake() {
    this.gameData = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.getComponent(_GameData_re__WEBPACK_IMPORTED_MODULE_3__.default);
    this.createMainContainer();
    this.createUIMainMenu();
    this.createUIGamePlay();
    this.createUIEndGame();
  }
  start() {
    if (this.playOnAwake) {
      this.showUIMainMenu();
    }
  }
  createMainContainer() {
    this.uiContainer = _GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_4__.default.getRogueCanvas();
    const myCss = document.createElement("style");
    myCss.innerHTML = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.mainFont;
    this.uiContainer.appendChild(myCss);
  }
  createUIMainMenu() {
    this.startGameUI = document.createElement("div");
    this.startGameUI.style.cssText = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.startGameContainer;
    this.gameTitle = document.createElement("h1");
    this.gameTitle.style.cssText = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.gameTitle;
    this.gameTitle.textContent = this.title;
    this.playBtn = document.createElement("h2");
    this.playBtn.style.cssText = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.playBtn;
    this.playBtn.textContent = "Play!";
    this.playBtn.addEventListener(_GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_4__.default.clickEventName, () => {
      this.hideUIMainMenu();
      this.showUIGamePlay();
      _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.default.changeState(_GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.StartGameplay);
    });
    this.startGameUI.appendChild(this.gameTitle);
    this.startGameUI.appendChild(this.playBtn);
    this.uiContainer.appendChild(this.startGameUI);
  }
  createUIGamePlay() {
    this.playGameUI = document.createElement("div");
    this.playGameUI.style.cssText = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.playGameContainer;
    this.scoreUICpu = document.createElement("div");
    this.scoreUICpu.textContent = "0";
    this.scoreUICpu.style.cssText = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.score;
    this.scoreUIPlayer = document.createElement("div");
    this.scoreUIPlayer.textContent = "0";
    this.scoreUIPlayer.style.cssText = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.score;
    this.playGameUI.appendChild(this.scoreUICpu);
    this.playGameUI.appendChild(this.scoreUIPlayer);
    this.uiContainer.appendChild(this.playGameUI);
  }
  createUIEndGame() {
    this.endGameUI = document.createElement("div");
    this.endGameUI.style.cssText = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.endGameContainer;
    this.endscoreUIPlayer = document.createElement("div");
    this.endscoreUIPlayer.textContent = "";
    this.endscoreUIPlayer.style.cssText = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.endScore;
    this.replayBtn = document.createElement("h2");
    this.replayBtn.style.cssText = _GameUtils_StyleDeclarations__WEBPACK_IMPORTED_MODULE_1__.default.replayBtn;
    this.replayBtn.textContent = "Play again!";
    this.replayBtn.addEventListener(_GameUtils_WindowUtils__WEBPACK_IMPORTED_MODULE_4__.default.clickEventName, () => {
      this.hideUIGEndGame();
      this.showUIGamePlay();
      _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.default.changeState(_GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.StartGameplay);
    });
    this.endGameUI.appendChild(this.endscoreUIPlayer);
    this.endGameUI.appendChild(this.replayBtn);
    this.uiContainer.appendChild(this.endGameUI);
  }
  showUIMainMenu() {
    this.startGameUI.style.display = "flex";
  }
  hideUIMainMenu() {
    this.startGameUI.style.display = "none";
  }
  showUIGamePlay() {
    this.scoreUIPlayer.textContent = "0";
    this.scoreUICpu.textContent = "0";
    this.playGameUI.style.display = "flex";
  }
  hideUIGamePlay() {
    this.playGameUI.style.display = "none";
  }
  showUIEndGame() {
    this.endscoreUIPlayer.textContent = this.gameData.scoreCpu.toString() + " - " + this.gameData.scoreUser.toString();
    this.endGameUI.style.display = "flex";
  }
  hideUIGEndGame() {
    this.endGameUI.style.display = "none";
  }
  setScoreUI(player, amount) {
    if (player == "user") {
      this.scoreUIPlayer.textContent = amount.toString();
    } else if (player == "cpu") {
      this.scoreUICpu.textContent = amount.toString();
    }
  }
  switchToGameplayUI() {
    this.hideUIMainMenu();
    this.showUIGamePlay();
    _GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.default.changeState(_GameUtils_GameStateController__WEBPACK_IMPORTED_MODULE_2__.GameState.StartGameplay);
  }
}
__name(UiManager, "UiManager");
__decorateClass([
  Prop("Boolean")
], UiManager.prototype, "playOnAwake", 2);
__decorateClass([
  Prop("String")
], UiManager.prototype, "title", 2);
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(UiManager);


/***/ }),

/***/ "rogue-engine":
/*!******************************************************************************************************************!*\
  !*** external {"commonjs":"rogue-engine","commonjs2":"rogue-engine","amd":"rogue-engine","root":"rogue-engine"} ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_rogue_engine__;

/***/ }),

/***/ "three":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"three","commonjs2":"three","amd":"three","root":"three"} ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_three__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"rogue-engine-user-scripts": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_name_"] = self["webpackChunk_name_"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./Assets/Components/BallController.re.ts");
/******/ 	__webpack_require__("./Assets/Components/Collider.re.ts");
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./Assets/Components/GameData.re.ts");
/******/ 	__webpack_require__("./Assets/Components/GameLifeCycle.re.ts");
/******/ 	__webpack_require__("./Assets/Components/GameUtils/GameStateController.ts");
/******/ 	__webpack_require__("./Assets/Components/GameUtils/StyleDeclarations.ts");
/******/ 	__webpack_require__("./Assets/Components/GameUtils/WindowUtils.ts");
/******/ 	__webpack_require__("./Assets/Components/InputController.re.ts");
/******/ 	__webpack_require__("./Assets/Components/PlayAudioClip.ts");
/******/ 	__webpack_require__("./Assets/Components/PlayerCpuAI.re.ts");
/******/ 	__webpack_require__("./Assets/Components/PlayerUser.re.ts");
/******/ 	__webpack_require__("./Assets/Components/ResponsiveCamera.re.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./Assets/Components/UiManager.re.ts");
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=rogue-engine-user-scripts.js.map