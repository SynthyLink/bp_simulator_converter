import { CategoryObject } from "../CategoryObject";
import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IDesktop } from "../Interfaces/IDesktop";
import type { IInput } from "../Interfaces/IInput";
import type { IMeasurement } from "../Measurements/Interfaces/IMeasurement";
import type { IMeasurements } from "../Measurements/Interfaces/IMeasurements";
import type { IStarted } from "../Measurements/Interfaces/IStarted";
export declare class Input extends CategoryObject implements IInput, IMeasurements, IStarted {
    constructor(desktop: IDesktop, name: string);
    startedStart(start: number): void;
    getMeasurementsCount(): number;
    getMeasurement(i: number): IMeasurement;
    updateMeasurements(): void;
    getInputTypes(): Map<string, any>;
    getInitalConditions(): Map<string, any>;
    setInputValue(name: string, value: any): void;
    eventAction(): IActionAddRemove;
    isEventEnabled(): boolean;
    setEventEnabled(enabled: boolean): void;
    protected createAll(): void;
    protected measuremenrs: IMeasurement[];
    protected inputtypes: Map<string, any>;
    protected inputconitions: Map<string, any>;
    protected num: Map<string, number>;
    protected data: any[];
    protected idata: any[];
    protected array: any[][];
    protected measurements: IMeasurement[];
    protected en: boolean;
    protected action: IActionAddRemove;
    protected fx: number;
}
//# sourceMappingURL=Input.d.ts.map