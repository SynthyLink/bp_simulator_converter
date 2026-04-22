import type { IActionT } from "../Library/Interfaces/IActionT"
import type { IDesktop } from "../Library/Interfaces/IDesktop"
import type { IFactory } from "../Library/Interfaces/IFactory"
import type { IStartPrimitive } from "./Interfaces/IStartPrimitive"
import type { IScadaInterface } from "../Library/Scada/Interfaces/IScadaInterface"
import type { IObject } from "../Library/Interfaces/IObject"
import { ScadaDesktopEngine } from "../Library/Scada/ScadaDesktopEngine"
import { BasicScene } from "./BasicScene"
import Game from "./game"
import { Performer } from "../Library/Performer"



export abstract class ScadaScene extends BasicScene implements IActionT<IObject> {

    constructor(game: Game, factory: IFactory, desktop: IDesktop) {
        super(game, factory)
        this.scada = new ScadaDesktopEngine(desktop, game, factory, "Chart")
        this.loadScada()
        this.performer.setFactoryToObjectCollection(this, factory)
    }

    public draw(deltaTime: number): void {
    }
    public end(): void {
    }


    actionT(t: IObject): void {
        this.loader.loadObject(this, t)
    }

    protected loadScada(): void {
        this.performer.forEach<IObject>(this.scada, this, "IObject")
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