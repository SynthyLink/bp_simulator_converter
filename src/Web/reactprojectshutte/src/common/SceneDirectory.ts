import { IIODirectory } from "../../Library/IO/Interfaces/IIODirectory";
import { SceneHolder } from "../../scenes/SceneHolder";


export class SceneDirectory extends SceneHolder implements IIODirectory {
    constructor(object: any) {
        super(object);
        this.types.push("IIODirectory");
        this.types.push("SceneDirectory");
        this.typeName = "SceneDirectory";
    }

    getDirectoryFiles(directory: string): string[] {
        return this.scene.getDirectoryFiles(directory);
    }
}
