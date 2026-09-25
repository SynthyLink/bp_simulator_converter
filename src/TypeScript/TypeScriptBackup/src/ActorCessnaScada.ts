import { Scada3DGame } from "./Library/Abstract3DGame/Scada3DGame";
import { AbstractAction } from "./Library/Event/Objects/AbstractAction";
import { AbstractActionT } from "./Library/Event/Objects/AbstractActionT";
import { TimerObject } from "./Library/Event/Objects/TimerObject";
import { IGame } from "./Library/Game/Interfaces/IGame";
import { IActionT } from "./Library/Interfaces/IActionT";
import { IInput } from "./Library/Interfaces/IInput";
import { getRungeFactory } from "./Library/Measurements/Factories";
import { IDataConsumer } from "./Library/Measurements/Interfaces/IDataConsumer";
import { IMeasurement } from "./Library/Measurements/Interfaces/IMeasurement";
import { IReferenceFrame } from "./Library/Motion6D/Interfaces/IReferenceFrame";
import { IScadaConsumer } from "./Library/Scada/Interfaces/IScadaConsumer";
import { IScadaInterface } from "./Library/Scada/Interfaces/IScadaInterface";
import { Cessna } from "./scenes/Cessna";

export class ActorCessnaScada extends Scada3DGame
{
    constructor()
    {
        super("", getRungeFactory(), new Cessna, "Chart", 0.05)
        let dataConsumer = this.scada.getScadaObject<IDataConsumer>("Chart", "IDataConsumer")[0]
        var mmm = dataConsumer.getAllMeasurements()
        var mm = mmm[2];
        this.X = mm.getMeasurement(3)
        this.Y = mm.getMeasurement(4)
        
        
           var ea = this.getExternalAction()
                var ena = this.engine.getEngineAction()
            ena.addActionT(new A("scene"));
            ena.addActionT(new B(this, this));
            ena.addActionT(new TT())
            this.startItself(true)
            for (let i = 0; i < 5000; i++) {
                this.actionT(i * 0.001)
            }

}


    X !: IMeasurement

    Y !: IMeasurement


}

    export class A extends AbstractAction implements IActionT<number> {
    s: string = ""
    i: number = 0
    constructor(s: string) {
        super()
        this.s = s;
    }
        actionT(t: number): void {
            this.action()
        }
        isEmptyActionT(): boolean {
            return false
        }
    action(): void {
        ++this.i
        console.log(this.s + " " + this.i)
    }

}

class B extends AbstractAction implements IActionT<number> {

    game !: IGame
    dataConsumer !: IDataConsumer
    scada !: IScadaInterface

    inputs !: IInput[]
    
    frame !: IReferenceFrame

    constructor(scene: IScadaConsumer, game: IGame) {
        super()
        this.game = game
        let scada = scene.getConsumerScada()
        this.inputs = scada.getScadaInputs()
        let dc = scada.getScadaObject<IDataConsumer>("Chart", "IDataConsumer")
        let f = scada.getScadaObject<IReferenceFrame>("Unity", "IReferenceFrame")

        this.frame = f[0]
        
        this.dataConsumer = dc[0];
        let timer = scada.getScadaObject<TimerObject>("Timer", "TimerObject")
        let evt = timer[0].eventActionT()
        evt.addActionT(new TA(this.game, this.inputs))
   //     evt.addActionT(this)
  
       // this.game.getExternalAction().addAction(this)
    }

    actionT(t: number): void {
        this.action()
    }
    isEmptyActionT(): boolean {
        return false
    }

    action(): void {
        var mmm = this.dataConsumer.getAllMeasurements()
        var mm = mmm[0];
        var m = mm.getMeasurement(0)
        var v = m.getMeasurementValue()
        console.log("Value " + v)
        mm = mmm[2]
        m = mm.getMeasurement(3)
        let n = m.getMeasurementName();
        v = m.getMeasurementValue()
        console.log(n + " " + v)
        console.log(this.frame.getPosition())
    }
}

class TT extends AbstractActionT<number> {
    actionT(t: number): void {
        console.log("2 * time " + 2 * t)
    }

}

class TA extends AbstractActionT<number> {
    game !: IGame
    inputs !: IInput[] 

    constructor(game: IGame, inputs : IInput[]) {
        super()
        this.game = game
        this.inputs = inputs
    }
    actionT(t: number): void {
        console.log("time " + t)
        if (t > 2) {
            console.log("FORCE")
            this.inputs[0].setInputValue("X", 1)
        }
        if (t > 5) {
            this.game.startItself(false)
        }
    }
}


