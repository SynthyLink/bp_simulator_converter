import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IActionT } from "../Interfaces/IActionT";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IFactory } from "../Interfaces/IFactory";
import type { IObjectCollection } from "../Interfaces/IObjectCollection";
import type { IScadaConsumer } from "./Interfaces/IScadaConsumer";
import type { IScadaInterface } from "./Interfaces/IScadaInterface";
import type { IPlayEngine } from "../Interfaces/IPlayEngine";
import { Performer } from "../Performer";
export declare class ScadaPerformer extends Performer implements IActionT<IScadaConsumer> {
    setScada(collection: IObjectCollection, scada: IScadaInterface): void;
    actionT(t: IScadaConsumer): void;
    isEmptyActionT(): boolean;
    createScadaDesktopEngine(componentCollection: IComponentCollection, engine: IPlayEngine, factory: IFactory, chart: string): IActionAddRemove;
    createScadaDesktopAction(componentCollection: IComponentCollection, action: IActionAddRemove, interval: number, factory: IFactory, chart: string): IActionAddRemove;
    scada: IScadaInterface;
}
//# sourceMappingURL=ScadaPerformer.d.ts.map