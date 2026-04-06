import { CategoryObject } from "../../../Library/CategoryObject";
import { IDesktop } from "../../../Library/Interfaces/IDesktop";
import { IInitializeTask } from "../../../Library/Interfaces/IInitializeTask";
import { IIterator } from "../../../Library/Measurements/Interfaces/IIterator";
import { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";
import { IMeasurements } from "../../../Library/Measurements/Interfaces/IMeasurements";
import { Performer } from "../../../Library/Performer";
import { HistoricalDataMessageDateTime } from "../../Libraries/Trading/Database/HistoricalDataMessageDateTime";
import { ITradingDatabaseHistoryInterface } from "../../Libraries/Trading/Database/ITradingDatabaseHistoryInterface";
import { getHistoryDatabase } from "./TradinHistoryDatabse";

export class TradingDataQuery extends CategoryObject implements IInitializeTask, IIterator, IMeasurements
{


    inter: ITradingDatabaseHistoryInterface = getHistoryDatabase()


    symbols: Map<string, any> = new Map < string, any>()
    

    constructor(desktop: IDesktop, name: string) {
        super(desktop, name)
        this.typeName = "TradingDataQuery"
        this.types.push("TradingDataQuery");
        this.types.push("IInitializeTask");
        this.types.push("IIterator");
        this.types.push("IMeasurements");
      }
    getMeasurementsCount(): number {
        return 0
    }
    getMeasurement(i: number): IMeasurement {
        throw new Error("Method not implemented.");
    }
    updateMeasurements(): void {
        
    }
    addMeasurement(measurement: IMeasurement): void {
        throw new Error("Method not implemented.");
    }
    nextIterator(): void {
        ++this.step;
        this.current = this.data[this.step];
    }
    resetIterator(): void {
        this.step = 0;
    }

   async initializeTaskAsync(controller: AbortController): Promise<void> {
       var sym = await this.inter.getSymbolsAsync(controller);
       this.performer.copyMap(sym, this.symbols);
    }



 
    protected id !: any;

    protected begin: number = 0;

    protected end: number = 0;

    protected period : string = "";

    data: HistoricalDataMessageDateTime[] = [];

    current !: HistoricalDataMessageDateTime;


    step: number = 0;

    
}
