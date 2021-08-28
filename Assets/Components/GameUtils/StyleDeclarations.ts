
/*
 * StyleDeclarations
 * Temp way to keep CSS styles to free up code space in the UIManager.
 */
import WindowUtils from "./WindowUtils";
export default class StyleDeclarations {

    static mainFont: string = "@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap')";
    static startGameContainer: string = "margin: auto;height: 100%;display: none;background-color: rgba(0, 0, 0, 0.7);align-content: space-around;justify-content: center;flex-wrap: wrap;flex-direction: column;align-items: center;font-family: 'Press Start 2P', cursive;";
    static playGameContainer: string = (!WindowUtils.isPortrait()) ? 
    "margin: auto;height: 100%;display: none;background-color: transparent;place-content: space-around center;flex-flow: column wrap;align-items: flex-start;align-content: flex-start;flex-wrap: nowrap;flex-direction: row;justify-content: space-evenly;font-family: 'Press Start 2P', cursive;":
    "margin: auto;height: 80%;display: flex;background-color: transparent;align-items: flex-start;place-content: flex-start space-evenly;flex-flow: row nowrap;font-family: 'Press Start 2P', cursive;flex-direction: column;";    
    static endGameContainer: string = "margin: auto;height: 100%;display: none;background-color: rgba(0, 0, 0, 0.7);;align-content: space-around;justify-content: center;flex-wrap: wrap;flex-direction: column;align-items: center;font-family: 'Press Start 2P', cursive;";
    static pauseGameContainer: string = "margin: auto;height: 100%;width: 100%;display: none;background-color: rgba(0, 0, 0, 0.7);align-content: space-around;justify-content: center;flex-wrap: wrap;flex-direction: column;align-items: center;font-family: 'Press Start 2P', cursive;position: absolute;top:0%";


    static gameTitle: string = "color: white; text-align: center;";
    static playBtn: string = "cursor: pointer; color: white; position: relative; text-align: center;";

    static score: string = "float:left;textAlign:center;font-size: 30px;margin:10px;lineHeight:50px;justify-content: top;color:white;display:flex;";
    static bestScore: string = "float:left;textAlign:center;margin:10px;lineHeight:30px;color:white;display:flex;";
    static pauseGameBtn: string = "background-color: transparent;textAlign:center;margin:10px;lineHeight:30px;color:white;position: absolute;";

    static endScore: string = "float:left;textAlign:center;margin:10px;lineHeight:30px;color:white;display:flex;";
    static endBestScore: string = "float:left;textAlign:center;margin:50px;lineHeight:30px;color:white;display:flex;";
    static replayBtn: string = "cursor: pointer; color: white; position: relative;display:flex;";

    static resumeBtn: string = "cursor: pointer; color: white; position: relative;display:flex;";
    static quitGameBtn: string = "cursor: pointer; color: white; position: relative;display:flex;";

}

