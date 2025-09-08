
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IDesktop } from "../Interfaces/IDesktop";
import type { IMeasurements } from "./Interfaces/IMeasurements";
import type { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import type { IStarted } from "./Interfaces/IStarted";
import type { IAlias } from "../Interfaces/IAlias";
import type { IFeedbackAliasCollectionHolder } from "../Interfaces/IFeedbackAliasCollectionHolder";
import type { IInitialValueCollection } from "../Interfaces/IInitialValueCollection";
import { AliasInitialValueCollection } from "../AliasInitialValueCollection.";
import type { IFeedbackAliasCollection } from "../Interfaces/IFeedbackAliasCollection";
import { DataConsumerVariableMeasurements } from "./DataConsumerVariableMeasurements";


export class Recursive extends DataConsumerVariableMeasurements implements IStarted,
    IFeedbackAliasCollectionHolder, IPostSetArrow
{
    protected inputs: IMeasurements[] = [];


    protected arguments: string[] = [];

  //  protected initial: Map<string, any> = new Map();

    protected operationNames: Map<number, string> = new Map();

    protected alias !: IAlias;

    protected initial !: IInitialValueCollection;

    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.typeName = "Recursive";
        this.types.push("IStarted");
        this.types.push("IPostSetArrow");
        this.types.push("IFeedbackAliasCollectionHolder");
        this.types.push("Recursive");
        this.alias = this;

    }
    getFeedbackAliasCollection(): IFeedbackAliasCollection {
        throw new Error("Method not implemented.");
    }

    startedStart(start: number): void
    {
        this.initial.resetInitialValues();
    }

    setIniitial(): void
    {
        this.initial = new AliasInitialValueCollection(this, this);
    }

    init(): void
    {

    }

   
    postSetArrow(): void
    {
        this.init();
        this.setFeedback();
        this.setIniitial();
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
        this.feedback.setFeedbacks();
//        this.performer.updateChildrenData(this);
        this.calculateTree();
        this.save();
    }
}
