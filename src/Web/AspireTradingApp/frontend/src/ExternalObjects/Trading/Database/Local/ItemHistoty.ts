import { Item } from "../../../../Library/IndexedDB/Item.class";
import type { HistoryMessage } from "../HistoryMessage";

export class ItemHistory extends Item implements HistoryMessage {
    constructor(id: string, message: HistoryMessage) {
        super(id)
        this.requestId = message.requestId
        this.date = message.date
        this.open = message.open
        this.high = message.high
        this.low = message.low
        this.close = message.close
        this.volume = message.volume
        this.count = message.count
        this.wap = message.wap
        this.hasGaps = message.hasGaps
     }
    requestId !: number;
    date!: number;
    open!: number;
    high!: number;
    low!: number;
    close!: number;
    volume!: number;
    count!: number;
    wap!: number;
    hasGaps!: boolean;

}