import type { IPositionObject } from "../../Interfaces/IPositionObject";

export interface IVisible extends IPositionObject {
    getVisibleSize(): number[][]
    setVisibleSize(size: number[][]): void
}