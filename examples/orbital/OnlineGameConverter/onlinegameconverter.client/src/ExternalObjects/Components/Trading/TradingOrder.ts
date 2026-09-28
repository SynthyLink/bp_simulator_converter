import { CategoryObject } from "../../../Library/CategoryObject";
import { IPostSetArrow } from "../../../Library/Interfaces/IPostSetArrow";
import { IIterator } from "../../../Library/Measurements/Interfaces/IIterator";
import { IIteratorConsumer } from "../../../Library/Measurements/Interfaces/IIteratorConsumer";
import { IMeasurement } from "../../../Library/Measurements/Interfaces/IMeasurement";
import { IMeasurements } from "../../../Library/Measurements/Interfaces/IMeasurements";

export class TradingOrder extends CategoryObject implements IPostSetArrow, IMeasurements,
    IIteratorConsumer {
    getMeasurementsCount(): number {
        throw new Error("Method not implemented.");
    }
    getMeasurement(i: number): IMeasurement {
        throw new Error("Method not implemented.");
    }
    updateMeasurements(): void {
        throw new Error("Method not implemented.");
    }
    addMeasurement(measurement: IMeasurement): void {
        throw new Error("Method not implemented.");
    }
    postSetArrow(): void {
        throw new Error("Method not implemented.");
    }
    addIterator(iterator: IIterator): void {
        throw new Error("Method not implemented.");
    }
    removeIterator(iterator: IIterator): void {
        throw new Error("Method not implemented.");
    }


}