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

  // Private variables
  private initPosition: Vector3 = new Vector3(0, 0, 0);

  awake() {

    GameStateController.onChangeGameState((e) => {

      // Reset position when game starts
      if (e.new == GameState.StartGameplay) {
        this.object3d.position.set(this.initPosition.x, this.initPosition.y, this.initPosition.z);
      }

    });
  }

  start() {
    this.initPosition = this.object3d.position;
  }

  update() {

    // Super basic AI. Follow the ball using a lerp to adjust the speed
    this.object3d.position.y = MathUtils.lerp(this.object3d.position.y, this.ball.position.y, this.responseSpeed);

  }

}

RE.registerComponent(PlayerCpuAI);
