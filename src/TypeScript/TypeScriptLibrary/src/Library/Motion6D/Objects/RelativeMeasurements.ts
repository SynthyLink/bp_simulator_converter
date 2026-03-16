import { CategoryObject } from "../../CategoryObject";
import { FictiveAngularVelocityMotion6D } from "../../Fiction/FictiveAngularVelocityMotion6D";
import { FictiveOrientation } from "../../Fiction/FictiveOrientation";
import { FictivePosition } from "../../Fiction/FictivePosition";
import { FictiveVelocity } from "../../Fiction/FictiveVelocity";
import { FictiveMeasurement } from "../../Fiction/FicvtiveMeasurement";
import { RealMatrix } from "../../RealMatrixProcessor/RealMatrix";
import { EulerAngles } from "../../Vector3D/EulerAngles";
import { Vector3DProcessor } from "../../Vector3D/Vector3DProcessor";
import { Motion6DAcceleratedFrame } from "../Motion6DAcceleratedFrame";
import { Motion6DPerformer } from "../Motion6DPerformer";
import { ReferenceFrame } from "../ReferenceFrame";
import { FictiveAction } from "../../Fiction/FictiveAction";
import { OwnNotImplemented } from "../../ErrorHandler/OwnNotImplemented";
import { NumberMeasurement } from "../../Measurements/NumberMeasurement";
import type { IReferenceFrame } from "../Interfaces/IReferenceFrame";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IMeasurement } from "../../Measurements/Interfaces/IMeasurement";
import type { IAngularVelocityMotion6D } from "../Interfaces/IAngularVelocityMotion6D";
import type { IOrientation } from "../Interfaces/IOrientation";
import type { IPosition } from "../Interfaces/IPosition";
import type { IVelocity } from "../Interfaces/IVelocity";
import type { IAction } from "../../Interfaces/IAction";
import type { IMeasurements } from "../../Measurements/Interfaces/IMeasurements";


export class RelativeMeasurements extends CategoryObject implements IMeasurements {

    m6dPerformer: Motion6DPerformer = new Motion6DPerformer()



    protected vp: Vector3DProcessor = new Vector3DProcessor();

    protected realMatrix: RealMatrix = new RealMatrix();

    protected own: ReferenceFrame = new Motion6DAcceleratedFrame();

    protected relative: number[] = [0, 0, 0]

    protected mPerformer: Motion6DPerformer = new Motion6DPerformer();

