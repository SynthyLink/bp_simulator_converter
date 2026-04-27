import { IScene } from "../Game/Interfaces/IScene";
import { ISceneObject } from "../Game/Interfaces/ISceneObject";
import { IFactory } from "../Interfaces/IFactory";
import { Performer } from "../Performer";
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
