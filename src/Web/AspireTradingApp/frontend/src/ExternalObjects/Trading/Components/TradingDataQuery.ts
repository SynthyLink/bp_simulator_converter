import type { IDesktop } from "../../../Library/Interfaces/IDesktop";
import type { IInitializeTask } from "../../../Library/Interfaces/IInitializeTask";
import type { IIterator } from "../../../Library/Measurements/Interfaces/IIterator";
import type { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";
import type { IMeasurements } from "../../../Library/Measurements/Interfaces/IMeasurements";
import { CategoryObject } from "../../../Library/CategoryObject";
import type { HistoricalDataMessageDateTime } from "../Database/HistoricalDataMessageDateTime";
import type { ITradingDatabaseHistoryInterface } from "../Database/ITradingDatabaseHistoryInterface";

export class TradingDataQuery extends CategoryObject implements IInitializeTask, IIterator, IMeasurements
{


    static  inter: ITradingDatabaseHistoryInterface 


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
        this.any = i;
        throw new Error("Method not implemented.");
    }

    updateMeasurements(): void {
        
    }

    addMeasurement(measurement: IMeasurement): void {
        this.any = measurement
    }

    nextIterator(): void {
        ++this.step;
        this.current = this.data[this.step];
    }

    resetIterator(): void {
        this.step = 0;
    }

   async initializeTaskAsync(controller: AbortController): Promise<void> {
       var sym = await TradingDataQuery.inter.getSymbolsAsync();
       for (let i of sym) {
           this.symbols.set(i[0], i[1])
       }
       this.any = controller
    }


    any : any
 
    protected id !: any;

    protected begin: number = 0;

    protected end: number = 0;

    protected period : string = "";

    data: HistoricalDataMessageDateTime[] = [];

    current !: HistoricalDataMessageDateTime;


    step: number = 0;

    
}
