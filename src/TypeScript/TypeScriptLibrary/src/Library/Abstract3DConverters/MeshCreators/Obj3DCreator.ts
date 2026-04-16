import { IFactory } from "../../Interfaces/IFactory";
import { ColorTexture } from "../ColorTexture";
import { EffectTexture } from "../EffectTexture";
import { ImageTexture } from "../ImageTexture";
import { IEffectDitionary } from "../Interfaces/IEffectDitionary";
import { IMaterialCreator } from "../Interfaces/IMaterialCreator";
import { IMtlDetector } from "../Interfaces/IMtlDetector";
import { Material } from "../Materials/Material";
import { LinesMeshCreator } from "./LinesMeshCreator";

class MtlWrapper implements IEffectDitionary {
    constructor(obj: any, name : string, factory: IFactory, start: number, lines: string[], effects: Map<string, EffectTexture>,
        directory: string) {
        this.name = name
        this.factory = factory
        this.obj = obj
        this.lines = lines
        this.directory = directory
    }
    /* string str, int start, List<string> lines,
    Dictionary<string, Effect> effects, string directory*/
    getEffectDictionary(): Map<string, EffectTexture> {
        return this.effects
    }
    public сreateFromMaterials(keyValuePairs: Map<string, Material>,
        creator: IMaterialCreator): Map<string, any> {
        let d: Map<string, any> = new Map();
        for (var pair of keyValuePairs.entries()) {
            let mat = pair[1]
            var v = creator.createFromMaterial(mat)
            d.set(pair[0], v)
        }
        return d;
    }

    createFromLines(lines: string[], start: number, defaultEffect: EffectTexture[]): Map<string, EffectTexture> {
        if (defaultEffect.length > 0) {
            defaultEffect.pop()
        }
        var name = "";
        var i = start;
        for (; i < lines.length; i++) {
            var line = lines[i];
            if (line.indexOf("newmtl") >= 0) {
                var ss = line.split(" ")
                name = ss[ss.length - 1];
                break;
            }

        }
        new MtlWrapper(this.obj, name, this.factory, i + 1, this.lines, this.dict, this.directory);
        return this.dict;

    }

    effects: Map<string, EffectTexture> = new Map()
    name: string = ""
    obj: any
    factory !: IFactory
    lines: string[] = []
    directory: string = ""
    dict: Map<string, EffectTexture> = new Map();
    ka !: ImageTexture
    kd !: ImageTexture
    ks !: ImageTexture

    ambient !: ColorTexture
    emissive !: ColorTexture
    specular !: ColorTexture

    ns: number = 0
    ni: number = 0
    d: number = 0
    illum: number = 0

    effect !: EffectTexture

    default !: EffectTexture


}
export class Obj3DCreator extends LinesMeshCreator {

    constructor(url: string,  obj:  any, factory: IFactory) {
        super(url, obj, factory)
    }
 
    mtlDetetctor !: IMtlDetector


    materialLines: string[] = [];

    mtll: string = "mtllib "

    loadText(text: string[]): void {
        super.loadText(text)
    }

}

