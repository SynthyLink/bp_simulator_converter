import { IDesktop } from "../Interfaces/IDesktop";
import { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import { DataConsumerVariadbleMeasurements } from "./DataConsumerVariableMeasurements";

export class VectorFormulaConsumer extends DataConsumerVariadbleMeasurements implements IPostSetArrow
{

    protected arguments: string[] = [];

    protected operationNames: Map<number, string> = new Map();

    constructor(desktop: IDesktop, name: string)
    {
        super(desktop, name);
        this.typeName = "VectorFormulaConsumer";
        this.types.push("VectorFormulaConsumer");
        this.types.push("IPostSetArrow");
    }

    updateMeasurements(): void
    {
        this.feedback.setFeedBackAliases();
        this.calculateTree();
        this.save();
    }

    calculateTree(): void {
    }

    init(): void {

    }

    save(): void {

    }

    setFeedback(): void { }



    postSetArrow(): void {
        this.init();
        this.setFeedback();
    }


}

//export default VectorFormulaConsumer;