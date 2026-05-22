import { AbstractGameAction } from "../Game/Abstract/AbstractGameAction";
import { AbstractGameAcionConverter } from "../Game/GameActions/AbstractGameAcionConverter";
import type { IGameAction } from "../Game/Interfaces/IGameAction";
import type { IScene } from "../Game/Interfaces/IScene";
import type { ISceneHolder } from "../Game/Interfaces/ISceneHolder";
import type { IFactory } from "../Interfaces/IFactory";

export class GLActionConverter extends AbstractGameAcionConverter {
    constructor(factory: IFactory) {
        super(factory)
    }
    functT(s: IGameAction): IGameAction | undefined {
        let sc = this.performer.convertObject<ISceneHolder, IGameAction>(s, "ISceneHolder")
        if (sc.length == 0) return undefined
        return new GLAction(sc[0].getHoldScene(), this.factory)
    }

}

class GLAction extends AbstractGameAction {
    action(): void {
        this.any = undefined
    }
    isEmptyAction(): boolean {
        return false
    }
    constructor(scene: IScene, f: IFactory) {
        super("", f)
        this.scene = scene
    }
    scene !: IScene

    any : any

}