/*
 * ResponsiveCamera
 * Fit object bounds into the camera.
 * Control and management of screen size and orientation.
 */

import * as RE from 'rogue-engine';
import { Box3, OrthographicCamera, Object3D, Vector2, Vector3, MathUtils } from 'three';
import WindowUtils from './GameUtils/WindowUtils';

const { Prop } = RE;

export default class ResponsiveCamera extends RE.Component {

  // Public component fields
  @Prop("Object3D") target: Object3D;
  @Prop("Number") zoomOffset: number = 0.9;

  // Game dependencies
  private camera: OrthographicCamera;

  // Private variables
  private isWindowPortrait: Boolean = false;
  private objBoundingBox: Box3 = new Box3();
  private objCenter: Vector3 = new Vector3(0, 0, 0);
  private objSize: Vector3 = new Vector3(0, 0, 0);

  awake() {
    this.camera = RE.Runtime.camera as OrthographicCamera;
  }

  start() {

    // get bounding box of object - this will be used to setup controls and camera
    this.calcObjectBounds();

    // Fire handleWindowScreen to handle screen layout when game starts. 
    // I put it inside the onload event so that the rest of the game is loaded
    window.addEventListener("load", (event) => {
      this.handleWindowScreen();
    });

    // I also add the event for when the screen size / layout is changed
    WindowUtils.onResizeComplete(() => { this.handleWindowScreen() });
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

    // Aspect ratio
    var aspect = WindowUtils.getAspectRatio();

    // Landscape
    if (!this.isWindowPortrait) {

      // As field is horizontal, in landscape take into account when SCREEN_H is 
      // smaller than the vertical size of the field
      if (1 / aspect < sizeFieldInCamY) {
        this.camera.zoom = this.zoomOffset * sizeFieldInCamY * 2 / aspect;
      } else {
        this.camera.zoom = this.zoomOffset / sizeFieldInCamX;
      }

    } else {

      // Portrait
      if (aspect > sizeFieldInCamY) {
        this.camera.zoom = this.zoomOffset / sizeFieldInCamX / aspect;
      } else {
        this.camera.zoom = this.zoomOffset * sizeFieldInCamY * 2;
      }
    }

  }

  // The layout depends on the type of device. 
  // For mobile we have to give some free space to move the fingers across the screen without covering the player
  handleDevice() {
    this.camera.position.x = (WindowUtils.isMobile()) ? 1.5 : 0;
  }


  handleOrientation() {

    // Orientation Change to portrait
    if (!this.isWindowPortrait && WindowUtils.isPortrait()) {

      // Rotate camera to fit field in portrait
      this.camera.rotation.z = MathUtils.degToRad(90);
      this.isWindowPortrait = true;

    }

    // Orientation Change to landscape
    if (this.isWindowPortrait && !WindowUtils.isPortrait()) {

      // Reset camera rotation
      this.camera.rotation.z = 0;
      this.isWindowPortrait = false;

    }
  }


}

RE.registerComponent(ResponsiveCamera);
