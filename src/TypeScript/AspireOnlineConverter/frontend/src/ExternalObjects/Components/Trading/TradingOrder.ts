import { CategoryObject } from "../../../Library/CategoryObject";
import type { IPostSetArrow } from "../../../Library/Interfaces/IPostSetArrow";
import type { IIterator } from "../../../Library/Measurements/Interfaces/IIterator";
import type { IIteratorConsumer } from "../../../Library/Measurements/Interfaces/IIteratorConsumer";
import type { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";
import type { IMeasurements } from "../../../Library/Measurements/Interfaces/IMeasurements";

export class TradingOrder extends CategoryObject implements IPostSetArrow, IMeasurements,
    IIteratorConsumer {
    getMeasurementsCount(): number {
        throw new Error("Method not implemented.");
    }
    getMeasurement(i: number): IMeasurement {
        throw new Error("Method not implemented.");
        this.any = i

    }
    updateMeasurements(): void {
        throw new Error("Method not implemented.");
    }
    addMeasurement(measurement: IMeasurement): void {
        throw new Error("Method not implemented.");
        this.any = measurement

    }
    postSetArrow(): void {
        throw new Error("Method not implemented.");
    }
    addIterator(iterator: IIterator): void {
        throw new Error("Method not implemented.");
        this.any = iterator
   }
    removeIterator(iterator: IIterator): void {
        throw new Error("Method not implemented.");
        this.any = iterator
    }

    any: any

}