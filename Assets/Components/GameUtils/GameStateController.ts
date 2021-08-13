/*
 * GameStateController
 * Manage the different game states. 
 * It's a static class and can be used any component without instantiating.
 * onChangeGameState callback tell us when are game-state changes.
 * CAUTION: This callback is designed to manage changes between screens. 
 * Do not use to manage things in Update, handle collisions and other things in real time, is not the right way
 */

/*
 * How to use:
 *  - Import:
       import GSC, { GameState } from './GameStateController';
 *  - Change state:
       GSC.changeState(GameState.EndGameplay, {myCustomData : myCustomValue});
 *  - Get state changes (example):
       GSC.onChangeGameState((state) => {

            if (state.new == GameState.StartGameplay && state.old == GameState.MainMenu) {
                // New game. The user was at the main menu and now starting a new game.
                // Good time to load assets, audios, etc
            } 
            else if (state.new == GameState.StartGameplay && state.old == GameState.EndGameplay) {
                // New game-round. User starts another round in same scene after ending health/receiving a goal/losing a life...
                // Good time to reset scene without loading anything extra
            } else if (state.new == GameState.ScoreMenu && state.old == GameState.EndGameplay) {
                // End game. 
                // Show score/options...
            }
            ...

    });
 */

export enum GameState {
    None,
    Loading,
    MainMenu,
    StartGameplay,
    Pause,
    EndGameplay,
    ScoreMenu
};

interface cbGame {
    (param: any): void;
}
interface gameStateRequest {
    newGameState: GameState;
    _userData: any;
}

export default class GameStateController {

    static gameState = GameState.None;                  // Current gameState
    static changeGameStateCb: cbGame[] = [];            // Array of callbacks to fire when game changes the state
    static queueGameStates: gameStateRequest[] = [];    // Queue of change-state requests to avoid several changes at same time

    static changingState: boolean = false;             // Flag to lock changeState function when is busy

    static changeState(newGameState: GameState, _userData: any = {}) {

        //changeState is busy. Save request and process later
        if (this.changingState) {
            this.queueGameStates.push({ newGameState: newGameState, _userData: _userData });
            return;
        }
        this.changingState = true;

        console.log("Attempting change game state from " + GameState[this.gameState] + " to " + GameState[newGameState]);

        // Notify all components:
        for (let i = 0; i < this.changeGameStateCb.length; i++) {
            this.changeGameStateCb[i]({
                old: this.gameState,
                new: newGameState,
                userData: _userData
            });
        }

        this.gameState = newGameState;
        this.changingState = false;

        // Check now if there are pending requests to process
        if (this.queueGameStates.length > 0) {
            var gameStateChangeRequest = this.queueGameStates.shift();
            this.changeState(gameStateChangeRequest!.newGameState, gameStateChangeRequest!._userData);
        }
    }

    // Keep the callbacks to fire when there is a change of state
    static onChangeGameState(cb: (arg: any) => void) {
        this.changeGameStateCb.push(cb);
    }
}


