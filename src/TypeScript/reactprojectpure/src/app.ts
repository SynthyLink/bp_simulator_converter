import SpaceTrippersScene from './scenes/SpaceTrippers';
import { IFunc } from "./Library/Interfaces/IFunc";
import Game from "./common/game";
import { GameEngine } from "./common/GameEngine";
import { AirplaneScene } from "./scenes/AirplaneScene";
import { PerformerMeasuremets } from "./Library/Measurements/PerformerMeasuremets";
import { RungeProcessor } from "./Library/Measurements/DifferentialEquations/Processors/RungeProcessor";
import { Performer } from "./Library/Performer";
import { Motion6DRealtimeFactory } from "./Library/Motion6D/Runtime/Event/Motion6DRealtimeFactory";
import { PerformerEvents } from "./Library/Event/PerformerEvents";
import { ActorWebNew } from './Tests/Actor/ActorWebNEW';
import { Airplane } from './Airplane';
import { UniversalFactory } from './Library/UniversalFactory';
import { GameFactory } from './common/GameFactory';
import AirplanePage from './scenes/AirplanePage';
import FlyCameraController from './common/camera-controllers/fly-camera-controller';
import Input from './common/input';
import Camera from './common/camera';
import { IAction } from './Library/Interfaces/IAction';

PerformerEvents.setTimeScale(0.001)
function funcAirplane() {

    // First thing we need is to get the canvas on which we draw our scenes
    const canvas: HTMLCanvasElement = document.querySelector("#app");

    // Then we create an instance of the game class and give it the canvas
    const game = new Game(canvas, { maxfps: 25 });

    // Here we list all our scenes and our initial scene
    const scenes = {
        "Game": SpaceTrippersScene
    };
    const initialScene = "Game";
    const air = new AirplanePage(game);

    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    //game.addScenes(scenes);
   // game.addSceneObject("Game", new SpaceTrippersScene(game))
    game.addSceneObject("Air", air)
    game.startScene("Air");

    // Here we setup a selector element to switch scenes from the webpage
    const selector : HTMLSelectElement = document.querySelector("#scenes");
    for (let name in scenes) {
        let option = document.createElement("option");
        option.text = name;
        option.value = name;
        selector.add(option);
    }
    selector.value = initialScene;
    selector.addEventListener("change", () => {
        game.startScene(selector.value);
    });
    /*
    let act = new ActorWebNew()
    act.actCompositionEvent(game)
    */
}

function func() {

    // First thing we need is to get the canvas on which we draw our scenes
    const canvas: HTMLCanvasElement = document.querySelector("#app");

    // Then we create an instance of the game class and give it the canvas
    const game = new Game(canvas, { maxfps: 25 });

    // Here we list all our scenes and our initial scene
    const scenes = {
        "Game": SpaceTrippersScene
    };
    const initialScene = "Game";
    // const air = new AirplaneScene(game);

    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    //game.addScenes(scenes);
    var scene = new  SpaceTrippersScene(game, new GameFactory())
    game.addSceneObject("Game", scene);
    var input = new Input(canvas)
    //game.addSceneObject("Air", air)
    var conrtoller = new ExtendedFlyCameraController(scene.getCamera(), input, game, scene)
    scene.addUpdate(conrtoller)
    var cc = new InputController(input, scene)
    scene.addUpdate(cc)
    game.startScene(initialScene);

    // Here we setup a selector element to switch scenes from the webpage
    const selector: HTMLSelectElement = document.querySelector("#scenes");
    for (let name in scenes) {
        let option = document.createElement("option");
        option.text = name;
        option.value = name;
        selector.add(option);
    }
    selector.value = initialScene;
    //let act = new ActorWeb()
    //act.actPI()
    selector.addEventListener("change", () => {
        game.startScene(selector.value);
    });
    let act = new ActorWebNew()
    //  act.actCompositionEvent(game)
    act.actCompositionScada(game)
}

class ExtendedFlyCameraController extends FlyCameraController implements IAction
{
    scene !: SpaceTrippersScene;
    game !: Game

    constructor(camera: Camera, input: Input, game : Game, scene : SpaceTrippersScene) {
        super(camera, input)
        this.scene = scene
        this.game = game
    }
    action(): void {
        this.update(this.game.getDeltaTime())
    }
}

class InputController implements IAction{
    constructor(input: Input, scene: SpaceTrippersScene) {
        this.scene = scene
        this.input = input
    }
    action(): void {
      if (this.input.isButtonDown(0))
      {
            if (this.input.isKeyDown("l")) this.scene.addMovement(1)
            if (this.input.isKeyDown("j")) this.scene.addMovement(-1)
        }
      }
    input !: Input;
    scene !: SpaceTrippersScene;

}

func()

//funcAirplane()