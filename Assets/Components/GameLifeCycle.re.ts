/*
 * GameLifeCycle
 * Manage the life cycle of the game. 
 * Is a global manager but not intended to be a god-object, valid for casual games with a single screen. 
 * Not intended to be a game-pattern design!
 */

import * as RE from 'rogue-engine';
import GSC, { GameState } from './GameUtils/GameStateController';
import UiManager from './UiManager.re';
import GameData from './GameData.re';
import PlayAudioClip from './PlayAudioClip';

const { Prop } = RE;

export default class GameLifeCycle extends RE.Component implements GSC {

  // Public component fields
  @Prop("Number") matchPoints: Number = 3;

  // Game dependencies
  uiManager: UiManager;
  gameData: GameData;
  playAudioClipGameOver: PlayAudioClip;

  awake() {

    this.uiManager = RE.getComponent(UiManager) as UiManager;
    this.gameData = RE.getComponentByName("GameData", this.object3d) as GameData;
    this.playAudioClipGameOver = RE.getComponentByName("AudioGameOver", this.object3d) as PlayAudioClip;

    GSC.onChangeGameState((state) => {

      if (state.new == GameState.EndGameplay) { // If any component (in this case BallController) tells us that the game has ended

        let userScore: number = 0;
        let cpuScore: number = 0;

        // userData is an object sent with additional information. 
        // In this case, tell us who has scored a point
        if (state.userData.whoScored == "user") {

          userScore = this.gameData.addScoreUser(1);
          this.uiManager.setScoreUI(state.userData.whoScored, userScore);

        } else if (state.userData.whoScored == "cpu") {

          cpuScore = this.gameData.addScoreCpu(1);
          this.uiManager.setScoreUI(state.userData.whoScored, cpuScore);

        }

        // Some player has reached the match points?
        if (this.matchPoints == userScore || this.matchPoints == cpuScore) {
          GSC.changeState(GameState.ScoreMenu);
          this.switchToScoreMenu();

        } else { // No player has reached match points. Get back in the game!
          setTimeout(() => {
            GSC.changeState(GameState.StartGameplay);
          }, 1000);
        }

      }

    });
  }

  start() {
    GSC.changeState(GameState.MainMenu);
  }

  pauseGame() {
    // Not implemented
  }

  switchToScoreMenu() {
    this.uiManager.hideUIGamePlay();
    this.uiManager.showUIEndGame();
    this.playAudioClipGameOver.play();
  }

}


RE.registerComponent(GameLifeCycle);
