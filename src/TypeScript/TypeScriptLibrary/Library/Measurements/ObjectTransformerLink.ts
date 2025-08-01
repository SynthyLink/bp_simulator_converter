import { constructor } from "assert";
import { CategoryArrow } from "../CategoryArrow";
import { ICategoryObject } from "../Interfaces/ICategoryObject";
import { IDesktop } from "../Interfaces/IDesktop";
import { IDataConsumer } from "./Interfaces/IDataConsumer";
import { IMeasurements } from "./Interfaces/IMeasurements";
import { IObjectTransformer } from "./Interfaces/IObjectTransformer";
import { IObjectTransformerConsumer } from "./Interfaces/IObjectTransformerConsumer";

export class ObjectTransformerLink extends CategoryArrow {
    constructor(desktop: IDesktop, name: string) {
        super(desktop, name)
        this.typeName = "ObjectTransformerLink";
        this.types.push("ObjectTransformerLink");
    }

    getSource(): ICategoryObject {
        return this.consumer as unknown as ICategoryObject;
    }
    getTagret(): ICategoryObject {
        return this.transformer as unknown as ICategoryObject;
    }
    setSource(source: ICategoryObject): void
    {
        this.consumer = source as unknown as IObjectTransformerConsumer;
    }
    setTarget(target: ICategoryObject): void {
        this.transformer = target as unknown as IObjectTransformer;
        this.consumer.addTransformer(this.transformer);
    }


    transformer !: IObjectTransformer;
    consumer !: IObjectTransformerConsumer;


}