/*
 * PlayerUser
 * Manages player-user behavior (At moment just reset position)
 */

import * as RE from 'rogue-engine';
import { Vector3 } from 'three';
import GameStateController, { GameState } from './GameUtils/GameStateController';

export default class PlayerUser extends RE.Component {

  private initPosition: Vector3 = new Vector3(0, 0, 0);

  awake() {

    GameStateController.onChangeGameState((state) => {

      // Reset position when round ends or game is finished from pause
      if (state.new == GameState.EndGameplay || (state.new == GameState.MainMenu && state.old == GameState.Pause)) {
        this.object3d.position.set(this.initPosition.x, this.initPosition.y, this.initPosition.z);
      }
    });
  }

  start() {
    this.initPosition.copy(this.object3d.position);
  }

}

RE.registerComponent(PlayerUser);
