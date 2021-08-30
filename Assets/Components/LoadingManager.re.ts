import * as RE from 'rogue-engine';
import { DefaultLoadingManager } from 'three';

export default class LoadingManager extends RE.Component {
  
  
  awake() {
    DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

      console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    
    };
  }

  start() {

  }

  update() {

  }
}

RE.registerComponent(LoadingManager);
