export declare class RealMatrix {
    createDiagonal(n: number, diag: number): number[][];
    partialSquare(x: number[], startIndex: number, length: number): number;
    partialNorm(x: number[], startIndex: number, length: number): number;
    plusEqual(x: number[], y: number[]): void;
    setLength(x: number[], n: number): void;
    setLength2(x: number[][], n: number, m: number): void;
    normalize(inp: number[], outp: number[], offset: number): number;
    getNorm(vector: number[]): number;
    copySign(a: number, b: number): number;
    invertA(a: number[][]): number[][];
    invert(a: number[][], aInverted: number[][]): void;
    det(a: number[][]): number;
    scalarProduct(x: number[], y: number[]): number;
    multiply(vector: number[], coefficient: number): void;
    multiplyMatrix(a: number[][], b: number[][], c: number[][]): void;
    square(vec: number[]): number;
    norm(vec: number[]): number;
    multiplyRight(matrix: number[][], vector: number[], product: number[]): void;
    multiplyLeft(vector: number[], matrix: number[][], product: number[]): void;
    transpose(x: number[][], y: number[][]): void;
    htah(h: number[][], a: number[][], result: number[][]): void;
    addMatrix(x: number[][], y: number[][], z: number[][]): void;
    addVector(x: number[], y: number[], z: number[]): void;
    diffatrix(x: number[][], y: number[][], z: number[][]): void;
    diffVector(x: number[], y: number[], z: number[]): void;
    lu_Factor(A: number[][], indx: number[]): boolean;
    lu_Solve(A: number[][], indx: number[], b: number[]): boolean;
    solve(a: number[][], indx: number[], b: number[]): boolean;
}
//# sourceMappingURL=RealMatrix.d.ts.map