import type { IActionT } from "../Interfaces/IActionT";
import { IObjectCollection } from "../Interfaces/IObjectCollection";
import { Performer } from "../Performer";
import type { IScadaConsumer } from "./Interfaces/IScadaConsumer";
import type { IScadaInterface } from "./Interfaces/IScadaInterface";

export class ScadaPerformer implements IActionT<IScadaConsumer>
{
    public setScada(collection: IObjectCollection, scada: IScadaInterface): void {
        this.pefrormer.forEach<IScadaConsumer>(collection, this, "IScadaConsumer")
    }

    pefrormer: Performer = new Performer()

    actionT(t: IScadaConsumer): void {
        t.setConsumerScada(this.scada);
    }

    scada !: IScadaInterface;

}