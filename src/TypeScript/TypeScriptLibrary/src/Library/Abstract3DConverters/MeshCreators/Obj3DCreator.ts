import { IFactory } from "../../Interfaces/IFactory";
import { ColorTexture } from "../ColorTexture";
import { EffectTexture } from "../EffectTexture";
import { ImageTexture } from "../ImageTexture";
import { IMtlDetector } from "../Interfaces/IMtlDetector";
import { LinesMeshCreator } from "./LinesMeshCreator";

export class Obj3DCreator extends LinesMeshCreator {

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

