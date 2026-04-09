import { Cessna } from "../Cessna";
import Game from "../common/game";
import { ScadaScene } from "../common/ScadaScene";
import { ScadaDesktop } from "../Library/Scada/ScadsDessktop";


export class CessnaScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
            ["Cessna_208_Caravan.obj"]: { url: 'Cessna_208_Caravan.obj', type: 'image' },
            ["master.mtl"]: { url: 'master.mtl', type: 'image' },
            ["mat0_c.jpg"]: { url: 'mat0_c.jpg', type: 'image' }
        });
    }
    public start(): void {
    }
    public draw(deltaTime: number): void {
    }
    public end(): void {
    }
    constructor(game: Game) {
        super(game, new ScadaDesktop(new Cessna()))
    }
}
