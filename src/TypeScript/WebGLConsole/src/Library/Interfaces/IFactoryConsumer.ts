import type { IFactory } from "./IFactory";

export interface IFactoryConsumer {
    set ConsumerFactory(factory: IFactory)
    get ConsumerFactory(): IFactory

}