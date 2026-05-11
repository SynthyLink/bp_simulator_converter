import { EmptyObject } from "./EmptyObject";
import type { IFactory } from "./Interfaces/IFactory";
import type { IFactoryConsumer } from "./Interfaces/IFactoryConsumer";
import type { IShowObject } from "./Interfaces/IShowObject";

export class FactoryObject extends EmptyObject implements IFactoryConsumer {
    constructor(name: string, factory: IFactory | undefined) {
        super(name)
        this.types.push("IFactoryConsumer")
        this.types.push("FactoryObject")
        this.typeName = "FactoryObject"
        if (factory === undefined) return
        this.factory = factory
        this.detectShow()
    }

    setConsumerFactory(factory: IFactory): void {
        this.factory = factory
    }
    getConsumerFactory(): IFactory {
        return this.factory
    }

    protected detectShow(): void {
        if (this.showObj != undefined) return
        const sh = this.factory.getFactory<IShowObject>("IShowObject")
        if (sh != undefined) this.showObj = sh
    }

    public showObject(object: any, name?: string | undefined): void {
        if (this.showObj == undefined) return
        this.showObj.show(object, name)
    }

    protected factory !: IFactory

    protected showObj !: IShowObject

    

}