import { EmptyObject } from "./EmptyObject";
import type { IFactory } from "./Interfaces/IFactory";
import type { IFactoryConsumer } from "./Interfaces/IFactoryConsumer";

export class FactoryObject extends EmptyObject implements IFactoryConsumer {
    constructor(name: string, factory: IFactory | undefined) {
        super(name)
        this.types.push("IFactoryConsumer")
        this.types.push("FactoryObject")
        if (factory === undefined) return
        this.factory = factory
        
    }

    setConsumerFactory(factory: IFactory): void {
        this.factory = factory
    }
    getConsumerFactory(): IFactory {
        return this.factory
    }

    protected factory !: IFactory



}