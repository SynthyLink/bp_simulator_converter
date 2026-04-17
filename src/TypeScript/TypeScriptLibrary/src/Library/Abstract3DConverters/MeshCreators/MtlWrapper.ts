import { Performer } from "../../Performer";
import { ColorTexture } from "../ColorTexture";
import { Converter3DPefrormer } from "../Converter3DPerformer";
import { EffectTexture } from "../EffectTexture";
import { ImageTexture } from "../ImageTexture";
import { DiffuseMaterial } from "../Materials/DiffuseMaterial";
import { EmissiveMaterial } from "../Materials/EmissiveMaterial";
import { Material } from "../Materials/Material";
import { PhongMaterial } from "../Materials/PhongMaterial";
import { SpecularMaterial } from "../Materials/SpecularMaterial";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IEffectDitionary } from "../Interfaces/IEffectDitionary";
import type { IMaterialCreator } from "../Interfaces/IMaterialCreator";

class MtlWrapper implements IEffectDitionary {
    effects: Map<string, EffectTexture> = new Map();
    name: string = "";
    obj: any;
    factory!: IFactory;
    lines: string[] = [];
    directory: string = "";
    dict: Map<string, EffectTexture> = new Map();
    ka!: ImageTexture;
    kd!: ImageTexture;
    ks!: ImageTexture;

    ambient!: ColorTexture;
    emissive!: ColorTexture;
    specular!: ColorTexture;
    diffuse!: ColorTexture;

    ns: number = 0;
    ni: number = 0;
    d: number = 0;
    illum: number = 0;

    effect!: EffectTexture;

    default!: EffectTexture;

    cPerformer: Converter3DPefrormer = new Converter3DPefrormer()

    performer : Performer = new Performer()


    constructor(obj: any, name: string, factory: IFactory, start: number, lines: string[], effects: Map<string, EffectTexture>,
        directory: string) {
        this.name = name;
        this.factory = factory;
        this.obj = obj;
        this.lines = lines;
        this.directory = directory;
    }
    /* string str, int start, List<string> lines,
    Dictionary<string, Effect> effects, string directory*/
    getEffectDictionary(): Map<string, EffectTexture> {
        return this.effects;
    }
    public сreateFromMaterials(keyValuePairs: Map<string, Material>,
        creator: IMaterialCreator): Map<string, any> {
        let d: Map<string, any> = new Map();
        for (var pair of keyValuePairs.entries()) {
            let mat = pair[1];
            var v = creator.createFromMaterial(mat);
            d.set(pair[0], v);
        }
        return d;
    }

    createFromLines(lines: string[], start: number, defaultEffect: EffectTexture[]): Map<string, EffectTexture> {
        if (defaultEffect.length > 0) {
            defaultEffect.pop();
        }
        var name = "";
        var i = start;
        for (; i < lines.length; i++) {
            var line = lines[i];
            if (line.indexOf("newmtl") >= 0) {
                var ss = line.split(" ");
                name = ss[ss.length - 1];
                break;
            }

        }
        new MtlWrapper(this.obj, name, this.factory, i + 1, this.lines, this.dict, this.directory);
        return this.dict;

    }

    createEmpty(): void {
        if (this.effect != undefined) {
            return;
        }
        if (this.diffuse == undefined) {
           this.diffuse = new ColorTexture([1, 1, 1]);
        }
        let mat = new PhongMaterial(this.name);
        if (this.diffuse != undefined) {
            if (this.ambient == undefined) {
                this.ambient = new ColorTexture([1,1,1]);
            }
            var diff = new DiffuseMaterial("", this.diffuse, this.ambient, this.d);
            //diffuse.Texture = Kd;
            mat.addChildT(diff);
        }
        if (this.emissive == undefined) {
            this.emissive = new ColorTexture([1,  1, 1])
        }
        if (this.emissive != undefined) {
            var emis = new EmissiveMaterial("", this.emissive, this.ka)
            mat.addChildT(emis);
        }
        if (this.specular != null) {
            var spec= new SpecularMaterial("",this.specular, this.ns);
            mat.addChildT(spec);
        }
        let dn: Map<string, EffectTexture> = new Map()
        this.effect = new EffectTexture(dn, this.name, mat as Material, this.kd)

    }

    public getEffect(): EffectTexture {
        this.createEmpty()
        return this.effect
    }

    finalize(list: string[], directory: string) {
        for (let s of list) {
            if (s.length == 0) {
                continue;
            }
            var t = s.trim();
            var n = t.indexOf(" ");
            var name = t.substring(0, n);
            var value = t.substring(n + 1);
            switch (name) {
                /// The ambient color of the material is declared using Ka. Color definitions are in RGB where each channel's 
                /// value is between 0 and 1.

                case "Ka":
                    this.ambient = this.cPerformer.stringToColor(value, false)
                    break;
                case "Kd":
                    //  Similarly, the diffuse color is declared using Kd.
                    this.diffuse = this.cPerformer.stringToColor(value, false)
                    break;
                case "Ks":
                    //         The specular color is declared using Ks, and weighted using the specular exponent Ns.
                    this.specular = this.cPerformer.stringToColor(value, false)
                    break;
                case "Ke":
                    //         The specular color is declared using Ks, and weighted using the specular exponent Ns.
                    this.emissive = this.cPerformer.stringToColor(value, false)
                    break;

                // the ambient texture map
                case "map_Ka":
                    this.ka = new ImageTexture(value, directory);
                    break;
                // the diffuse texture map 
                case "map_Kd":
                    this.kd = new ImageTexture(value, directory);
                    break;

                //# specular color texture map
                case "map_Ks":
                    this.ks = new ImageTexture(value, directory);
                    break;
                case "Ns":
                    /// Specular exponent ranges between 0 and 1000                        Ns 10.000            
                    this.ns = this.toFloat(value);
                    break;
                case "Ni":
                    // # optical density Values can range from 0.001 to 10
                    this.ni = this.toFloat(value);
                    break;
                case "d":
                    // some implementations use 'd' d 0.9 # others use 'Tr' (inverted: Tr = 1 - d) Tr 0.1
                    this.d = this.toFloat(value);
                    break;
                case "Tr":
                    this.d = 1 - this.toFloat(value);
                    break;
                //            illumination model
                case "illum":
                    this.illum = this.toFloat(value);
                    break;
                default:
                    break;

            }
        }
    }

    toFloat(s: string): number {
        return this.performer.convert < string, number>(s)
    }
}


