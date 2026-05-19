import { EmptyObject } from "./EmptyObject";
import type { IFactory } from "./Interfaces/IFactory";
import type { IFactoryConsumer } from "./Interfaces/IFactoryConsumer";
import type { IShowObject } from "./Show/Interfaces/IShowObject";
export declare class FactoryObject extends EmptyObject implements IFactoryConsumer {
    constructor(name: string, factory: IFactory | undefined);
    setConsumerFactory(factory: IFactory): void;
    getConsumerFactory(): IFactory;
    protected detectShow(): void;
    showObject(sender: any, object: any, name?: string | undefined): void;
    protected setFactory(factory: IFactory | undefined): void;
    protected factory: IFactory;
    protected showObj: IShowObject;
}
//# sourceMappingURL=FactorytObject.d.ts.map