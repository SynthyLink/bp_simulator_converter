import { AirplaneScene } from "./scenes/AirplaneScene";
import { FileGameFactory } from "./src/FileSystem/Factory/FileGameFactory";
import { ReferenceFrameGameActionFactory } from "./src/Library/Abstract3Game/GameActions/ReferenceFrameGameActionFactory";
import { ScadaFind3dFrame } from "./src/Library/Abstract3Game/GameActions/ScadaFind3DFrame";
import { EngineGameImitation } from "./src/Library/Abstract3Game/Imitation/EngineGameImitation";
import { AbstractAction } from "./src/Library/Event/Objects/AbstractAction";
import { AbstractActionT } from "./src/Library/Event/Objects/AbstractActionT";
import { TimerObject } from "./src/Library/Event/Objects/TimerObject";
import { IGame } from "./src/Library/Game/Interfaces/IGame";
import { IFactory } from "./src/Library/Interfaces/IFactory";
import { IDataConsumer } from "./src/Library/Measurements/Interfaces/IDataConsumer";
import { IScadaConsumer } from "./src/Library/Scada/Interfaces/IScadaConsumer";
import { PIAct } from "./test/wrappers/PIAct";



export class Actor {

    factory!: IFactory;
    game!: IGame;
    constructor() {
        this.dir = this.dir.replaceAll("\\", "/");
        var find = new ScadaFind3dFrame("Camera");
        var ga = new ReferenceFrameGameActionFactory(find);
        this.factory = new FileGameFactory(this.dir, ga);
        var g = new EngineGameImitation("", this.factory);
        g.getExternalAction().addAction(new A("game"));
        g.setImitation(10, 1, 0);
        this.game = g;
        var sc = new AirplaneScene(this.game, "Chart");
        var ea = sc.getExternalAction();
        ea.addAction(new A("scene"));
        ea.addAction(new B(sc, g));
    }

    loadGame(): void {
        this.game.loadItself(true);
        this.game.startItself(true);
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


