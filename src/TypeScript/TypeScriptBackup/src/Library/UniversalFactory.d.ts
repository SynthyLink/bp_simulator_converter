import type { IFactory } from "./Interfaces/IFactory";
import type { IObject } from "./Interfaces/IObject";
import { FactoryObject } from "./FactorytObject";
export declare class UniversalFactory extends FactoryObject implements IFactory {
    constructor();
    removeFactory<T>(t: T, type: string): void;
    getFactory<T>(typeName: string): T | undefined;
    addFactory<T>(t: T, type: string): void;
    protected factories: Map<string, IObject>;
}
//# sourceMappingURL=UniversalFactory.d.ts.map