    protected angles: EulerAngles = new EulerAngles(0, 0, 0);

    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.typeName = "RelativeMeasurements";
        this.types.push("IMeasurements");
        this.types.push("IPostSetArrow");
        this.types.push("RelativeMeasurements");
        this.createActions()
    }
    getMeasurementsCount(): number {
        return this.measurements.length;
    }
    getMeasurement(i: number): IMeasurement {
        return this.measurements[i]
    }

    updateMeasurements(): void {
        this.performer.executeAction(this.updateAll)
        this.performer.executeAction(this.updFrame)
    }

    protected source: IPosition = new FictivePosition();

    protected target: IPosition = new FictivePosition();

    protected vSource: IVelocity = new FictiveVelocity();

    protected vTarget: IVelocity = new FictiveVelocity();

    protected oSource: IOrientation = new FictiveOrientation();

    protected oTarget: IOrientation = new FictiveOrientation();

    protected aSource: IAngularVelocityMotion6D = new FictiveAngularVelocityMotion6D()


    protected aTarget: IAngularVelocityMotion6D = new FictiveAngularVelocityMotion6D()

    protected relativePos: number[] = [0, 0, 0]

    protected relativeP: number[] = [0, 0, 0]

    protected relativeVelocity: number[] = [0, 0, 0]


    protected quaternion: number[] = [0, 0, 0, 0]

    protected measurementFrame: IMeasurement = new FictiveMeasurement()

    protected measurements: IMeasurement[] = []

    protected distance: number = 0;

    protected velocity: number = 0;

    protected targetFrame: ReferenceFrame = new ReferenceFrame();

    protected relativeFrame: ReferenceFrame = new ReferenceFrame();


    protected omegaRProduct: number[] = [0, 0, 0]
    protected matrixPosition: number[] = [0, 0, 0]
    protected matrixVelocity: number[] = [0, 0, 0]
    protected omegaRelative: number[] = [0, 0, 0]
    protected aux: number[] = [0, 0, 0]

    private angularVelocity: IAngularVelocityMotion6D = new FictiveAngularVelocityMotion6D();

    private ivelocity: IVelocity = new FictiveVelocity();;



    updFrame: IAction = new FictiveAction();


    updateAll: IAction = new FictiveAction();


    updateFrameAct: IAction = new FictiveAction();

    updateFrameAngularVelocityAct: IAction = new FictiveAction();

    updateAngularVelocityAct: IAction = new FictiveAction();
    updateCoinVelocityAct: IAction = new FictiveAction();
    updateCoinDistanceAct: IAction = new FictiveAction();
    updateRelativePositionAct: IAction = new FictiveAction();
    updateOrientationCoordinatesAct: IAction = new FictiveAction();
    updateOrientationVelocityAct: IAction = new FictiveAction();
    updateQuaternionAct: IAction = new FictiveAction();
    addAngularVelocityAct: IAction = new FictiveAction();
    updateVelocityRotationAct: IAction = new FictiveAction();

    createActions(): void {
        this.updateFrameAct = new UpdateFrameAct(this)
        this.updateFrameAngularVelocityAct = new UpdateFrameAngularVelocityAct(this)
        this.updateAngularVelocityAct = new UpdateAngularVelocityAct(this);
        this.updateCoinVelocityAct = new UpdateCoinVelocityAct(this);
        this.updateCoinDistanceAct = new UpdateCoinDistanceAct(this);
        this.updateRelativePositionAct = new UpdateRelativePositionAct(this);
        this.updateOrientationCoordinatesAct = new UpdateOrientationCoordinatesAct(this)
        this.updateOrientationVelocityAct = new UpdateOrientationVelocityAct(this)
        this.updateQuaternionAct = new UpdateQuaternionAct(this)
        this.addAngularVelocityAct = new AddAngularVelocityAct(this)
        this.updateVelocityRotationAct = new UpdateVelocityRotationAct(this)
    }

    public updateFrame(): void {
        this.performer.copyArray(this.relativePos, this.relativeFrame.getPosition())
        this.performer.copyArray(this.quaternion, this.relativeFrame.getQuaternion())
        this.vp.quaternionToeulerAngles(this.angles, this.quaternion);

    }

    public updateFrameAngularVelocity(): void {
        this.performer.copyArray(this.omegaRelative, this.angularVelocity.getOmega())
    }



    public updateAngularVelocity(): void {
        this.realMatrix.multiplyLeft(this.aTarget.getOmega(), this.relativeFrame.getMatrix(), this.aux);
        let om = this.aSource.getOmega()
        for (let i = 0; i < 3; i++) {
            this.omegaRelative[i] = om[i] - this.aux[i];
        }
    }

    public updateCoinVelocity(): void {
        let vs = this.vSource.getVelocity();
        let vt = this.vTarget.getVelocity();
        let a = 0;
        for (let i = 0; i < 3; i++) {
            let x = vs[i] - vt[i];
            this.relativeVelocity[i] = x;
            a += x * this.relativePos[i];
        }
        this.velocity = a / this.distance;
        this.performer.copyArray(this.relativeVelocity, this.ivelocity.getVelocity())
    }

    public updateCoinDistance(): void {
        let y = this.source.getPosition();
        let x = this.target.getPosition();
        let a = 0;
        for (let i = 0; i < 3; i++) {
            let z = y[i] - x[i];
            this.relativePos[i] = z;
            a += z * z;
        }
        this.distance = Math.sqrt(a);
    }


    public updateRelativePosition(): void {
        let y = this.source.getPosition();
        let x = this.target.getPosition();
        let dist = 0
        for (let i = 0; i < 3; i++) {
            let dd = y[i] - x[i];
            dist += dd * dd;
            this.relative[i] = dd;
        }
        this.distance = Math.sqrt(dist);

        var f = this.m6dPerformer.GetOwnFrame(this.target);
        if (f === undefined) {

        }
        else {
            f.calculateRotatedPosition(this.relative, this.relativePos);
        }
    }


    protected getParameters(p: IPosition, velocity: IVelocity[], orientation: IOrientation[], om: IAngularVelocityMotion6D[]) {

        let pa = p
        if (velocity.length > 0) velocity.pop()
        if (om.length > 0) om.pop()
        if (orientation.length > 0) orientation.pop()

        let rf = this.performer.convertObject<IReferenceFrame, IPosition>(p, "IReferenceFrame")
        if (rf.length > 0) {
            let pp = rf[0].getOwnFrame()
            if (pp === undefined) {

            }
            else {
                pa = pp;

            }
        }
        let vf = this.performer.convertObject<IVelocity, IPosition>(pa, "IVelocity")
        this.performer.reoplaceArrayValue<IVelocity>(vf, velocity)
        let oof = this.performer.convertObject<IOrientation, IPosition>(pa, "IOrientation")
        this.performer.reoplaceArrayValue<IOrientation>(oof, orientation)
        let omf = this.performer.convertObject<IAngularVelocityMotion6D, IPosition>(pa, "IAngularVelocityMotion6D")
        this.performer.reoplaceArrayValue<IAngularVelocityMotion6D>(omf, om)

    }

    public getDistance(): number {
        return this.distance;
    }

    public getOmega(): number[] {
        return this.omegaRelative;

    }

    public getQuaternion(): number[] {
        return this.quaternion

    }

    public getCoordinate(): number[] {
        return this.relativePos
    }


    public getVelocity(): number[] {
        return this.relativeVelocity
    }

    public getVelocityScalar(): number {
        return this.velocity
    }

    private names: string[] = [
        "x", "y", "z", "Distance",
        "Vx", "Vy", "Vz", "Velocity", "Q0", "Q1", "Q2", "Q3", "Roll", "Pitch", "Yaw",
        "OMx", "OMy", "OMz", "A11", "A12", "A13", "A21", "A22", "A23", "A31", "A32", "A33"
    ]

    updateOrientation(x: number[], aux: number[]) {
        let m = this.oTarget.getMatrix();
        this.realMatrix.multiplyLeft(x, m, aux);
        this.performer.copyArray<number>(aux, x);
    }

    public updateOrientationCoordinates(): void {
        this.updateOrientation(this.relativePos, this.matrixPosition);
    }


    public updateOrientationVelocity(): void {
        this.updateOrientation(this.relativeVelocity, this.matrixVelocity);
    }

    public addAngularVelocity(): void {
        let om = this.aTarget.getOmega()
        this.vp.vectorProduct(this.relativePos, om, this.omegaRProduct);
        this.realMatrix.plusEqual(this.relativeVelocity, this.omegaRProduct);


    }
    public updateQuaternion(): void {
        this.vp.quaternionInvertMultiply(this.oTarget.getQuaternion(), this.oSource.getQuaternion(), this.quaternion);
        this.performer.copyArray<number>(this.quaternion, this.relativeFrame.getQuaternion())
        this.relativeFrame.setMatrix();

    }

    createAccMeasurements(): IMeasurement[] {
        return [];
    }



    createConside(): boolean {
        let ua: IAction | undefined;
        let rf = this.performer.convertObject<IReferenceFrame, IPosition>(this.target, "IReferenceFrame")
        if (rf.length == 0) {
            this.updateAll = this.updateCoinDistanceAct;
            this.measurements = [
                new DistanceMeasurement(this.names[3], this)
            ];
            return false;
        }
        let f = rf[0];
        let o = f.getOwnFrame()
        var p = this.m6dPerformer.GetOwnFrame(this.source);
        if (p == o) {
            return false;
        }
        ua = this.updateCoinDistanceAct;
        if ((this.oSource != undefined) && (this.oTarget != undefined)) {
            ua = this.performer.sumOfActions(ua, this.updateRelativePositionAct)
        }
        let vs = this.performer.convertObject<IVelocity, IPosition>(this.source, "IVelocity")
        let vt = this.performer.convertObject<IVelocity, IPosition>(this.target, "IVelocity")

        if ((vs.length > 0) && (vt.length > 0)) {
            this.vSource = vs[0]
            this.vTarget = vt[0]
            ua = this.performer.sumOfActions(ua, this.updateCoinVelocityAct)
        }
        let ot = this.performer.convertObject<IOrientation, IPosition>(this.target, "IOrientation")
        let os = this.performer.convertObject<IOrientation, IPosition>(this.source, "IOrientation")
        if (ot.length > 0) {
            this.oTarget = ot[0]
            ua = this.performer.sumOfActions(ua, this.updateOrientationCoordinatesAct)
            ua = this.performer.sumOfActions(ua, this.updateOrientationVelocityAct)
        }

        if (this.aTarget != undefined) {
            ua = this.performer.sumOfActions(ua, this.addAngularVelocityAct)
        }
        ua = this.performer.sumOfActions(ua, this.addAngularVelocityAct)
        if ((os.length > 0) && (ot.length > 0)) {
            ua = this.performer.sumOfActions(ua, this.updateQuaternionAct)
            ua = this.performer.sumOfActions(ua, this.addAngularVelocityAct)
            let vs = this.performer.convertObject<IVelocity, IPosition>(this.source, "IVelocity")
            let vt = this.performer.convertObject<IVelocity, IPosition>(this.target, "IVelocity")

            if ((vs.length > 0) && (vt.length > 0)) {
                ua = this.performer.sumOfActions(ua, this.updateVelocityRotationAct)
            }

        }
        if (ua === undefined) {

        } else {
            this.updateAll = ua;
        }
        return true;
    }

    public updateVelocityRotation(): void {
        let f = this.m6dPerformer.GetOwnFrame(this.target);
        if (f === undefined) {

        }
        else {
            f.calculateRotatedPosition(this.relativeVelocity, this.aux);
            this.performer.copyArray<number>(this.aux, this.relativeVelocity);
            this.performer.copyArray<number>(this.relativeVelocity, this.ivelocity.getVelocity());
        }
    }
}


