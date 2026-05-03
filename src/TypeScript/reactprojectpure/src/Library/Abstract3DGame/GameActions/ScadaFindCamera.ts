import { EmptyGameObject } from "../../Game/Abstract/EmptyGameObject";
import { IScene } from "../../Game/Interfaces/IScene";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";
import { IFindCamera } from "../Interfaces/IFindCamera";

export  class ScadaFindCamera extends EmptyGameObject implements IFindCamera {
    functT(s: IScene): BasicCamera | undefined {
        var sc = this.performer.sceneToScada(s)
        if (sc === undefined) return undefined
        var ob = sc.getScadaObject<BasicCamera>(this.name, "BasicCamera")
        if (ob.length > 0) return ob[0]
        return undefined
    }
    constructor(name: string) {
        super(name)
        this.types.push("IFindCamera")
        this.types.push("ScadaFindCamera")
        this.typeName = "ScadaFindCamera"
    }

}