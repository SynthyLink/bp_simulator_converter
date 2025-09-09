/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IDesktop } from "../Interfaces/IDesktop";
import type { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import { DataConsumerVariableMeasurements } from "./DataConsumerVariableMeasurements";

export class VectorFormulaConsumer extends DataConsumerVariableMeasurements implements IPostSetArrow
{

  //  protected arguments: string[] = [];

 //   protected operationNames: Map<number, string> = new Map();

    constructor(desktop: IDesktop, name: string)
    {
        super(desktop, name);
        this.typeName = "VectorFormulaConsumer";
        this.types.push("VectorFormulaConsumer");
        this.types.push("IPostSetArrow");
    }

    updateMeasurements(): void
    {
        if (this.feedback != undefined) {
            this.feedback.setFeedbacks();
        }
        this.calculateTree();
        this.save();
    }

    calculateTree(): void
    {
    }

    init(): void {

    }

    save(): void {

    }



    postSetArrow(): void
    {
        this.init();
        this.setFeedback();
    }


}

