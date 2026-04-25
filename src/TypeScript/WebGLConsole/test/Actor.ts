import { CessnaScene } from "../scenes/CessnaScene";
import { FileGameFactory } from "../src/FileSystem/Factory/FileGameFactory";
import { EngineGameImitation } from "../src/Library/Abstract3Game/Imitation/EngineGameImitation";
import { IGame } from "../src/Library/Abstract3Game/Interfaces/IGame";
import { IFactory } from "../src/Library/Interfaces/IFactory";
import { PIAct } from "./wrappers/PIAct";


export class Actor {

    factory!: IFactory;
    game!: IGame;
    constructor() {
        this.factory = new FileGameFactory(this.dir);
        this.game = new EngineGameImitation("", this.factory);
        var sc = new CessnaScene(this.game, "Chart")
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
