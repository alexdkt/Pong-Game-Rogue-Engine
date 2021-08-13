/*
 * BallController
 * Manage ball movement and collisions
 * Causes a state change in the game: GameState.EndGameplay inside function "setPlayerPoint"
 */

import * as RE from 'rogue-engine';
import { Frustum, Matrix4, Vector2, Vector3 } from 'three';
import Collider from './Collider.re';
import GameStateController, { GameState } from './GameUtils/GameStateController';
import PlayAudioClip from './PlayAudioClip';

const { Prop } = RE;

export default class BallController extends RE.Component {

  // Public component fields
  @Prop("Number") averageSpeed: number;
  @Prop("Number") safeDistance: number = 10;   // Max ball distance before restarting the game

  // Game dependencies
  ballCollider: Collider;
  playAudioClipPlayer: PlayAudioClip;
  playAudioClipWall: PlayAudioClip;

  // Private variables
  private direction: Vector3;
  private initPosition: Vector2 = new Vector2(0, 0);
  private isPlaying: Boolean = false;

  awake() {

    this.ballCollider = RE.getComponentByName("Collider", this.object3d) as Collider;
    this.playAudioClipPlayer = RE.getComponentByName("AudioHitPlayer", this.object3d) as PlayAudioClip;
    this.playAudioClipWall = RE.getComponentByName("AudioHitWall", this.object3d) as PlayAudioClip;

    // Callback to detect game-state changes:
    GameStateController.onChangeGameState((state) => {

      if (state.new == GameState.StartGameplay) {

        // Gameplay starts! Reset ball position, direction and allow update event (isPlaying = true) 
        this.object3d.position.set(this.initPosition.x, this.initPosition.y, this.object3d.position.z);
        this.direction = new Vector3(0.7, Math.random(), 0);  // x: speed, y: direction
        this.isPlaying = true;

      } else if (state.new == GameState.EndGameplay) {

        // Gameplay ends! Disable Update method
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
    this.object3d.translateOnAxis(this.direction, RE.Runtime.deltaTime * this.averageSpeed);
  }


  checkIfBallIsInField() {

    // We simply check if ball.x is greater than the size of the field (safeDistance)
    // For more complex situations, camera movements, etc., a Frustum should be created to check when the ball is outside camera view.

    let posX = this.object3d.position.x;

    if (posX > this.safeDistance) {

      this.setPlayerPoint({ whoScored: "cpu" });

    } else if (posX < - this.safeDistance) {

      this.setPlayerPoint({ whoScored: "user" });

    }

  }

  setPlayerPoint(pointData: any) {

    if (!this.isPlaying)
      return;

    this.isPlaying = false;

    // Send new change game state to notify all components
    GameStateController.changeState(GameState.EndGameplay, pointData);
  }

  // Create the bounce of the ball. Ideally, we should calculate the reflected angle of the incident,
  // for simplicity, as colliders are straight surfaces, we just invert the direction coordinate
  detectCollisions() {

    if (!this.ballCollider) return;

    this.ballCollider.onCollisionEnter(collider => {

      if (collider.tag === this.ballCollider.tag) return;

      if (collider.tag == "Wall") {   // Reverse Y-axis direction when ball hits the walls
        this.direction.y *= -1;
        this.playAudioClipWall.play();
      }

      if (collider.tag == "Player") {    // Reverse X-axis direction when it hits the players

        // We slightly modify the direction of the bounce with a random factor (It's more fun!).

        var rndX = Math.random() * 0.7; // Random clampled in 0-0.5 range
        var rndY = Math.random() * 0.3; // Random clampled in 0-0.3 range

        // Reverse X direction and apply random factor
        this.direction.x = (this.direction.x > 0) ? (-1 - rndX) : (1 + rndX);

        // Y-axis does not have to be reversed, just apply random factor. 
        this.direction.y += rndY;

        this.playAudioClipPlayer.play();
      }
    });
  }

}

RE.registerComponent(BallController);
