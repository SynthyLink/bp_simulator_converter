import { GamePerformer } from "../Game/GamePerformer";
import { IAssociatedObject } from "../Interfaces/IAssociatedObject";
import { IObject } from "../Interfaces/IObject";
import { IPosition } from "../Motion6D/Interfaces/IPosition";
import { IPositionObject } from "../Motion6D/Interfaces/IPositionObject";
import { Motion6DPerformer } from "../Motion6D/Motion6DPerformer";
import { ReferenceFrame } from "../Motion6D/ReferenceFrame";

export class Game3DPerformer extends GamePerformer
{
    pefrormer: Motion6DPerformer = new Motion6DPerformer()

    public getRelativeFrame(baseFrame: ReferenceFrame, targetFrame: ReferenceFrame, relative: ReferenceFrame) {
        this.pefrormer.getRelativeFrame(baseFrame, targetFrame, relative)
    }

    public getOwnFrame(object: IObject): ReferenceFrame | undefined {
        var pos = this.convertObject<IPosition, IObject>(object, "IPosition")
        if (pos.length > 0) {
            return this.pefrormer.getOwnFrame(pos[0])
        }
        var po = this.convertObject<IPositionObject, IObject>(object, "IPositionObject")
        if (po.length > 0) {
            var position = po[0].getObjectPosition()
            return this.pefrormer.getOwnFrame(position)
        }
        var ao = this.convertObject<IAssociatedObject, IObject>(object, "IAssociatedObject")
        {
            if (ao.length > 0)
                return this.getOwnFrame(ao[0].getAssociatedObject())
        }
        return undefined

    }


}