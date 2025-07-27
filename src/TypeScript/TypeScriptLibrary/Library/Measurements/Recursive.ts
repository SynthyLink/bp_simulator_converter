import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IDesktop } from "../Interfaces/IDesktop";
import { DataConsumerMeasurements } from "./DataConsumerMeasurements";
import { IMeasurements } from "./Interfaces/IMeasurements";
import { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import { IStarted } from "./Interfaces/IStarted";
import { IAlias } from "../Interfaces/IAlias";


export class Recursive extends DataConsumerMeasurements implements IStarted, IPostSetArrow
{
    protected inputs: IMeasurements[] = [];

    protected feedback: Map<number, string> = new Map();

    protected arguments: string[] = [];

    protected initial: Map<string, any> = new Map();

    protected operationNames: Map<number, string> = new Map();

    protected alias !: IAlias;

    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.typeName = "Recursive";
        this.types.push("ISarted");
        this.types.push("IPostSetArrow");
        this.types.push("Recursive");
        this.alias = this;

    }
    startedStart(start: number): void {
        var keys = this.initial.keys();
        for (var key of keys) {
            this.setAliasValue(key, this.initial.get(key));
        }
    }

    void Set Inial
    postSetArrow(): void {
        
    }

    getAllMeasurements(): IMeasurements[] {
        return this.inputs;
    }
    addMeasurements(item: IMeasurements): void {
        this.inputs.push(item);
    }

    calculateTree(): void
    {

    }

    save(): void
    {

    }


    updateMeasurements(): void
    {
        this.calculateTree();
        this.save();
    }

    

}
