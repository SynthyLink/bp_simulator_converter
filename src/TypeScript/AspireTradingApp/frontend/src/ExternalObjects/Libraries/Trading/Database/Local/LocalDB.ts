import type { HistoryMessage } from "../HistoryMessage";
import type { ILocalDB } from "./Interfaces/ILocalDB";

export class LocalDB  implements ILocalDB {
    setInterval(symbol: string, i: number[]): void {
        this.any = symbol
        this.any = i

        throw new Error("Method not implemented.");
    }
    getInterval(symbol: string): number[] {
        this.any = symbol
        throw new Error("Method not implemented.");
    }
    writeHistory(symbol: string, history: HistoryMessage[]): void {
        this.any = symbol
        this.any = history
      throw new Error("Method not implemented.");
    }
    clearHistory(symbol: string): void {
        this.any = symbol
       throw new Error("Method not implemented.");
    }
    readHistory(symbol: string, begin: number, end: number): HistoryMessage[] {
        this.any = symbol
        this.any = begin
        this.any = end
 
        throw new Error("Method not implemented.");
        
    }

    any : any
    
}