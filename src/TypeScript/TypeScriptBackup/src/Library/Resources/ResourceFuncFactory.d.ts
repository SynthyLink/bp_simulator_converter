import { FactoryObject } from "../FactorytObject";
import type { IFactory } from "../Interfaces/IFactory";
import type { IResourceFunc } from "./Infrefaces/IResourceFunc";
import type { IResourceFuncFactory } from "./Infrefaces/IResourceFuncFactory";
export declare class ResourceFuncFactory extends FactoryObject implements IResourceFuncFactory {
    constructor(name: string, factory: IFactory | undefined);
    addFunction(type: 'text' | 'json' | 'image', func: IResourceFunc): boolean;
    functT(s: 'text' | 'json' | 'image'): IResourceFunc | undefined;
    map: Map<'text' | 'json' | 'image', IResourceFunc>;
}
//# sourceMappingURL=ResourceFuncFactory.d.ts.map