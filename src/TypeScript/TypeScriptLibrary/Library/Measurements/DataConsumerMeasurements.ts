import { FictiveAlias } from "../FictiveAlias";
import { IAlias } from "../Interfaces/IAlias";
import { IDesktop } from "../Interfaces/IDesktop";
import { IFeedbackAlias } from "../Interfaces/IFeedbackAlias";
import { Performer } from "../Performer";
import { DataConsumer } from "./DataConsumer";
import { IFeedbackAliasCollection } from "./Interfaces/IFeedbackAliasCollection";
import { IMeasurement } from "./Interfaces/IMeasurement";
import { IMeasurements } from "./Interfaces/IMeasurements";

export class DataConsumerMeasurements extends DataConsumer
    implements IMeasurements, IAlias, IFeedbackAliasCollection
{
    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.alias = this;
        this.typeName = "DataConsumerMeasurements";
        this.types.push("DataConsumerMeasurements");
        this.types.push("IMeasurements");
        this.types.push("IAlias");
        this.types.push("IExternalAliasDictionary");
    }
    addFeedbackAlias(feedbackAlias: IFeedbackAlias): void {
        this.feedbackAliases.push(feedbackAlias);
    }
    updateFeedbackAliasCollection(): void {
        for (let r of this.feedbackAliases) {
            r.setFeedBackAlias();
        }
    }
    getExternalAliasDictionary(): Map<string, string> {
        return this.external;
    }
    getExternalAlias(name: string): string {
        return this.external.get(name) as string;
    }
    addExternalAlias(name: string, value: string): void {
        this.external.set(name, value);
    }

    getAliasValue(name: string)
    {
        return this.aliasValues.get(name);
    }
    protected output: IMeasurement[] = [];

    protected aliasTypes: Map<string, any> = new Map();

    protected aliasValues: Map<string, any> = new Map();

    protected aliasNames: string[] = [];

    protected performer: Performer = new Performer();

    protected variable: any;

    protected alias: IAlias = new FictiveAlias();

    protected external: Map<string, string> = new Map();

    protected feedbackAliases: IFeedbackAlias[] = [];
   
    

 
    getMeasurementsCount(): number {
        return this.output.length;
    }

    getMeasurement(i: number): IMeasurement {
        return this.output[i];
    }

    addMeasurement(measurement: IMeasurement): void {
        this.output.push(measurement);
    }


    updateMeasurements(): void {
    }

    getAliasType(name: string): any {
        return this.aliasTypes.get(name);
    }
    


    getAliasNames(): string[] {
        return this.aliasNames;
    }

    

    getAliasVаlue(name: string) {
        return this.aliasValues.get(name);
    }

    setAliasValue(name: string, value: any)
    {
        this.performer.setAliasType(name, value, this.aliasTypes, this.aliasNames);
        this.aliasValues.set(name, value);
    }

}
