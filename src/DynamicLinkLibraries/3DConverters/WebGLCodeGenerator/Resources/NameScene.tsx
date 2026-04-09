import { Cessna } from "../Cessna";
import Game from "../common/game";
import { ScadaScene } from "../common/ScadaScene";
import { ScadaDesktop } from "../Library/Scada/ScadsDessktop";

export class NameScene extends ScadaScene {
    public load(): void {
        this.game.loader.load({
           // LOAD
        }
        )
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