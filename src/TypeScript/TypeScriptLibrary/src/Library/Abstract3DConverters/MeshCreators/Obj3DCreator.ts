import type { IFactory } from "../../Interfaces/IFactory";
import { ColorTexture } from "../ColorTexture";
import { EffectTexture } from "../EffectTexture";
import { ImageTexture } from "../ImageTexture";
import { IMtlDetector } from "../Interfaces/IMtlDetector"
import { DiffuseMaterial } from "../Materials/DiffuseMaterial";
import { MaterialGroup } from "../Materials/MaterialGroup";
import { LinesMeshCreator } from "./LinesMeshCreator";
import { MtlWrapper } from "./MtlWrapper";

export class Obj3DCreator extends LinesMeshCreator {
    effectsPrivate: Map<string, EffectTexture> = new Map()
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



    constructor(url: string, obj: any, factory: IFactory) {
        super(url, obj, factory)
    }

    mtlDetetctor !: IMtlDetector


    materialLines: string[] = [];

    mtll: string = "mtllib "

    loadText(text: string[]): void {
        super.loadText(text)
    }


    createMaterialsFromLUrl(url: string, eff: EffectTexture[]): Map<string, EffectTexture> {
        let lines = this.loadStrings(url)
        return this.createMaterialsFromLines(lines, eff);
    }

    createMaterialsFromLines(lines: string[], eff: EffectTexture[]): Map<string, EffectTexture> {

        let mtl = new MtlWrapper(this.obj, "", this.factory, 0, lines, this.dict, "")
        let et: EffectTexture[] = []
        let mt = mtl.createFromLines(lines, 0, et)
        if (mt.has("Default")) {
            var def = mt.get("Default");
            if (def != undefined) {
                this.default = def
            }
        }
        for (let item of mt) {
            var key = item[0]
            if (key == "Default") {
                continue
            }
            if (!this.effectsPrivate.has(key)) {
                this.effectsPrivate.set(key, item[1])
            }

        }
        return mt

    }

    getMeshCreatorEffects(): Map<string, EffectTexture> {
        var eff = this.effectsPrivate;
        if (this.default == undefined) {
            return eff;
        }
        let e: Map<string, EffectTexture> = new Map();
        this.performer.copyMap(this.effectsPrivate, e)
        e.set("Default", this.default)
        return e;

    }
    
    createEffect(f: string): EffectTexture {
        var fd = this.toShiftString(f, "usemtl");
        var file = this.fileio.existsFile(fd);
        let image !: ImageTexture ;
        var inm = "";
        if (file != null) {
            inm = this.path.getFileName(fd);
            image = new ImageTexture(inm, this.getMeshCreatorDirectory())
        }
        var ff: number[] = [1,1,1,1] 
        var d = new DiffuseMaterial("", new ColorTexture(ff), new ColorTexture(ff), 1)
        let  mat = new MaterialGroup(f);
        mat.addChildT(d);
        return new EffectTexture(this.effectsPrivate, inm, mat, image);
    }
    

    createMaterials(): void {
        try {
            let def !: EffectTexture;
            let eff: EffectTexture[] = []
            let mt: Map<string, EffectTexture> = new Map()
            if (this.materialLines.length > 0) {
                mt = this.createMaterialsFromLines(this.materialLines, eff)
                if (eff.length > 0) this.default = eff[0]
            }
            else
            {
                for (var line of this.lines) {
                    if (line.indexOf("mtllib ") == 0) {
                        var file = line.substring("mtllib ".length).trim();
                        mt = this.createMaterialsFromLUrl(file, eff)
                        if (eff.length > 0) this.default = eff[0]
                    }
                    if (this.effectsPrivate.size == 0 && this.default == undefined) {
                        for (let l of this.lines) {
                            let p = this.toShiftString(l, "usemtl")
                            if (p.length > 0) this.createEffect(p)
                        }
                    }
                    if (this.effectsPrivate.has("_default_")) {
                        let def = this.effectsPrivate.get("_default_")
                        if (def != undefined) {
                            this.default = def
                        }
                    }

                }
                if (this.default == undefined && this.effectList.length == 0) {
                    let file: string = ""
                    let files = this.directoryio.getDirectoryFiles(this.directory)
                    for (var f of files)
                    {
                        if (this.path.getFileExtension(f) == ".mtl") {
                            this.createMaterialsFromLUrl(file, eff)
                            if (eff.length > 0) this.default = eff[0]
                            break;
                        }
                    }
              }
            }
        }
        catch (e) {

        }
    }
}
     /*        }
             if (this.effectsPrivate.size == 0 && this.default == undefined) {
                var l = (from line in lines
                                 where s.ToString(line, "usemtl") != null
                select
                CreateEffect(line)).ToArray();
                //          var l = lines.Select(str => s.ToString(str)); ;
            }
            if (EffectsPrivate.ContainsKey("_default_")) {
                Default = EffectsPrivate["_default_"];
            }
            if (Default == null & EffectList.Count == 0) {
                        string file = null;
                if (StaticExtensionAbstract3DConverters.CheckFile == CheckFile.Check) {
                    var files = System.IO.Directory.GetFiles(creator.Directory);
                    foreach(var f in files)
                    {
                        if (Path.GetExtension(f) == ".mtl") {
                            CreateMaterials(f, out def);
                            break;
                        }
                    }
                    if (EffectsPrivate.Count == 0 & Default == null) {
                        if (files.Length == 2) {
                            foreach(var f in files)
                            {
                                if (Path.GetFileName(f) != Path.GetFileName(creator.Filename)) {
                                    file = f;
                                    break;
                                }
                            }
                        }
                    }
                    if (file != null) {
                        if (StaticExtensionAbstract3DConverters.DetectImage(file)) {
                            Default = CreateEffectFromImage(file);
                        }
                    }
                }
            }
        }
    }
    catch (Exception e)
    {
        e.HandleException("Create materials OBJ");
    }

}

}*/

