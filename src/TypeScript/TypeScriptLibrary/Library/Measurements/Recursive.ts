
import { IDesktop } from "../Interfaces/IDesktop";
import { IMeasurements } from "./Interfaces/IMeasurements";
import { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import { IStarted } from "./Interfaces/IStarted";
import { IAlias } from "../Interfaces/IAlias";
import { DataConsumerVariadbleMeasurements } from "./DataConsumerVariableMeasurements";
import { IFeedbackAliasCollectionHolder } from "../Interfaces/IFeedbackAliasCollectionHolder";


export class Recursive extends DataConsumerVariadbleMeasurements implements IStarted,
    IFeedbackAliasCollectionHolder, IPostSetArrow
{
    protected inputs: IMeasurements[] = [];


    protected arguments: string[] = [];

    protected initial: Map<string, any> = new Map();

    protected operationNames: Map<number, string> = new Map();

    protected alias !: IAlias;

    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.typeName = "Recursive";
        this.types.push("ISarted");
        this.types.push("IPostSetArrow");
        this.types.push("IFeedbackAliasCollectionHolder");
        this.types.push("Recursive");
        this.alias = this;

    }

    startedStart(start: number): void
    {
        var keys = this.initial.keys();
        var vari = this.variables;
        for (var key of keys)
        {
            var v = vari.get(key);
            v?.setIValue(this.initial.get(key));
        }
    }

    setIniitial(): void {
        var names = this.getAliasNames();
        for (var name of names) {
            this.initial.set(name, this.getAliasValue(name));
        }
    }

    init(): void {
    }

   
    postSetArrow(): void {
        this.init();
        this.setFeedback();
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
        this.feedback.setFeedBackAliases();
        this.calculateTree();
        this.save();
    }
}
