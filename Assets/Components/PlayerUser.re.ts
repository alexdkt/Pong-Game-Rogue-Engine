/*
 * PlayerUser
 * Manages player-user behavior (At moment just reset position)
 */

import * as RE from 'rogue-engine';
import { Vector3 } from 'three';
import GameStateController, { GameState } from './GameUtils/GameStateController';

const { Prop } = RE;

export default class PlayerUser extends RE.Component {

  // Public component fields
  @Prop("Number") maxVMovement: number = 3;           // Maximum range of vertical movement

  // Private vars:
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

  update() {

    // We easily limit the maximum vertical movement of the player:

    if (this.object3d.position.y > this.maxVMovement)
      this.object3d.position.y = this.maxVMovement;

    if (this.object3d.position.y < -this.maxVMovement)
      this.object3d.position.y = -this.maxVMovement;

  }

}

RE.registerComponent(PlayerUser);
