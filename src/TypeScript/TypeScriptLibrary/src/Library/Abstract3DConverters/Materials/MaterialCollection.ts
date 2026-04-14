import { IChildrenT } from "../../NamedTree/Interfaces/IChildrenT";
import { Material } from "./Material";

export class MaterialCollection extends Material implements IChildrenT<Material>
{
    constructor() {
        super()
        this.types.push("IChildrenT<Material>")
        this.types.push("MaterialCollection")
    }
    getChildernT(): Material[] {
        return this.materials;
    }
    addChildT(child: Material): void {
        this.materials.push(child)
    }
    removeChildT(child: Material): void {
        this.performer.remove<Material>(this.materials, child)
    }

    


    materials: Material[] = []
}