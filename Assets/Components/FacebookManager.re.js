import * as RE from 'rogue-engine';

export default class FacebookManager extends RE.Component {

  awake() {

    var script = document.createElement('script');

    script.onload = () => {

      FBInstant.initializeAsync()
        .then(() => {
          for (var i = 0; i < 100; i++) {
            FBInstant.setLoadingProgress(i + 1);
          }

          FBInstant.startGameAsync()
            .then(() => {
              // Retrieving context and player information can only be done
              // once startGameAsync() resolves
              var contextId = FBInstant.context.getID();
              var contextType = FBInstant.context.getType();

              var playerName = FBInstant.player.getName();
              var playerPic = FBInstant.player.getPhoto();
              var playerId = FBInstant.player.getID();

              // Once startGameAsync() resolves it also means the loading view has 
              // been removed and the user can see the game viewport

              //game.start();
            });
        }
          // Start loading game assets here
        );
      //do stuff with the script
    };
    script.src = "https://connect.facebook.net/en_US/fbinstant.6.3.js";

    document.head.appendChild(script); //or something of the likes
  }

  start() {

  }

  update() {

  }
}

RE.registerComponent(FacebookManager);
