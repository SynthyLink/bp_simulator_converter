import { getFactory } from "./Library/Abstract3DGame/Game3DRealtime";
import { Game3DRealtimeReactGL } from "./ReactWebGL/Game3DRealtimeReactGL";
import { Immelman } from "./scenes/Immelman";

export class ActImmelman extends Game3DRealtimeReactGL {

    stopped: boolean = true;
    constructor() {
        super(getFactory(), new Immelman, 0.1, "Consumer")
        this.loadGame()
    }

    public stopItself(): void {
        this.game.startItself(false)
    }
}
