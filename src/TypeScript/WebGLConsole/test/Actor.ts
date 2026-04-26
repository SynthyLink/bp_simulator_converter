import { AirplaneScene } from "../scenes/AirplaneScene";
import { CessnaScene } from "../scenes/CessnaScene";
import { FileGameFactory } from "../src/FileSystem/Factory/FileGameFactory";
import { EmptyGameActionFactory } from "../src/Library/Abstract3Game/GameActions/EmptyGameActionFactory";
import { ReferenceFrameGameActionFactory } from "../src/Library/Abstract3Game/GameActions/ReferenceFrameGameActionFactory";
import { ScadaFindFrame } from "../src/Library/Abstract3Game/GameActions/ScadaFindFrame";
import { EngineGameImitation } from "../src/Library/Abstract3Game/Imitation/EngineGameImitation";
import { IGame } from "../src/Library/Abstract3Game/Interfaces/IGame";
import { IFactory } from "../src/Library/Interfaces/IFactory";
import { PIAct } from "./wrappers/PIAct";


export class Actor {

    factory!: IFactory;
    game!: IGame;
    constructor() {
        this.dir = this.dir.replaceAll("\\", "/")
        var find = new ScadaFindFrame("Camera")
        var ga = new ReferenceFrameGameActionFactory(find)
        this.factory = new FileGameFactory(this.dir, ga);
        var g = new EngineGameImitation("", this.factory);
        g.setImitation(10, 1, 0)
        this.game = g
        var sc = new AirplaneScene(this.game, "Chart")
    }

    loadGame(): void {
        this.game.loadItself(true)
        this.game.startItself(true)
    }


    dir: string = "C:\\AUsers\\1MySoft\\CSharp\\src\\TypeScript\\WebGLConsole\\models\\";
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
