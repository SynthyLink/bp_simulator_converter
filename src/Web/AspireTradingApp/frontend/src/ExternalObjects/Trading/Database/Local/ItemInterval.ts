import { Item } from "../../../../Library/IndexedDB/Item.class"

export class ItemInterval extends Item {
    public begin: number = 0
    public end: number = 0
    constructor(id: string, begin: number, end: number) {
        super(id)
        this.begin = begin
        this.end   = end
    }

}