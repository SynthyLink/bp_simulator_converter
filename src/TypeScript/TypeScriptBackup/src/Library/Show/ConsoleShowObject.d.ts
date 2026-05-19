import { AbstractActionT } from "../Event/Objects/AbstractActionT";
import type { IFuncT } from "../Interfaces/IFuncT";
import type { IShowData } from "./Interfaces/IShowData";
export declare class ConsoleShowObject extends AbstractActionT<IShowData> {
    constructor(func?: IFuncT<boolean, IShowData>);
    actionT(t: IShowData): void;
    i: number;
}
//# sourceMappingURL=ConsoleShowObject.d.ts.map