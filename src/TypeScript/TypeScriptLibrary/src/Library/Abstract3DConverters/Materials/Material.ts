import { IObject } from "../../Interfaces/IObject";
import { INamed } from "../../NamedTree/Interfaces/INamed";
import { Performer } from "../../Performer";

export class Material implements INamed, IObject {

    getNamedName(): string {
        return this.namedName
    }
    setNamedName(name: string): void {
        this.namedName = name
    }

    getName(): string {
        return this.namedName
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "Material";

    protected types: string[] = ["IObject", "INamed", "Material"];

    performer: Performer = new Performer()


    namedName: string = ""

}