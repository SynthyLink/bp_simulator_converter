import { CategoryObject } from "../../../CategoryObject"
import { IDesktop } from "../../../Interfaces/IDesktop"
import { IStartPrimitive } from "../../../UI/IStartPrimitive"
import { IURLResourceHolder } from "../../../Web/Interface/IURLResourseHolder"
import { ResourceItem } from "../../../Web/ResourceItem"
import { WebPerformer } from "../../../Web/WebPerformer"
import { IPosition } from "../../Interfaces/IPosition"
import { IVisible } from "../../Visible/Interfaces/IVisible"

export class Basic3DShape extends CategoryObject implements IVisible,
    IStartPrimitive, IURLResourceHolder
{
    constructor(desktop: IDesktop, name: string) {
        super(desktop, name)
        this.typeName = "Basic3DShape"
        this.types.push("Basic3DShape")
        this.types.push("IVisible")
        this.types.push("IPositionObject")
        this.types.push("ISaveGrahicalData")
        this.types.push("IStartPrimitive")
    }


    getURLResources(): ResourceItem[] {
        return this.resources
    }
    addURLRource(name: string, url: string, type: string): void {
        var r = new ResourceItem(name, url, type)
        this.resources.push(r)
    }
    startPrimitive(): void {
       
    }
    getSaveGrahicalData(): Map<string, string> {
        return this.grahicalData;
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

    wPerformer: WebPerformer = new WebPerformer();

    protected postCreateResources(map: Map<string, string>): void {
        this.resources = this.wPerformer.createResources(map)
    }


    resources: ResourceItem[] = []
    grahicalData: Map<string, string> = new Map();

    position !: IPosition

    size: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0], ]

    getObjectPosition(): IPosition {
        return this.position
    }
    setObjectPosition(position: IPosition): void {
        this.position = position
    }

}

