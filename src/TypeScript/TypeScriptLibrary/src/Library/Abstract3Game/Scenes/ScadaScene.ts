import { IComponentCollection } from "../../Interfaces/IComponentCollection";
import { IObject } from "../../Interfaces/IObject";
import { IPlayEngine } from "../../Interfaces/IPlayEngine";
import { IScadaConsumer } from "../../Scada/Interfaces/IScadaConsumer";
import { IScadaInterface } from "../../Scada/Interfaces/IScadaInterface";
import { ScadaDesktop } from "../../Scada/ScadaDesktop";
import { ScadaDesktopEngine } from "../../Scada/ScadaDesktopEngine";
import { IGame } from "../Interfaces/IGame";
import { AbstractScene } from "../Abstract/AbstractScene";

export class ScadaScene extends AbstractScene implements IScadaConsumer
{
    constructor(game: IGame, collection: IComponentCollection) {
        super(game, (collection as unknown as IObject).getName())
        this.collection = collection
        
        var engine = this.performer.convertObject<IPlayEngine, IObject>(game, "IPlayEngine")
        if (engine.length > 0) this.scada = new ScadaDesktopEngine(collection, engine[0],
            this.factory, this.name)
        else this.scada = new ScadaDesktop(collection)
    }
    protected collection !: IComponentCollection
    protected scada !: IScadaInterface;
    getConsumerScada(): IScadaInterface {
        return this.scada;
    }
    setConsumerScada(scada: IScadaInterface): boolean {
        return false
    }

    loadItself(load: boolean): boolean {
        if (!super.loadItself(load)) return false
        if (load) this.performer.createSceneAction()
        else this.internalAction.clearActions()
        return true;
        
    }

}
