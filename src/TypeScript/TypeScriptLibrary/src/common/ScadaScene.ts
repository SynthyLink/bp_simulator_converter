import type { IActionT } from "../Library/Interfaces/IActionT"
import type { IDesktop } from "../Library/Interfaces/IDesktop"
import type { IFactory } from "../Library/Interfaces/IFactory"
import type { IStartPrimitive } from "./Interfaces/IStartPrimitive"
import type { IScadaInterface } from "../Library/Scada/Interfaces/IScadaInterface"
import { Basic3DShape } from "../Library/Motion6D/Objects/Shapes/Basic3DShape"
import { ScadaDesktopEngine } from "../Library/Scada/ScadaDesktopEngine"
import { BasicScene } from "./BasicScene"
import Game from "./game"
import { Object3DPrimitive } from "./Primitives/Object3DPrimive"
import { Performer } from "../Library/Performer"



export abstract class ScadaScene extends BasicScene implements IActionT<Basic3DShape> {

    constructor(game: Game, factory: IFactory, desktop: IDesktop) {
        super(game, factory)
        console.log("PPPPPPPPPPPPP")
        this.scada = new ScadaDesktopEngine(desktop, game, factory, "Chart")
        console.log(this.scada)
        console.log("PPPPHHHPPPPPPPPP")
        console.log(this.performer)
        this.loadShapes()
        console.log(this.performer.setFactoryToObjectCollection)
        this.performer.setFactoryToObjectCollection(this, factory)
    }

    public draw(deltaTime: number): void {
    }
    public end(): void {
    }


    actionT(t: Basic3DShape): void {
        var name = t.getName();
        new Object3DPrimitive(name, this, t)
    }

    protected loadShapes(): void {
        console.log("LLLLL")
        console.log(this.scada)
        this.performer.forEach<Basic3DShape>(this.scada, this, "Basic3DShape")
    }

    public start(): void {
        this.performer.forEach<IStartPrimitive>(this, this.startp, "IStartPrimitive")
   }

 
    scada !: IScadaInterface;

    startp: IActionT<IStartPrimitive> = new Start()

    protected performer: Performer = new Performer()

}

class Start implements IActionT<IStartPrimitive> {
    actionT(t: IStartPrimitive): void {
        t.startPrimitive();
    }

}