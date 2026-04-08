import { CategoryObject } from "../../../CategoryObject"
import { IDesktop } from "../../../Interfaces/IDesktop"
import { IPosition } from "../../Interfaces/IPosition"
import { IVisible } from "../../Visible/Interfaces/IVisible"

export class Basic3DShape extends CategoryObject implements IVisible {
    constructor(desktop: IDesktop, name: string) {
        super(desktop, name)
        this.typeName = "Basic3DShape"
        this.types.push("Basic3DShape")
    }
    getSaveGrahicalData(): Map<string, string> {
        return this.map
    }
    getVisibleSize(): number[][] {
        return this.size
    }
    setVisibleSize(size: number[][]): void {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.size[i][j] = size[i][j]
            }
        }
    }

    grahicalData: Map<string, string> = new Map();
    position !: IPosition

    size: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0], ]

    getObjectPosition(): IPosition {
        return this.position
    }
    setObjectPosition(position: IPosition): void {
        this.position = position
    }

    map: Map<string, string> = new Map()

}