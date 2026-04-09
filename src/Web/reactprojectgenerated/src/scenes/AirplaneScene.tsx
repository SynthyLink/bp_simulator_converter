import { Airplane } from "../Airplane";
import Game from "../common/game";
import { ScadaScene } from "../common/ScadaScene";
import { ScadaDesktop } from "../Library/Scada/ScadsDessktop";

export class AirplaneScene extends ScadaScene {
    public load(): void {
       this.game.loader.load({
			["Cessna_208_Caravan_obj"]:{ url: 'models/pLANE/Cessna_208_Caravan.obj', type: 'text'},
			["master.mtl"]:{ url: 'models/pLANE/master.mtl', type: 'text'},
			["mat0_c.jpg"]:{ url: 'models/pLANE/mat0_c.jpg', type: 'image'}
        }
        )
        this.game.loader.wait()
        console.log("LOAD1")
}
    public draw(deltaTime: number): void {
    }
    public end(): void {
    }
    constructor(game: Game) {
        super(game, new ScadaDesktop(new Airplane()))
        this.load()
        this.loadShapes()
        this.start()
        console.log("LOAD")
    }
}
