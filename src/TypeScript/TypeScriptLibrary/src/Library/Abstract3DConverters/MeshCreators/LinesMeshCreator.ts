import { IFactory } from "../../Interfaces/IFactory";
import { EffectTexture } from "../EffectTexture";
import { IMesh } from "../Interfaces/IMesh";
import { IMeshCreator } from "../Interfaces/IMeshCreator";
import { IMeshCreatorTextConverter } from "../Interfaces/IMeshCreatorTextConverter";

export abstract class LinesMeshCreator implements IMeshCreator
{

    constructor(url:  string, obj: any, factory: IFactory) {
        this.url = url
        this.factory = factory
        this.obj = obj;
        let tc = factory.getFactory<IMeshCreatorTextConverter>("IMeshCreatorTextConverter")
        if (tc != undefined) {
            this.textConverter = tc
        }
    }

    loadMeshCreator(): void {
        this.text = this.textConverter.convertToText(this.obj, this.url)
        this.loadText(this.text)
    }


    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }


    getMeshCreatorURL(): string {
        return this.url;
    }


    getMeshCreatorMeshes(): IMesh[] {
        return this.meshes
    }

    getMeshCreatorEffects(): Map<string, EffectTexture> {
        return this.effects
    }

    getMeshCreatorFactory(): IFactory {
        return this.factory;
    }
    getMeshCreatorGenerator() {
        return this.obj;
    }


    loadText(text: string[]): void {
        this.lines = text;
    }


    effects: Map<string, EffectTexture> = new Map()

    meshes: IMesh[] = []


    protected text: string[] = []

    protected url: string = "";

    protected factory: IFactory

    protected obj: any

    protected typeName: string = "LinesMeshCreator";

    protected types: string[] = ["IObject", "IMeshCreator", "LinesMeshCreator"];

    protected name: string = ""

    protected textConverter !: IMeshCreatorTextConverter

    protected lines: string[] = []


}