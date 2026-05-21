import { GameGLFactory } from "./GLGameFactory/GameGLFactory";
import { ScadaFind3dFrame } from "./Library/Abstract3DGame/GameActions/ScadaFind3DFrame";
import { ScadaFindCamera } from "./Library/Abstract3DGame/GameActions/ScadaFindCamera";
import { AbstractAction } from "./Library/Event/Objects/AbstractAction";
import { AbstractActionT } from "./Library/Event/Objects/AbstractActionT";
import type { TimerObject } from "./Library/Event/Objects/TimerObject";
import { PerformerEvents } from "./Library/Event/PerformerEvents";
import type { IGame } from "./Library/Game/Interfaces/IGame";
import { GLGame } from "./Library/GLGame/GLGame";
import type { IDataConsumer } from "./Library/Measurements/Interfaces/IDataConsumer";
import type { IScadaConsumer } from "./Library/Scada/Interfaces/IScadaConsumer";
import { EngineWatch } from "./Library/Utilities/Watch/EnfineWatch";
import { AirplaneScene } from "../scenes/AirplaneScene"
import type { IInput } from "./Library/Interfaces/IInput";
import { ReferenceFrameSceneAction } from "./Library/Abstract3DGame/GameActions/ReferenceFrameSceneAction";
import type { ISceneAction } from "./Library/Game/Interfaces/ISceneAction";
import type { IGameActionConverter } from "./Library/Game/Interfaces/IGameActionConverter";
import { GLActionConverter } from "./Library/GLGame/GLActionConverter";

let first: boolean = true

PerformerEvents.setTimeScale(0.001)

export function funcGame() {

}
export function funcAirplane(): void {
    if (first) {
        first = false
    } else return

    let find = new ScadaFind3dFrame("Camera");
    let fc = new ScadaFindCamera("Camera")

    let factory = new GameGLFactory
    let sf = new ReferenceFrameSceneAction(find, fc, factory)
    factory.addFactory<ISceneAction>(sf, "ISceneAction")
    let conv = new GLActionConverter(factory)
    factory.addFactory<IGameActionConverter>(conv, "IGameActionConverter")

    const engine = new EngineWatch(500)

    // First thing we need is to get the canvas on which we draw our scenes
    let canv = document.querySelector("#app");
    if (canv === undefined) return
    if (canv === null) return
    const canvas: HTMLCanvasElement = canv as HTMLCanvasElement
    // Then we create an instance of the game class and give it the canvas
    const game = new GLGame("", factory, engine, true, canvas, { maxfps: 25 });

    game.shouldStartAfterLoad()

    game.getExternalAction().addAction(new A("game"));
   // g.setImitation(10, 1, 0);


    // Here we list all our scenes and our initial scene
   // const initialScene = "Game";
    var sc = new AirplaneScene(game, "Chart")
    var ea = sc.getExternalAction();
    ea.addAction(new A("scene"));
    ea.addAction(new B(sc, game));
    game.getEngineAction().addActionT(new TT())


    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    //game.addScenes(scenes);
   // game.addSceneObject("Game", new SpaceTrippersScene(game))
    game.addScene("Air", sc)
    game.loadItself(true)

    var sel = document.querySelector("#scenes");

    if (sel === undefined) return
    // Here we setup a selector element to switch scenes from the webpage
    //var selector = sel as HTMLSelectElement
/*    for (let name in scenes) {
        let option = document.createElement("option");
        option.text = name;
        option.value = name;
        selector.add(option);
    }
    selector.value = initialScene;
    selector.addEventListener("change", () => {
     //   game.startScene(selector.value);
    });
    /*
    let act = new ActorWebNew()
    act.actCompositionEvent(game)
    */
}

class TT extends AbstractActionT<number> {
    actionT(t: number): void {
        console.log("2 * time " + 2 * t)
    }

}

export class A extends AbstractAction {
    s: string = ""
    i: number = 0
    constructor(s: string) {
        super()
        this.s = s;
    }
    action(): void {
        ++this.i
        console.log(this.s + " " + this.i)
    }

}

class B extends AbstractAction {

    game !: IGame
    dataConsumer !: IDataConsumer
    constructor(scene: IScadaConsumer, game: IGame) {
        super()
        this.game = game
        let scada = scene.getConsumerScada()
        let dc = scada.getScadaObject<IDataConsumer>("Chart", "IDataConsumer")
        this.dataConsumer = dc[0];
        let inputs = scada.getScadaInputs()
        let timer = scada.getScadaObject<TimerObject>("Timer", "TimerObject")
        timer[0].eventActionT().addActionT(new TA(this.game, inputs))
    }

    action(): void {
        var mmm = this.dataConsumer.getAllMeasurements()
        var mm = mmm[0];
        var m = mm.getMeasurement(0)
        var v = m.getMeasurementValue()
        console.log("Value " + v)
        mm = mmm[2]
        m = mm.getMeasurement(3)
        let n = m.getMeasurementName();
        v = m.getMeasurementValue()
        console.log(n + " " + v)
}
}

class TA extends AbstractActionT<number> {
    game !: IGame
    inputs !: IInput[]

    constructor(game: IGame, inputs: IInput[]
    ) {
        super()
        this.game = game
        this.inputs = inputs
    }
    actionT(t: number): void {
        console.log("time " + t)
        if (t > 2) {
            console.log("FORCE")
            this.inputs[0].setInputValue("X", 1)
        }
        if (t > 5) {
            this.game.startItself(false)
        }
    }
}




