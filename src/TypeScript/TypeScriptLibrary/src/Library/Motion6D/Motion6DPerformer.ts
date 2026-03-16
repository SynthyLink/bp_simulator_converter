import { Performer } from "../Performer";
import type { IPosition } from "./Interfaces/IPosition";
import type { IReferenceFrame } from "./Interfaces/IReferenceFrame";
import { Motion6DFrame } from "./Motion6DFrame";
import { ReferenceFrame } from "./ReferenceFrame";

export class Motion6DPerformer {

    static baseFrame: Motion6DFrame = new Motion6DFrame();

    public getBaseFrame(): ReferenceFrame {
        return Motion6DPerformer.baseFrame;
    }


    private performer: Performer = new Performer();

    public GetOwnFrame(position: IPosition): ReferenceFrame | undefined{
        var pp = this.performer.convertObject<IReferenceFrame, IPosition>(position, "IReferenceFrame")
        if (pp.length > 0) return pp[0].getOwnFrame();
        return this.getParentFrame(position);
    }



    public getFrame(position: IPosition): ReferenceFrame | undefined
    {
        var f = this.performer.convertObject<IReferenceFrame, IPosition>(position, "IReferenceFrame");
        if (f.length == 1) {
            return f[0].getOwnFrame();
        }
        return this.getParentFrame(position);
    }

    public getParentOwn(position: IPosition): ReferenceFrame | undefined{
        var p = position.getParentFrame();
        if (p === undefined) {
            return undefined;
        }
        var f = this.performer.convertObject<IReferenceFrame, IPosition>(p, "IReferenceFrame");
        if (f.length > 0) {
            return this.getParentFrame(f[0]);
        }
        return undefined;
    }

    public getParentFrame(position: IPosition): ReferenceFrame | undefined
    {
        let p = position.getParentFrame();
        if (p === undefined) {
            return this.getBaseFrame();
        }
        return (p as IReferenceFrame).getOwnFrame();
    }

    /*

        /// <summary>
        /// Parent frame
        /// </summary>
        /// <param name="position">Position</param>
        /// <returns>Parent frame</returns>
        static public ReferenceFrame GetParentFrame(this IPosition position)
        {
            if (position.Parent == null)
            {
                return Motion6DFrame.Base;
            }
            return performer.GetParentOwn(position);
        }

    */

    public getRelativeFrame(baseFrame: ReferenceFrame, targetFrame: ReferenceFrame, relative: ReferenceFrame): void
    {
        let bp = baseFrame.getPosition();
        let tp = targetFrame.getPosition()
        let bm = baseFrame.getMatrix();
        let rp = relative.getPosition();
        for (let i = 0; i < 3; i++)
        {
            rp[i] = 0;
            for (let j = 0; j < 3; j++)
            {
                rp[i] += bm[j][i] * (tp[i] - bp[i]);
            }
        }
        let tm = targetFrame.getMatrix();
        let rm = relative.getMatrix();
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                rm[i][j] = 0;
                for (let k = 0; k < 3; k++)
                {
                    rm[i][ j] += bm[k][i] * tm[k][j];
                }
            }
        }
    }
}