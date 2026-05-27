import type { IChildrenT } from "../../NamedTree/Interfaces/IChildrenT";
import { MaterialTexture } from "./MaterialTexture";

export class MaterialGroup extends MaterialTexture implements IChildrenT<MaterialTexture>
{
    constructor(name: string) {
        super(name)
        this.types.push("IChildrenT<Material>")
        this.types.push("MaterialGroup")
        this.typeName = "MaterialGroup"
    }
    getChildernT(): MaterialTexture[] {
        return this.materials;
    }
    addChildT(child: MaterialTexture): void {
        this.materials.push(child)
    }
    removeChildT(child: MaterialTexture): void {
        this.performer.remove<MaterialTexture>(this.materials, child)
    }

    


    materials: MaterialTexture[] = []
}