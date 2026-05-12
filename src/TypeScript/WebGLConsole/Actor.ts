import { AirplaneScene } from "./scenes/AirplaneScene";
import { FileGameFactory } from "./src/Console/FileGameFactory";
import { ReferenceFrameGameActionFactory } from "./src/Library/Abstract3DGame/GameActions/ReferenceFrameGameActionFactory";
import { ScadaFind3dFrame } from "./src/Library/Abstract3DGame/GameActions/ScadaFind3DFrame";
import { ScadaFindCamera } from "./src/Library/Abstract3DGame/GameActions/ScadaFindCamera";
import { IFindCamera } from "./src/Library/Abstract3DGame/Interfaces/IFindCamera";
import { IFindFrame } from "./src/Library/Abstract3DGame/Interfaces/IFindFrame";
import { AbstractAction } from "./src/Library/Event/Objects/AbstractAction";
import { AbstractActionT } from "./src/Library/Event/Objects/AbstractActionT";
import { TimerObject } from "./src/Library/Event/Objects/TimerObject";
import { EngineGame } from "./src/Library/Game/Abstract/EngineGame";
import { IGame } from "./src/Library/Game/Interfaces/IGame";
import { IActionAddRemoveT } from "./src/Library/Interfaces/IActionAddRemoveT";
import { IFactory } from "./src/Library/Interfaces/IFactory";
import { IPlayEngine } from "./src/Library/Interfaces/IPlayEngine";
import { IDataConsumer } from "./src/Library/Measurements/Interfaces/IDataConsumer";
import { IScadaConsumer } from "./src/Library/Scada/Interfaces/IScadaConsumer";
import { ActionArrayT } from "./src/Library/Utilities/Generic/ActionArrayT";
import { EngineWatch } from "./src/Library/Utilities/Watch/EnfineWatch";
import { PIAct } from "./test/wrappers/PIAct";



export class Actor {

    factory!: IFactory;
    game!: IGame;

    url: string = "http://localhost:4173/static/models/pLANE/master.mtl"

    async p(): Promise<void> {
        let response = await fetch(this.url)
        console.log("RESP", response)
        console.log("BLOB", response.blob)

        let data = await response.text();

        console.log(data)
    }

    //engine: FictiveEngine = new FictiveEngine()
    constructor() {
         this.dir = this.dir.replaceAll("\\", "/");
        var find = new ScadaFind3dFrame("Camera");
        var ga = new ReferenceFrameGameActionFactory(find, undefined);
        var f = new FileGameFactory(this.dir, ga);
        ga.setConsumerFactory(f)
        this.factory = f;
        f.addFactory<IFindFrame>(find, "IFindFrame")
        f.addFactory<IFindCamera>(new ScadaFindCamera("Camera"), "IFindCamera")
        let engine = new EngineWatch(500)
        var g = new EngineGame("", this.factory, engine, false);
        g.getExternalAction().addAction(new A("game"));
        this.game = g;
        var sc = new AirplaneScene(this.game, "Chart");
        var ea = sc.getInternalAction()
        ea.addAction(new A("scene"));
        ea.addAction(new B(sc, g));
    }

    loadGame(): void {
        this.game.loadItself(true);
        this.game.startItself(true);
      /* for (let i = 0; i < 10; i++) {
            this.engine.setTime(i)
        }*/

    }


    dir: string = "C:\\AUsers\\1MySoft\\CSharp\\src\\TypeScript\\WebGLConsole/static/models";
    actPI(): void {
        try {
            var o = new PIAct();
            o.test();
        }
        catch (e) {
            //finish(e);
        }
    }

    actAirplane(): void {
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
        let timer = scada.getScadaObject<TimerObject>("Timer", "TimerObject")
        timer[0].eventActionT().addActionT(new TA(this.game))
    }

    action(): void {
        var mmm = this.dataConsumer.getAllMeasurements()
        var mm = mmm[0];
        var m = mm.getMeasurement(0)
        var v = m.getMeasurementValue()
        console.log("Value " + v)
    }
}

class TA extends AbstractActionT<number> {
    game !: IGame
    constructor(game: IGame) {
        super()
        this.game = game
    }
    actionT(t: number): void {
        console.log("time " + t)
        if (t > 5) {
            this.game.startItself(false)
        }
    }
}



