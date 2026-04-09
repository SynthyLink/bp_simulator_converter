"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Motion6DPerformer = void 0;
const Performer_1 = require("../Performer");
const Motion6DAcceleratedFrame_1 = require("./Motion6DAcceleratedFrame");
const Motion6DFrame_1 = require("./Motion6DFrame");
const ReferenceFrame_1 = require("./ReferenceFrame");
class Motion6DPerformer {
    constructor() {
        this.performer = new Performer_1.Performer();
    }
    getBaseFrame() {
        return Motion6DPerformer.baseFrame;
    }
    getOwnFrame(position) {
        var pp = this.performer.convertObject(position, "IReferenceFrame");
        if (pp.length > 0)
            return pp[0].getOwnFrame();
        return this.getParentFrame(position);
    }
    getFrame(position) {
        var f = this.performer.convertObject(position, "IReferenceFrame");
        if (f.length == 1) {
            return f[0].getOwnFrame();
        }
        return this.getParentFrame(position);
    }
    getParentOwn(position) {
        var p = position.getParentFrame();
        if (p === undefined) {
            return undefined;
        }
        var f = this.performer.convertObject(p, "IReferenceFrame");
        if (f.length > 0) {
            return this.getParentFrame(f[0]);
        }
        return undefined;
    }
    getParentFrame(position) {
        let p = position.getParentFrame();
        if (p === undefined) {
            return this.getBaseFrame();
        }
        return p.getOwnFrame();
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
    getRelative(baseFrame, relative) {
        let frame;
        let bf = this.performer.convertObject(baseFrame, "Motion6DAcceleratedFrame");
        let rf = this.performer.convertObject(relative, "Motion6DAcceleratedFrame");
        if ((bf.length > 0) && (rf.length > 0)) {
            frame = new Motion6DAcceleratedFrame_1.Motion6DAcceleratedFrame();
        }
        else {
            frame = new ReferenceFrame_1.ReferenceFrame();
        }
        frame.setReferenceFrame(baseFrame, relative);
        return frame;
    }
    getRelativeFrame(baseFrame, targetFrame, relative) {
        let bp = baseFrame.getPosition();
        let tp = targetFrame.getPosition();
        let bm = baseFrame.getMatrix();
        let rp = relative.getPosition();
        for (let i = 0; i < 3; i++) {
            rp[i] = 0;
            for (let j = 0; j < 3; j++) {
                rp[i] += bm[j][i] * (tp[i] - bp[i]);
            }
        }
        let tm = targetFrame.getMatrix();
        let rm = relative.getMatrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rm[i][j] = 0;
                for (let k = 0; k < 3; k++) {
                    rm[i][j] += bm[k][i] * tm[k][j];
                }
            }
        }
    }
}
exports.Motion6DPerformer = Motion6DPerformer;
Motion6DPerformer.baseFrame = new Motion6DFrame_1.Motion6DFrame();
//# sourceMappingURL=Motion6DPerformer.js.map