import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IActionT } from "../Interfaces/IActionT";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IFactory } from "../Interfaces/IFactory";
import type { IObjectCollection } from "../Interfaces/IObjectCollection";
import type { IScadaConsumer } from "./Interfaces/IScadaConsumer";
import type { IScadaInterface } from "./Interfaces/IScadaInterface";
import { Performer } from "../Performer";
import { ActionArray } from "../Utilities/Generic/ActionArray";
import { ScadaActionInterval } from "./ScadaActionInterval";

export class ScadaPerformer extends Performer implements IActionT<IScadaConsumer>
{
    public setScada(collection: IObjectCollection, scada: IScadaInterface): void {
        this.scada = scada
        this.forEach<IScadaConsumer>(collection, this, "IScadaConsumer")
    }


    actionT(t: IScadaConsumer): void {
        t.setConsumerScada(this.scada);
    }

	isEmptyActionT(): boolean { return false }

	public createScadaDesktopAction(componentCollection: IComponentCollection, interval: number, factory: IFactory, chart: string): IActionAddRemove {
		let action = new ActionArray
		return new ScadaActionInterval(componentCollection, action, interval, factory, chart);
	}

    scada !: IScadaInterface;

}
