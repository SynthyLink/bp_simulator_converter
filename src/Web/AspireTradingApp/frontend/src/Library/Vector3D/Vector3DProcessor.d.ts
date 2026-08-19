import { RealMatrix } from "../RealMatrixProcessor/RealMatrix";
import { CollectionProcessor } from "../Utilities/Collections/CollectionProcessor";
import { EulerAngles } from "./EulerAngles";
export declare class Vector3DProcessor {
    protected realMatrix: RealMatrix;
    protected collectionProcessor: CollectionProcessor;
    quaternionNormalize(quaternion: number[]): void;
    quaternionToeulerAngles(angles: EulerAngles, quaternion: number[]): void;
    quaternionToeulerAnglesXYZW(angles: EulerAngles, x: number, y: number, z: number, w: number): void;
    rotateOmega(omega: number[], quaternion: number[], time: number): void;
    square3d(x: number[]): number;
    vectorProduct(x: number[], y: number[], z: number[]): void;
    quaternionMultiply(x: number[], y: number[], z: number[]): void;
    quaternionInvertMultiply(x: number[], y: number[], z: number[]): void;
    quaternionInvertOmega(quaterinon: number[], omegaIn: number[], omegaOut: number[]): void;
    quaternionToMatrix(q: number[], m: number[][], qq: number[][]): void;
    calculateDynamics(q: number[], der: number[], omega: number[], qd: number[][]): void;
    calculateDynamicsLong(q: number[], der: number[], m: number[][], omega: number[], qq: number[][], qd: number[][]): void;
    calculateQuaternionDerivation(quaternion: number[], omega: number[], quaternionDerivation: number[], auxQuaternion: number[]): void;
}
//# sourceMappingURL=Vector3DProcessor.d.ts.map