class RelativeMeasurement extends NumberMeasurement {
    protected relative !: RelativeMeasurements

    constructor(name: string, relative: RelativeMeasurements) {
        super(name)
        this.relative = relative;
    }
}

class RelativeMeasurementNumber extends RelativeMeasurement {
    num: number = 0;
    constructor(name: string, relative: RelativeMeasurements, num: number) {
        super(name, relative)
        this.num = num
    }
}

class CoordMeasurement extends RelativeMeasurementNumber {
    constructor(name: string, relative: RelativeMeasurements, num: number) {
        super(name, relative, num)
    }

    getMeasurementValue() {
        return this.relative.getCoordinate()[this.num]
    }
}

class VelocityMeasurement extends RelativeMeasurementNumber {
    constructor(name: string, relative: RelativeMeasurements, num: number) {
        super(name, relative, num)
    }

    getMeasurementValue() {
        return this.relative.getVelocity()[this.num]
    }

}
class OmegaMeasurement extends RelativeMeasurementNumber {
    constructor(name: string, relative: RelativeMeasurements, num: number) {
        super(name, relative, num)
    }

    getMeasurementValue() {
        return this.relative.getOmega()[this.num]
    }

}

class QuaternionMeasurement extends RelativeMeasurementNumber {
    constructor(name: string, relative: RelativeMeasurements, num: number) {
        super(name, relative, num)
    }

