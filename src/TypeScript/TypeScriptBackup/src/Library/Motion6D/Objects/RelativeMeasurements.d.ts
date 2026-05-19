import { CategoryObject } from "../../CategoryObject";
import { RealMatrix } from "../../RealMatrixProcessor/RealMatrix";
import { EulerAngles } from "../../Vector3D/EulerAngles";
import { Vector3DProcessor } from "../../Vector3D/Vector3DProcessor";
import { Motion6DPerformer } from "../Motion6DPerformer";
import { ReferenceFrame } from "../ReferenceFrame";
import type { IAction } from "../../Interfaces/IAction";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { IPostSetArrow } from "../../Interfaces/IPostSetArrow";
import type { IMeasurement } from "../../Measurements/Interfaces/IMeasurement";
import type { IMeasurements } from "../../Measurements/Interfaces/IMeasurements";
import type { IAngularVelocityMotion6D } from "../Interfaces/IAngularVelocityMotion6D";
import type { IOrientation } from "../Interfaces/IOrientation";
import type { IPosition } from "../Interfaces/IPosition";
import type { IVelocity } from "../Interfaces/IVelocity";
import { NumberMeasurement } from "../../Measurements/NumberMeasurement";
export declare class RelativeMeasurements extends CategoryObject implements IMeasurements, IMeasurement, IPostSetArrow {
    m6dPerformer: Motion6DPerformer;
    protected vp: Vector3DProcessor;
    protected realMatrix: RealMatrix;
    protected own: ReferenceFrame;
    protected relative: number[];
    protected mPerformer: Motion6DPerformer;
    protected angles: EulerAngles;
    coordMeasurements: IMeasurement[];
    velocityMeasurements: IMeasurement[];
    omegaMeasurements: IMeasurement[];
    quaternionMeasurements: IMeasurement[];
    angleMeasurements: IMeasurement[];
    velocityArr: IVelocity[];
    orientationArr: IOrientation[];
    omArr: IAngularVelocityMotion6D[];
    private names;
    constructor(desktop: IDesktop, name: string);
    postSetArrow(): void;
    getMeasurementName(): string;
    getMeasurementType(): string;
    getMeasurementValue(): ReferenceFrame;
    getMeasurementsCount(): number;
    getMeasurement(i: number): IMeasurement;
    updateMeasurements(): void;
    protected source: IPosition;
    protected target: IPosition;
    protected vSource: IVelocity;
    protected vTarget: IVelocity;
    protected oSource: IOrientation;
    protected oTarget: IOrientation;
    protected aSource: IAngularVelocityMotion6D;
    protected aTarget: IAngularVelocityMotion6D;
    protected relativePos: number[];
    protected relativeP: number[];
    protected relativeVelocity: number[];
    protected quaternion: number[];
    protected measurementFrame: IMeasurement;
    protected velocityScalar: IMeasurement;
    protected distanceScalar: IMeasurement;
    protected measurements: IMeasurement[];
    protected distance: number;
    protected velocity: number;
    protected targetFrame: ReferenceFrame;
    protected sourceFrame: ReferenceFrame;
    protected relativeFrame: ReferenceFrame;
    protected omegaRProduct: number[];
    protected matrixPosition: number[];
    protected matrixVelocity: number[];
    protected omegaRelative: number[];
    protected aux: number[];
    private angularVelocity;
    private ivelocity;
    updFrame: IAction;
    updateAll: IAction;
    updateFrameAct: IAction;
    updateFrameAngularVelocityAct: IAction;
    updateAngularVelocityAct: IAction;
    updateCoinVelocityAct: IAction;
    updateCoinDistanceAct: IAction;
    updateRelativePositionAct: IAction;
    updateOrientationCoordinatesAct: IAction;
    updateOrientationVelocityAct: IAction;
    updateQuaternionAct: IAction;
    addAngularVelocityAct: IAction;
    updateVelocityRotationAct: IAction;
    createActions(): void;
    updateFrame(): void;
    updateFrameAngularVelocity(): void;
    updateAngularVelocity(): void;
    updateCoinVelocity(): void;
    updateCoinDistance(): void;
    updateRelativePosition(): void;
    protected getParameters(p: IPosition, velocity: IVelocity[], orientation: IOrientation[], om: IAngularVelocityMotion6D[]): void;
    getDistance(): number;
    getOmega(): number[];
    getQuaternion(): number[];
    getCoordinate(): number[];
    getVelocity(): number[];
    getVelocityScalar(): number;
    updateOrientation(x: number[], aux: number[]): void;
    updateOrientationCoordinates(): void;
    updateOrientationVelocity(): void;
    addAngularVelocity(): void;
    updateQuaternion(): void;
    createAccMeasurements(): IMeasurement[];
    createConside(): boolean;
    updateVelocityRotation(): void;
    createCoordMeasurements(vel: IMeasurement[]): IMeasurement[];
    createQuatenionMeasurements(): IMeasurement[];
    createAngularVelicity(): IMeasurement[];
    createVelocityMeasurements(acc: IMeasurement[]): IMeasurement[];
    getSource(): IPosition;
    getTarget(): IPosition;
    setSource(value: IPosition): void;
    setTaget(value: IPosition): void;
    createMeasurements(): void;
    postCreateMeasurements(): void;
}
declare class RelativeMeasurement extends NumberMeasurement {
    protected relative: RelativeMeasurements;
    constructor(name: string, relative: RelativeMeasurements);
}
declare class RelativeMeasurementNumber extends RelativeMeasurement {
    num: number;
    constructor(name: string, relative: RelativeMeasurements, num: number);
}
export declare class CoordMeasurement extends RelativeMeasurementNumber {
    constructor(name: string, relative: RelativeMeasurements, num: number);
    getMeasurementValue(): number | undefined;
}
export declare class VelocityMeasurement extends RelativeMeasurementNumber {
    constructor(name: string, relative: RelativeMeasurements, num: number);
    getMeasurementValue(): number | undefined;
}
export declare class OmegaMeasurement extends RelativeMeasurementNumber {
    constructor(name: string, relative: RelativeMeasurements, num: number);
    getMeasurementValue(): number | undefined;
}
export declare class QuaternionMeasurement extends RelativeMeasurementNumber {
    constructor(name: string, relative: RelativeMeasurements, num: number);
    getMeasurementValue(): number | undefined;
}
export declare class DistanceMeasurement extends RelativeMeasurement {
    constructor(name: string, relative: RelativeMeasurements);
    getMeasurementValue(): number;
}
export declare class VelocityScalarMeasurement extends RelativeMeasurement {
    constructor(name: string, relative: RelativeMeasurements);
    getMeasurementValue(): number;
}
declare class UpdateAct implements IAction {
    relative: RelativeMeasurements;
    constructor(relative: RelativeMeasurements);
    action(): void;
    isEmptyAction(): boolean;
}
export declare class UpdateVelocityRotationAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class UpdateQuaternionAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class AddAngularVelocityAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class UpdateOrientationCoordinatesAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class UpdateOrientationVelocityAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class UpdateFrameAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class UpdateFrameAngularVelocityAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class UpdateAngularVelocityAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class UpdateCoinVelocityAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class UpdateRelativePositionAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export declare class UpdateCoinDistanceAct extends UpdateAct {
    constructor(relative: RelativeMeasurements);
    action(): void;
}
export {};
//# sourceMappingURL=RelativeMeasurements.d.ts.map