import type { CameraFrameAction } from "../Abstract3DGame/GameActions/CameraFrameAction";
import { AbstractGameAction } from "../Game/Abstract/AbstractGameAction";
import { AbstractGameAcionConverter } from "../Game/GameActions/AbstractGameAcionConverter";
import type { IGame } from "../Game/Interfaces/IGame";
import type { IGameAction } from "../Game/Interfaces/IGameAction";
import type { IScene } from "../Game/Interfaces/IScene";
import type { ISceneHolder } from "../Game/Interfaces/ISceneHolder";
import type { IFactory } from "../Interfaces/IFactory";
import type ShaderProgram from "./common/shader-program";
import { GLGame } from "./GLGame";

export class GLActionConverter extends AbstractGameAcionConverter {
    constructor(factory: IFactory) {
        super(factory)
    }

    functT(s: IGameAction): IGameAction | undefined {
        let sc = this.performer.convertObject<ISceneHolder, IGameAction>(s, "ISceneHolder")
        if (sc.length == 0) return undefined
        return new GLAction(sc[0].getHoldScene(), this.factory, s)
    }

}

class GLAction extends AbstractGameAction {
    action(): void {
        for (var p of this.map) this.executeShader(p[1])
    }

    isEmptyAction(): boolean {
        return false
    }
    constructor(scene: IScene, f: IFactory, action: IGameAction) {
        super("", f)
        this.scene = scene
        let game = scene.getGame();
        let g = this.performer.convertObject<GLGame, IGame>(game, "GLGame")[0]
        this.game = g;
        this.act = this.performer.convertObject<CameraFrameAction, IGameAction>(action, "CameraFrameAction")[0]
        let pr = g.programs;
        for (let [k, v] of pr) this.map.set(k, v)
    }

    scene !: IScene

    game !: GLGame;

    any: any

    map: Map<string, ShaderProgram> = new Map

    act !: CameraFrameAction


    executeShader(program: ShaderProgram): void {
        this.any = program
    }

}