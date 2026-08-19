import type { IFuncT } from "../Interfaces/IFuncT";
import type { ITextReader } from "../IO/Interfaces/ITextReader";
import type { ITextReaderFactory } from "../IO/Interfaces/ITextReaderFactory";
import type { IResourceFunc } from "./Infrefaces/IResourceFunc";
import type { IResourceItem } from "./Infrefaces/IResourceItem";
export declare class TextReaderFromResource implements ITextReaderFactory {
    constructor(items: IResourceItem[], func: IFuncT<IResourceFunc | undefined, 'text' | 'json' | 'image'>);
    getTextReader(obj: any, url: string): ITextReader | undefined;
    functT(url: string): ITextReader | undefined;
    items: IResourceItem[];
    func: IResourceFunc;
    map: Map<string, IResourceItem>;
    any: any;
}
//# sourceMappingURL=TextReaderFromResource.d.ts.map