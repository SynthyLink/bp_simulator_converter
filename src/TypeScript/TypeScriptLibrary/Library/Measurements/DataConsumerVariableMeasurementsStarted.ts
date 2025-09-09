/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AliasInitialValueCollection } from "../AliasInitialValueCollection.";
import type { IAlias } from "../Interfaces/IAlias";
import type { IDesktop } from "../Interfaces/IDesktop";
import type { IInitialValueCollection } from "../Interfaces/IInitialValueCollection";
import { DataConsumerVariableMeasurements } from "./DataConsumerVariableMeasurements";
import type { IStarted } from "./Interfaces/IStarted";

export class DataConsumerVariableMeasurementsStarted extends DataConsumerVariableMeasurements implements IStarted
{
    protected initial !: IInitialValueCollection;


    protected alias !: IAlias;

    constructor(desktop: IDesktop, name: string)
    {
        super(desktop, name);
        this.typeName = "DataConsumerVariadbleMeasurementsStarted";
        this.types.push("IStarted");
        this.types.push("DataConsumerVariadbleMeasurementsStarted");
        this.alias = this;
    }


    startedStart(start: number): void {
        this.initial.resetInitialValues();
    }



    setInitial(): void {
        this.initial = new AliasInitialValueCollection(this, this);
    }

}