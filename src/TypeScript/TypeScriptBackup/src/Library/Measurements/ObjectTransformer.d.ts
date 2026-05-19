import { CategoryObject } from "../CategoryObject";
import { Performer } from "../Performer";
import type { IDesktop } from "../Interfaces/IDesktop";
import type { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import type { IDataConsumer } from "./Interfaces/IDataConsumer";
import type { IMeasurement } from "./Interfaces/IMeasurement";
import type { IMeasurements } from "./Interfaces/IMeasurements";
import type { IObjectTransformer } from "./Interfaces/IObjectTransformer";
import type { IObjectTransformerConsumer } from "./Interfaces/IObjectTransformerConsumer";
export declare class ObjectTransformer extends CategoryObject implements IObjectTransformerConsumer, IDataConsumer, IMeasurements, IPostSetArrow {
    transformer: IObjectTransformer;
    performer: Performer;
    protected input: [];
    protected outMea: TransMeasurement[];
    protected inMea: IMeasurement[];
    protected inO: any[];
    protected outO: any[];
    protected outS: [];
    protected inS: never[];
    protected isUpdated: boolean;
    measurements: IMeasurements[];
    links: Map<string, string>;
    providers: IMeasurements[];
    cons: IDataConsumer;
    transformers: IObjectTransformer[];
    constructor(desktop: IDesktop, name: string);
    resetDataConsumer(): void;
    postSetArrow(): void;
    getMeasurementsCount(): number;
    getMeasurement(i: number): IMeasurement;
    updateMeasurements(): void;
    addMeasurement(measurement: IMeasurement): void;
    getAllMeasurements(): IMeasurements[];
    addMeasurements(item: IMeasurements): void;
    addTransformer(transformer: IObjectTransformer): void;
    initTransformer(): void;
    createOutput(): void;
    s: string;
    getOutputType(i: number): any;
    protected setLinks(map: Map<string, string>): void;
}
declare class TransMeasurement implements IMeasurement {
    n: number;
    outO: any[];
    name: string;
    type: any;
    links: Map<string, string>;
    performer: Performer;
    protected setLinks(links: Map<string, string>): void;
    constructor(n: number, outO: any[], name: string, type: any);
    getMeasurementName(): string;
    getMeasurementType(): any;
    getMeasurementValue(): any;
}
export {};
//# sourceMappingURL=ObjectTransformer.d.ts.map