import { ILoader } from "../../Interfaces/ILoader";
import { IGameLoaderFactory } from "../Interfaces/IGameLoaderFactory";

export abstract class AbstracGameLoaderFactory implements IGameLoaderFactory {
    abstract getLoader(object: any): ILoader

    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "CategoryArrow";

    protected types: string[] = ["IObject", "ICategoryArrow", "CategoryArrow"];

    protected name: string = "";

}