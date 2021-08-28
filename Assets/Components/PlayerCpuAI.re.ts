/*
 * PlayerCpuAI
 * Manages player-cup behavior AI
 * Follows ball with simple Lerp movement
 */

import * as RE from 'rogue-engine';
import { MathUtils, Object3D, Vector3 } from 'three';
import GameStateController, { GameState } from './GameUtils/GameStateController';

const { Prop } = RE;

export default class PlayerCpuAI extends RE.Component {

  // Public component fields
  @Prop("Object3D") ball: Object3D;
  @Prop("Number") responseSpeed: number = 1;            // Player-cpu speed when following the ball
  @Prop("Number") maxVMovement: number = 3;                 // Maximum range of vertical movement

  // Private variables
  private initPosition: Vector3 = new Vector3(0, 0, 0);
  private isPlaying: Boolean = false;

  awake() {

    GameStateController.onChangeGameState((state) => {

      if (state.new == GameState.StartGameplay) {
        this.isPlaying = true;
      } else if (state.new == GameState.EndGameplay || (state.new == GameState.MainMenu && state.old == GameState.Pause)) {
        // Reset position when round ends or game is finished from pause
        this.isPlaying = false;
        this.object3d.position.copy(this.initPosition);
      }

    });
  }

  start() {
    this.initPosition.copy(this.object3d.position);
  }

  update() {

    // Super basic AI. Follow the ball using a lerp to adjust the speed
    if (this.isPlaying)
      this.object3d.position.y = MathUtils.lerp(this.object3d.position.y, this.ball.position.y, this.responseSpeed);

    
    // We easily limit the maximum vertical movement of the player:

    if (this.object3d.position.y > this.maxVMovement)
      this.object3d.position.y = this.maxVMovement;

    if (this.object3d.position.y < -this.maxVMovement)
      this.object3d.position.y = -this.maxVMovement;  

  }

}

RE.registerComponent(PlayerCpuAI);
