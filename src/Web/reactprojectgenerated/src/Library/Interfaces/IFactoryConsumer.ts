import { IFactory } from "./IFactory";

export interface IFactoryConsumer {
    setConsumerFactory(facrory: IFactory): void
    getConsumerFactory(): IFactory

}