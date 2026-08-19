import { EmptyObject } from "../../EmptyObject";
import type { IActionT } from "../../Interfaces/IActionT";
import type { IFuncT } from "../../Interfaces/IFuncT";
import type { IShowData } from "../../Show/Interfaces/IShowData";
export declare abstract class AbstractActionT<T> extends EmptyObject implements IActionT<T> {
    constructor(func?: IFuncT<boolean, IShowData>);
    protected isProhibited(show: IShowData): boolean;
    abstract actionT(t: T): void;
    isEmptyActionT(): boolean;
    func: IFuncT<boolean, IShowData>;
}
//# sourceMappingURL=AbstractActionT.d.ts.map