import type { IActionT } from "../Interfaces/IActionT";
import type { IObjectCollection } from "../Interfaces/IObjectCollection";
import { Performer } from "../Performer";
import type { IScadaConsumer } from "./Interfaces/IScadaConsumer";
import type { IScadaInterface } from "./Interfaces/IScadaInterface";
export declare class ScadaPerformer implements IActionT<IScadaConsumer> {
    setScada(collection: IObjectCollection, scada: IScadaInterface): void;
    pefrormer: Performer;
    actionT(t: IScadaConsumer): void;
    isEmptyActionT(): boolean;
    scada: IScadaInterface;
}
//# sourceMappingURL=ScadaPerformer.d.ts.map