/*
 * UiManager
 * Manage menu and GUI integration using HTML tags
 * Causes a state change in the game: GameState.StartGameplay inside function "createUIMainMenu" & "createUIEndGame"
 */

import * as RE from 'rogue-engine';
import StyleDeclarations from './GameUtils/StyleDeclarations';
import GameStateController, { GameState } from './GameUtils/GameStateController';
import GameData from './GameData.re';
import WindowUtils from './GameUtils/WindowUtils';

const { Prop } = RE;


export default class UiManager extends RE.Component {

  // Public component fields
  @Prop("Boolean") playOnAwake: boolean = true;
  @Prop("String") title: string = "my game name";

  // Game dependencies
  gameData: GameData;

  // Private vars
  private uiContainer: HTMLElement;

  private startGameUI: HTMLElement;
  private gameTitle: HTMLElement;
  private playBtn: HTMLElement;

  private playGameUI: HTMLElement;
  private scoreUICpu: HTMLElement;
  private scoreUIPlayer: HTMLElement;
  private pauseGameBtn: HTMLElement;
  //private bestscoreUIPlayer: HTMLElement;

  private endGameUI: HTMLElement;
  private endscoreUIPlayer: HTMLElement;
  //private endBestscoreUIPlayer: HTMLElement;
  private replayBtn: HTMLElement;

  private pauseGameUI: HTMLElement;
  private resumeBtn: HTMLElement;
  private quitGameBtn: HTMLElement;

  awake() {

    this.gameData = RE.getComponent(GameData) as GameData;
    this.createMainContainer();
    this.createUIMainMenu();
    this.createUIGamePlay();
    this.createUIEndGame();
    this.createUIPauseGame();

  }

  start() {
    if (this.playOnAwake) {
      this.showUIMainMenu();
    }

  }

  createMainContainer() {

    this.uiContainer = WindowUtils.getRogueCanvas();
    const myCss = document.createElement("style");
    myCss.innerHTML = StyleDeclarations.mainFont;
    this.uiContainer.appendChild(myCss);
  }

  createUIMainMenu() {

    this.startGameUI = document.createElement("div");
    this.startGameUI.style.cssText = StyleDeclarations.startGameContainer;

    this.gameTitle = document.createElement("h1");
    this.gameTitle.style.cssText = StyleDeclarations.gameTitle;
    this.gameTitle.textContent = this.title;

    this.playBtn = document.createElement("h2");
    this.playBtn.style.cssText = StyleDeclarations.playBtn;
    this.playBtn.textContent = "Play!";

    this.playBtn.addEventListener(WindowUtils.clickEventName, () => {
      this.hideUIMainMenu();
      this.showUIGamePlay();
      GameStateController.changeState(GameState.StartGameplay);
    });

    this.startGameUI.appendChild(this.gameTitle);
    this.startGameUI.appendChild(this.playBtn);

    this.uiContainer.appendChild(this.startGameUI);
  }

  createUIGamePlay() {

    this.playGameUI = document.createElement("div");
    this.playGameUI.style.cssText = StyleDeclarations.playGameContainer;

    this.scoreUICpu = document.createElement("div");
    this.scoreUICpu.textContent = "0";
    this.scoreUICpu.style.cssText = StyleDeclarations.score;

    this.scoreUIPlayer = document.createElement("div");
    this.scoreUIPlayer.textContent = "0";
    this.scoreUIPlayer.style.cssText = StyleDeclarations.score;

    this.pauseGameBtn = document.createElement("BUTTON");
    this.pauseGameBtn.textContent = "| |";
    this.pauseGameBtn.style.cssText = StyleDeclarations.pauseGameBtn;

    this.pauseGameBtn.addEventListener(WindowUtils.clickEventName, () => {
      RE.Runtime.pause();
      this.showUIPauseGame();
      GameStateController.changeState(GameState.Pause);
    });


    this.playGameUI.appendChild(this.scoreUICpu);
    this.playGameUI.appendChild(this.scoreUIPlayer);
    this.playGameUI.appendChild(this.pauseGameBtn);

    this.uiContainer.appendChild(this.playGameUI);

  }

  createUIEndGame() {

    this.endGameUI = document.createElement("div");
    this.endGameUI.style.cssText = StyleDeclarations.endGameContainer;

    this.endscoreUIPlayer = document.createElement("div");
    this.endscoreUIPlayer.textContent = "";
    this.endscoreUIPlayer.style.cssText = StyleDeclarations.endScore;
    /*
        this.endBestscoreUIPlayer = document.createElement("div");
        this.endBestscoreUIPlayer.textContent = "Best score 0";
        this.endBestscoreUIPlayer.style.cssText = StyleDeclarations.endBestScore;
    */
    this.replayBtn = document.createElement("h2");
    this.replayBtn.style.cssText = StyleDeclarations.replayBtn;
    this.replayBtn.textContent = "Play again!";

    this.replayBtn.addEventListener(WindowUtils.clickEventName, () => {
      this.hideUIEndGame();
      this.showUIGamePlay();
      GameStateController.changeState(GameState.StartGameplay);
    });

    this.endGameUI.appendChild(this.endscoreUIPlayer);
    //  this.endGameUI.appendChild(this.endBestscoreUIPlayer);
    this.endGameUI.appendChild(this.replayBtn);


    this.uiContainer.appendChild(this.endGameUI);

  }

  createUIPauseGame() {

    this.pauseGameUI = document.createElement("div");
    this.pauseGameUI.style.cssText = StyleDeclarations.pauseGameContainer;

    this.resumeBtn = document.createElement("h2");
    this.resumeBtn.style.cssText = StyleDeclarations.resumeBtn;
    this.resumeBtn.textContent = "Resume";
    

    this.resumeBtn.addEventListener(WindowUtils.clickEventName, () => {
      this.hideUIPauseGame();
      RE.Runtime.resume();
      GameStateController.changeState(GameState.StartGameplay);
    });

    this.quitGameBtn = document.createElement("h2");
    this.quitGameBtn.style.cssText = StyleDeclarations.quitGameBtn;
    this.quitGameBtn.textContent = "Quit";

    this.quitGameBtn.addEventListener(WindowUtils.clickEventName, () => {
      this.hideUIPauseGame();
      this.showUIMainMenu();
      RE.Runtime.resume();
      GameStateController.changeState(GameState.MainMenu);
    });
    

    this.pauseGameUI.appendChild(this.resumeBtn);
    this.pauseGameUI.appendChild(this.quitGameBtn);
   
    this.uiContainer.appendChild(this.pauseGameUI);

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
    //this.endBestscoreUIPlayer.textContent = Calcular!!
    this.endGameUI.style.display = "flex";
  }

  hideUIEndGame() {
    this.endGameUI.style.display = "none";
  }

  showUIPauseGame() {
    this.pauseGameUI.style.display = "flex";
  }

  hideUIPauseGame() {
    this.pauseGameUI.style.display = "none";
  }

  setScoreUI(player: string, amount: Number) {
    if (player == "user") {
      this.scoreUIPlayer.textContent = amount.toString();
    } else if (player == "cpu") {
      this.scoreUICpu.textContent = amount.toString();
    }
  }

  switchToGameplayUI() {
    this.hideUIMainMenu();
    this.showUIGamePlay();
    GameStateController.changeState(GameState.StartGameplay);
  }

}


RE.registerComponent(UiManager);
