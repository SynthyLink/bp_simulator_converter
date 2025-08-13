
import { IDesktop } from "../Interfaces/IDesktop";
import { IMeasurements } from "./Interfaces/IMeasurements";
import { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import { DataConsumerVariadbleMeasurementsStarted } from "./DataConsumerVariadbleMeasurementsStarted";


export class RecursiveFormula extends DataConsumerVariadbleMeasurementsStarted implements IPostSetArrow
{
    protected inputs: IMeasurements[] = [];


    protected arguments: string[] = [];

  //  protected initial: Map<string, any> = new Map();

    protected operationNames: Map<number, string> = new Map();


    constructor(desktop: IDesktop, name: string)
    {
        super(desktop, name);
        this.typeName = "RecursiveFormula";
        this.types.push("IPostSetArrow");
        this.types.push("RecursiveFormula");

    }

 
    init(): void
    {

    }

   
    postSetArrow(): void
    {
        this.init();
        this.setInitial();
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
