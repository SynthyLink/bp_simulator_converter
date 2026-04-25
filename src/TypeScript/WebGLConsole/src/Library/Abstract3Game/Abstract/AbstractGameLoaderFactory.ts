import { ILoader } from "../../Interfaces/ILoader";
import { IObject } from "../../Interfaces/IObject";
import { IGameLoaderFactory } from "../Interfaces/IGameLoaderFactory";

export abstract class AbstractGameLoaderFactory implements IObject, IGameLoaderFactory {
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

    protected typeName: string = "AbstracGameLoaderFactory";

    protected types: string[] = ["IObject", "IGameLoaderFactory", "AbstracGameLoaderFactory"];

    protected name: string = "";

}