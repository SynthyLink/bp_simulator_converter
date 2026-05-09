import type { IFuncT } from "../Interfaces/IFuncT";
import type { ITextReader } from "../IO/Interfaces/ITextReader";
import { LinesTextReaderFromAny } from "../IO/LinesTextReaderFromAny";
import type { IResourceItem } from "./Infrefaces/IResourceItem";

export class TextReaderFromResource implements IFuncT<ITextReader | undefined, string> {

    constructor(items: IResourceItem[], func: IFuncT<any | undefined, IResourceItem>) {
        this.func = func;
        for (let r of items) {
            if (r.type == "text") {
                this.map.set(r.url, r)
            }
        }
    }

    functT(url: string): ITextReader | undefined {
        if (!this.map.has(url)) return undefined
        let r = this.map.get(url)
        if (r != undefined) {
            let any = this.func.functT(r)
            return new LinesTextReaderFromAny(any)
        }
        return undefined
    }
 
    items : IResourceItem[] = []
    func !: IFuncT<any | undefined, IResourceItem>
    map: Map<string, IResourceItem> = new Map()

}

