import type { IActionAddRemoveT } from "../Interfaces/IActionAddRemoveT";
import type { IActionT } from "../Interfaces/IActionT";
import type { IFactory } from "../Interfaces/IFactory";
import type { IShowObject } from "./Interfaces/IShowObject";
import type { IShowData } from "./Interfaces/IShowData";
import { FactoryObject } from "../FactorytObject";
export declare class ShowObject extends FactoryObject implements IShowObject, IActionAddRemoveT<IShowData> {
    constructor(factory: IFactory);
    show(sender: any, show: any, name?: string | undefined): void;
    addActionT(action: IActionT<IShowData> | undefined): void;
    removeActionT(action: IActionT<IShowData> | undefined): void;
    clearActionsT(): void;
    actionT(t: IShowData): void;
    isEmptyActionT(): boolean;
    addStop(name: string): void;
    protected object: any;
    protected str: string | undefined;
    protected action: IActionAddRemoveT<IShowData>;
}
//# sourceMappingURL=ShowObject.d.ts.map