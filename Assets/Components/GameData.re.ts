/*
 * GameData
 * At moment this is a very basic way to save information.
 * TODO: This will be the place where you can access the browser's localstorage to save / load persistent data, 
 * manage best-scores ...
 */

import * as RE from 'rogue-engine';
import GameStateController, { GameState } from './GameUtils/GameStateController';

export default class GameData extends RE.Component {

    private _scoreUser: number = 0;
    private _scoreCpu: number = 0;

    private _bestScore: number = 0;

    public get scoreUser(): number {
        return this._scoreUser;
    }

    public get scoreCpu(): number {
        return this._scoreCpu;
    }

    public get bestScore(): number {
        return this._bestScore;
    }

    public addScoreUser(amount: number) {
        this._scoreUser += amount;
        return this._scoreUser;
    }

    public addScoreCpu(amount: number) {
        this._scoreCpu += amount;
        return this._scoreCpu;
    }

    awake() {

        GameStateController.onChangeGameState((state) => {

            // Reset score when we repeat the game from the Scores menu or quit from Pause. 
            if (state.new == GameState.StartGameplay && state.old == GameState.ScoreMenu || 
                state.new == GameState.MainMenu && state.old == GameState.Pause) {
                this._scoreUser = 0;
                this._scoreCpu = 0;
            }
        });

    }

}

RE.registerComponent(GameData);
