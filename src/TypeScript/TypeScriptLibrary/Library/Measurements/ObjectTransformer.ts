import { CategoryObject } from "../CategoryObject";
import { OwnError } from "../ErrorHandler/OwnError";
import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IDesktop } from "../Interfaces/IDesktop";
import { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import { Performer } from "../Performer";
import { IDataConsumer } from "./Interfaces/IDataConsumer";
import { IMeasurement } from "./Interfaces/IMeasurement";
import { IMeasurements } from "./Interfaces/IMeasurements";
import { IObjectTransformer } from "./Interfaces/IObjectTransformer";
import { IObjectTransformerConsumer } from "./Interfaces/IObjectTransformerConsumer";

export class ObjectTransformer extends CategoryObject implements IObjectTransformerConsumer,
    IDataConsumer, IMeasurements, IPostSetArrow
{
    // ----------------------------------------
    // Region: Data Types and Variables
    // ----------------------------------------

    // Fields


 
    /// <summary>
    /// This object as IObjectTransformer
    /// </summary>
    transformer !: IObjectTransformer;

    performer : Performer = new Performer()

    /// <summary>
    /// Input
    /// </summary>
    protected input : [] = [];

    /// <summary>
    /// Output measurements
    /// </summary>
    protected outMea: TransMeasurement[] = [];

    /// <summary>
    /// Input measurements
    /// </summary>
    protected inMea: IMeasurement[] = [];

    /// <summary>
    /// Input objects
    /// </summary>
    protected  inO : any[] = [];

    /// <summary>
    /// Output objects
    /// </summary>
    protected outO : any[] = [];

    /// <summary>
    /// Single output
    /// </summary>
    protected outS : [] = [];

    /// <summary>
    /// Single input
    /// </summary>
    protected inS = [];

    /// <summary>
    /// The "is updated" sign
    /// </summary>
    protected isUpdated: boolean = false;

    /// <summary>
    /// External measurements
    /// </summary>
    /// <summary>
    /// Providers of measurements
    /// </summary>
    measurements: IMeasurements[] = [];

   /// <summary>
    /// Links to variables
    /// </summary>
    links: Map<string, string> = new Map();

    /// <summary>
    /// Providers of measurements
    /// </summary>
    providers: IMeasurements[] = [];

    cons !: IDataConsumer;

    transformers: IObjectTransformer[] = [];



    constructor(desktop: IDesktop, name: string)
    {
        super(desktop, name);
        this.typeName = "ObjectTransformer";
        this.types.push("ObjectTransformer");
        this.types.push("IObjectTransformerConsumer");
        this.types.push("IDataConsumer");
        this.types.push("IMeasurements");
        this.types.push("IPostSetArrow");
        this.cons = this;
    }
    postSetArrow(): void {
        throw new OwnNotImplemented();
    }
    getMeasurementsCount(): number {
        return this.outMea.length;
    }
    getMeasurement(i: number): IMeasurement {
        return this.outMea[i];
    }
    updateMeasurements(): void {
        throw new OwnNotImplemented();
    }
    addMeasurement(measurement: IMeasurement): void {
        this.outMea.push(measurement as TransMeasurement);
    }
    getAllMeasurements(): IMeasurements[] {
        return this.measurements;
    }
    addMeasurements(item: IMeasurements): void {
        this.measurements.push(item);
    }


    addTransformer(transformer: IObjectTransformer): void
    {
        if (this.transformer != null)
        {
            throw new OwnError("", "", "");
        }
        this.transformer = transformer;
        this.initTransformer();
    }

    initTransformer(): void {
        var sl = this.outS.length;
        if (this.outO.length != sl)
        {
            this.outO = new Array(sl);
            const arr: [] = [];
            //var a = this.performer.resizeArray(arr, sl);
        }
      //  outMea = new IMeasurement[outO.Length];
        //inMea = new IMeasurement[transformer.Input.Length];
        //inO = new object[inMea.Length];
        this.createOutput();
    }


    createOutput() : void
    {
        var outS = this.transformer.getOutput();
        for (var i: number = 0; i < outS.length; i++)
        {
            var name = outS[i];
            var type = this.getOutputType(i);
            this.outMea.push(new TransMeasurement(i, this.outO, name, type));
        }
    }

    getOutputType(i: number): any
    {
        return this.transformer.getOutputType(i);
    }


 }

class TransMeasurement implements IMeasurement
{
    n: number;

    outO : any[] = [];

    name: string = "";

    type! : any;




    constructor(n : number, outO : any[], name : string, type : any)
    {
        this.n = n;
        this.outO = outO;
        this.name = name;
        this.type = type;
    }
    getMeasurementName(): string {
        return this.name;
    }
    getMeasurementType(): any {
        return this.type;
    }
    getMeasurementValue() : any {
        return this.outO[this.n];
    }


}
