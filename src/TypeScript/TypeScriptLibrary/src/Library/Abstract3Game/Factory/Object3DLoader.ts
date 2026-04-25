import { IObject } from "../../Interfaces/IObject";
import { Basic3DShape } from "../../Motion6D/Objects/Shapes/Basic3DShape";
import { Scene3DMesh } from "../SceneObjects/Scene3DMesh";
import { BasicGameLoader } from "./BasicGameLoader";

export class Object3DLoader extends BasicGameLoader {

    loadObject(parent: IObject, child: IObject): void {
        super.loadObject(parent, child)
        var className = child.getClassName()
        switch (className) {
            case "Basic3DShape":
                var b = child as unknown as Basic3DShape
                new Scene3DMesh(this.scene, b)
        }
    }

}