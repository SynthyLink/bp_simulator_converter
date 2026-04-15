import { IFactory } from "../../Interfaces/IFactory";
import { Effect } from "../Effect";
import { IMesh } from "../Intersaces/IMesh";
import { IMtlDetector } from "../Intersaces/IMtlDetector";
import { LinesMeshCreator } from "./LinesMeshCreator";

export class Obj3DCreator extends LinesMeshCreator {

    constructor(url: string, sep: string, obj:  any, factory: IFactory) {
        super(url, "\n", obj, factory)
        this.mtlDetetctor = factory.getFactory<IMtlDetector>("IMtlDetector")
    }
    loadText(text: string[]): void {
        this.lines = text
        this.createMaterials()
    }

    getMeshes(): IMesh[] {
        return this.meshes
    }
    getEffects(): Map<string, Effect> {
        return this.effects
    }

    createMaterials(): void {
        for (let line in this.lines) {
            if (line.indexOf(this.mtll) == 0) {
                var url = line.substring(this.mtll.length)
                this.materialLines = this.mtlDetetctor.detectMtl(url, this.obj)
            }
        }
    }

    effects: Map<string, Effect> = new Map()

    meshes: IMesh[] = []

    mtlDetetctor: IMtlDetector

    lines: string[] = []

    materialLines: string[] = [];

    mtll: string = "mtllib "
}