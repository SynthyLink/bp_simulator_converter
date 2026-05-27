import type { IScene } from "../Game/Interfaces/IScene";
import type { IFactory } from "../Interfaces/IFactory";
import { GamePerformer } from "./GamePerformer";

export class ScenePerformer extends GamePerformer {
    scene!: IScene;
    factory!: IFactory;

    constructor(scene: IScene) {
        super();
        this.scene = scene;
        this.factory = scene.getConsumerFactory();
    }
}
