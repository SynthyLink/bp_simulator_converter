import { RealMatrix } from "../RealMatrixProcessor/RealMatrix";
export declare class Vector3Double {
    constructor(x: number[]);
    protected realMatrix: RealMatrix;
    protected x: number[];
    copyFromArray(array: number[], offset: number): void;
    copyFrom(vector: Vector3Double): void;
    getNorm(): number;
}
//# sourceMappingURL=Vector3Double.d.ts.map