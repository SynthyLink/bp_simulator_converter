import { IFactoryConsumer } from "../../Interfaces/IFactoryConsumer";
import { IObject } from "../../Interfaces/IObject";
import { IScene } from "./IScene";

export interface ISceneObject extends IObject, IFactoryConsumer {
    getScene(): IScene
    setScene(scene: IScene): void
}