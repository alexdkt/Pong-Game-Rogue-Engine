/*
 * InputController
 * Manage user input using mouse or touches regarding the device. Only for ortographic camera
 */

import * as RE from 'rogue-engine';
import { Vector2, Raycaster } from 'three';
import GameStateController, { GameState } from './GameUtils/GameStateController';
import WindowUtils from './GameUtils/WindowUtils';

const { Prop } = RE;

export default class InputController extends RE.Component {

  // Public component fields
  @Prop("Boolean") moveX: boolean = false;
  @Prop("Boolean") moveY: boolean = true;

  // Private variables
  private raycaster: Raycaster;
  private target: Vector2 = new Vector2(0, 0);
  private divContainer: HTMLElement;
  private isPlaying: Boolean;
  private useTouches: Boolean;
  private rect: any;


  awake() {

    GameStateController.onChangeGameState((e) => {

      if (e.new == GameState.StartGameplay) {
        this.isPlaying = true;
      } else if (e.new == GameState.EndGameplay || e.new == GameState.MainMenu) {
        this.isPlaying = false;
      } 
    });

    this.useTouches = WindowUtils.isMobile();
  }

  start() {

    this.raycaster = new Raycaster();

    this.divContainer = WindowUtils.getRogueCanvas();;
    this.rect = this.divContainer.getBoundingClientRect();

    WindowUtils.onResizeComplete(() => { this.resizeWindowRect() });
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

      var touches = RE.Input.touch.touches;

      if (!touches || touches.length == 0) {
        return;
      }

      inputX = touches[0].x;
      inputY = touches[0].y;

    } else {

      inputX = RE.Input.mouse.x;
      inputY = RE.Input.mouse.y;
    }

    // calculate mouse/touch position in normalized device coordinates
    this.target.set(
      ((inputX - this.rect.left) / this.rect.width) * 2 - 1,
      -((inputY - this.rect.top) / this.rect.height) * 2 + 1
    );

    // Valid for Ortographic Camera (without distance()
    this.raycaster.setFromCamera(this.target, RE.Runtime.camera);

    let origin = this.raycaster.ray.origin;

    if (this.moveX)
      this.object3d.position.x = origin.x;

    if (this.moveY)
      this.object3d.position.y = origin.y;

  }

}

RE.registerComponent(InputController);
