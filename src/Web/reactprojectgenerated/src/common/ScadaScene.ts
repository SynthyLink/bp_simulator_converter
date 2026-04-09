import { BasicScene } from "./BasicScene";
import type { IScadaInterface } from "../Library/Scada/Interfaces/IScadaInterface";
import Game from "./game";
import type { IActionT } from "../Library/Interfaces/IActionT";
import { Basic3DShape } from "../Library/Motion6D/Objects/Shapes/Basic3DShape";
import { Object3DPrimitive } from "./Primitives/Object3DPrimive";
import { Performer } from "../Library/Performer";
import { IStartPrimitive } from "./Interfaces/IStartPrimitive";

export abstract class ScadaScene extends BasicScene implements IActionT<Basic3DShape> {

    protected performer : Performer = new Performer()
    constructor(game: Game, scada: IScadaInterface) {
        super(game)
        this.scada = scada;
        this.loadShapes();
    }

    actionT(t: Basic3DShape): void {
        var name = t.getName();
        new Object3DPrimitive(name, this, t)
    }

    protected loadShapes(): void {
      this.performer.forEach<Basic3DShape>(this.scada, this, "Basic3DShape")
  }

    public start(): void {
        this.performer.forEach<IStartPrimitive>(this, this.startp, "IStartPrimitive")
   }

 
    scada !: IScadaInterface;

    startp: IActionT<IStartPrimitive> = new Start()
}

class Start implements IActionT<IStartPrimitive> {
    actionT(t: IStartPrimitive): void {
        t.startPrimitive();
    }

}