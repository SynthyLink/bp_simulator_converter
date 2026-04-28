import { AbstractAction } from "../../Event/Objects/AbstractAction";
import { AbstractGameAcionConverter } from "../../Game/GameActions/AbstractGameAcionConverter";
import { GamePerformer } from "../../Game/GamePerformer";
import { IAction } from "../../Interfaces/IAction";
import { IObject } from "../../Interfaces/IObject";
import { ActionArray } from "../../Utilities/Generic/ActionArray";
import { Game3DPerformer } from "../Game3DPerformer";
import { IDrawMesh } from "../GameActions/Interfaces/IDrawMesh";

export class DrawMeshActionConverter extends AbstractGameAcionConverter  {

    protected game3DPerformer : Game3DPerformer  = new Game3DPerformer()
    constructor(drawMesh: IDrawMesh) {
        super()
        this.types.push("IGameAcionConverter")
        this.types.push("DrawMeshActionConverter")
        this.typeName = "DrawMeshActionConverter"
        this.drawMesh = drawMesh
    }

    functT(s: IAction): IAction | undefined {
        let act = new ActionArray()
        act.addAction(s)
        var ob = s as unknown as IObject
        var p = this.game3DPerformer.detectMeshFrame(ob)
        if (p == undefined) {
            return s;
        }
        return s;
    }
    drawMesh !: IDrawMesh
}

class DrawMeshAction extends AbstractAction
{

    action(): void {
        throw new Error("Method not implemented.");
    }

}