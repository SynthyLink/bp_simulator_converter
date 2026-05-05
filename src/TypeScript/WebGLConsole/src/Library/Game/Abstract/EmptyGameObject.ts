import { IFactory } from "../../Interfaces/IFactory";
import { IFactoryConsumer } from "../../Interfaces/IFactoryConsumer";
import { IObject } from "../../Interfaces/IObject";
import { GamePerformer } from "../GamePerformer";

export class EmptyGameObject implements IObject, IFactoryConsumer
{

    protected performer: GamePerformer = new GamePerformer()
    constructor(name: string, factory: IFactory | undefined) {
        this.name = name
        if (factory != undefined) this.factory = factory
    }


    setConsumerFactory(factory: IFactory): void {
        this.factory = factory
    }
    getConsumerFactory(): IFactory {
        return this.factory
    }

    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "EmptyGameObject"

    protected types: string[] = ["IObject", "EmptyGameObject", "IFactoryConsumer"]

    protected name: string = ""

    protected factory !: IFactory


}