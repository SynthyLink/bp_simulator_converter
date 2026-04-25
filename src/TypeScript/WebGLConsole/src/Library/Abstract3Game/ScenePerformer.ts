import { IFactory } from "../Interfaces/IFactory";
import { Performer } from "../Performer";
import { IScene } from "./Interfaces/IScene";
import { ISceneObject } from "./Interfaces/ISceneObject";
import { SceneObjectAction } from "./SceneObjectAction.";


export class ScenePerformer extends Performer {
    scene!: IScene;
    factory!: IFactory;

    constructor(scene: IScene) {
        super();
        this.scene = scene;
        this.factory = scene.getConsumerFactory();
    }

    public createSceneAction(): void {
        var s = this.scene;
        var act = new SceneObjectAction(s);
        this.forEach<ISceneObject>(s, act, "ISceneObject");
    }
}