    getMeasurementValue() {
        return this.relative.getQuaternion()[this.num]
    }

}

class DistanceMeasurement extends RelativeMeasurement {
    constructor(name: string, relative: RelativeMeasurements) {
        super(name, relative)
    }

    getMeasurementValue() {
        return this.relative.getDistance();
    }

}

class VelocityScalarMeasurement extends RelativeMeasurement {
    constructor(name: string, relative: RelativeMeasurements) {
        super(name, relative)
    }

    getMeasurementValue() {
        return this.relative.getVelocityScalar();
    }

}



class UpdateAct implements IAction {

    relative !: RelativeMeasurements

    constructor(relative: RelativeMeasurements) {
        this.relative = relative;
    }
    action(): void {
        throw new OwnNotImplemented();;
    }

}

class UpdateVelocityRotationAct extends UpdateAct {

    constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.updateVelocityRotation()
    }
}

class UpdateQuaternionAct extends UpdateAct {

    constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.updateQuaternion()
    }

}
class AddAngularVelocityAct extends UpdateAct {

    constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.addAngularVelocity()
    }

}


class UpdateOrientationCoordinatesAct extends UpdateAct {

    constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.updateOrientationCoordinates()
    }

}

class UpdateOrientationVelocityAct extends UpdateAct {

    constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.updateOrientationVelocity();
    }

}




class UpdateFrameAct extends UpdateAct {

   constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.updateFrame();
    }

}

class UpdateFrameAngularVelocityAct extends UpdateAct {
    constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.updateFrameAngularVelocity();
    }

}
class UpdateAngularVelocityAct extends UpdateAct {

    constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.updateAngularVelocity();
    }
}


class UpdateCoinVelocityAct extends UpdateAct {

        constructor(relative: RelativeMeasurements) {
            super(relative)
        }

    action(): void {
        this.relative.updateCoinVelocity();
    }

}
class UpdateRelativePositionAct extends UpdateAct  {

    constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.updateRelativePosition();
    }

}

class UpdateCoinDistanceAct extends UpdateAct {

    constructor(relative: RelativeMeasurements) {
        super(relative)
    }

    action(): void {
        this.relative.updateCoinDistance();
    }

}

