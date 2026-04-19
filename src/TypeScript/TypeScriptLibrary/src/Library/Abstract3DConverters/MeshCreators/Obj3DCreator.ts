import type { IFactory } from "../../Interfaces/IFactory";
import type { IMtlDetector } from "../Interfaces/IMtlDetector"
import { ColorTexture } from "../ColorTexture";
import { EffectTexture } from "../EffectTexture";
import { ImageTexture } from "../ImageTexture";
import { DiffuseMaterial } from "../Materials/DiffuseMaterial";
import { MaterialGroup } from "../Materials/MaterialGroup";
import { LinesMeshCreator } from "./LinesMeshCreator";
import { MtlWrapper } from "./MtlWrapper";
interface idx {
    effect: EffectTexture; indx: number[][][]
};

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

    nm: number = 0

    usedMaterials: string[] = []

    objs: string = "# object "

    fiction: string = "rrg5dvmg.bil";

    names: string[] = []


    tuple !: idx



    constructor(url: string, directory: string, obj: any, factory: IFactory) {
        super(url, directory, obj, factory)
    }

    mtlDetetctor !: IMtlDetector


    materialLines: string[] = [];

    mtll: string = "mtllib "

    loadLines(): void {
        this.createMaterials()
    }

    iindexes: idx[][] = []


    createMaterialsFromLUrl(url: string, eff: EffectTexture[]): Map<string, EffectTexture> {
        let lines = this.loadStrings(url)
        return this.createMaterialsFromLines(lines, eff);
    }

    getMeshName(): string {
        ++this.nm;
        return "Mesh_" + this.nm;
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
        let image !: ImageTexture;
        var inm = "";
        if (file != null) {
            inm = this.path.getFileName(fd);
            image = new ImageTexture(inm, this.getMeshCreatorDirectory())
        }
        var ff: number[] = [1, 1, 1, 1]
        var d = new DiffuseMaterial("", new ColorTexture(ff), new ColorTexture(ff), 1)
        let mat = new MaterialGroup(f);
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
            else {
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
                    for (var f of files) {
                        if (this.path.getFileExtension(f) == ".mtl") {
                            this.createMaterialsFromLUrl(file, eff)
                            if (eff.length > 0) this.default = eff[0]
                            break;
                        }
                    }
                    if (file.length >= 0) {
                        if (this.detecctImage(file)) {
                            this.default = this.createEffectFromImage(file);
                        }
                    }
                }

            }
        }
        catch (e) {

        }
    }

    createEffectFromImage(f: string): EffectTexture {
        let image = new ImageTexture(f, this.getMeshCreatorDirectory());
        let ff: number[] = [1, 1, 1, 1]
        let d = new DiffuseMaterial("", new ColorTexture(ff), new ColorTexture(ff), 1);
        let mat = new MaterialGroup(f);
        mat.addChildT(d);
        return new EffectTexture(this.dict, f, mat, image);
    }

    detect(st: string): EffectTexture | undefined {
        if (this.effectsPrivate.has(st)) {
            let es = this.effectsPrivate.get(st);
            if (es != undefined) return es
        }
        var s = st.replace("_", " ");
        if (this.effectsPrivate.has(s)) {
            let es = this.effectsPrivate.get(st);
            if (es != undefined) return es
        }
        for (var ee of this.effectsPrivate) {
            var fn = this.path.getFileNameWithoutExtension(ee[0]);
            if (fn == st) {
                return ee[1];
            }
        }
        return undefined;
    }



    getInitial(line: string): string | undefined {
        var n = this.toShiftString(line, this.objs);
        if (line.indexOf("usemtl ") == 0) {
            var mat = line.substring("usemtl ".length);
            var effect = this.detect(mat);
            if (effect != undefined) this.effectList.push(effect);
            if (!this.usedMaterials.includes(mat)) {
                this.usedMaterials.push(mat);
            }
            return this.getMeshName();
        }
        return undefined

    }

    CreateDefaultGeometry(): void {
        try {
            var effect = this.default;
            let indexes: idx[] = []
            this.iindexes.push(indexes);
            this.tuple = { effect: effect, indx: [] }
            indexes.push(this.tuple)

            for (var line of this.lines) {
                if (line.indexOf("v ") == 0) {
                    var f = this.toRealArray(line.substring("v ".length).trim());
                    this.vertices.push(f)
                    continue;
                }
                if (line.indexOf("vt ") == 0) {
                    var f = this.toRealArray(line.substring("vt ".length).trim());
                    this.addTexture(this.textures, f);
                    continue;
                }
                if (line.indexOf("vn ") == 0) {
                    var f = this.toRealArray(line.substring("vn ".length).trim());
                    this.normals.push(f);
                    continue;
                }
                if (line.indexOf("f ") == 0) {
                    var s = line.substring("f ".length).trim();
                    var ss = s.split(" ");
                    if (ss.length != 3) {

                    }
                    let ind: number[][] = []
                    for (var i = 0; i < ss.length; i++) ind.push([])
                    for (var j = 0; j < ss.length; j++) {
                        var sss = ss[j].split("/")
                        var ii = [-1, -1, -1]
                        ind[j] = ii;
                        //var k =  new int[sss.Length];
                        for (var m = 0; m < sss.length; m++) {
                            if (sss[m].length == 0) {
                                ii[m] = -1;
                            }
                            else {
                                ii[m] = this.performer.convert<string, number>(sss[m]) - 1;// Shifts[m];
                            }
                        }
                    }
                    this.tuple.indx.push(ind);
                    continue;
                }

            }
        }
        catch (e) {

        }
    }
    createNamedGeometry(): void {
        // GetName = GetInititial;
        try {
            let indexes: idx[] = []
            for (let k = 0; k < this.lines.length; k++) {
                var line = this.lines[k];
                var name = this.getInitial(line);
                if (name != undefined) {
                    if (name != this.fiction) {
                        this.names.push(name);
                        indexes = [];
                        this.iindexes.push(indexes);
                        if (line.indexOf("usemtl ") == 0) {
                            var mat = line.substring("usemtl ".length);
                            if (mat == "_default_") {
                                continue;
                            }
                            var effect = this.detect(mat);
                            if (effect != undefined) {
                                this.effectList.push(effect);
                            }
                            if (!this.usedMaterials.includes(mat)) {
                                this.usedMaterials.push(mat);
                            }
                            if (effect != undefined) {
                                this.tuple = { effect: effect, indx: [] }
                            }
                            this.iindexes.push([this.tuple]);
                            continue;
                        }
                        continue;
                    }
                    else {
                    }
                }
                if (line.indexOf("usemtl ") == 0) {
                    var mat = line.substring("usemtl ".length);
                    if (mat == "_default_") {
                        continue;
                    }
                    var effect = this.effectsPrivate.get(mat);
                    if (effect != undefined) this.effectList.push(effect);
                    if (!this.usedMaterials.includes(mat)) {
                        this.usedMaterials.push(mat);
                    }
                    if (effect != undefined) {
                        this.tuple = { effect: effect, indx: [] }
                    }
                    this.iindexes.push([this.tuple]);
                    continue;
                }

                if (line.indexOf("v ") == 0) {
                    var f = this.toRealArray(line.substring("v ".length).trim());
                    this.vertices.push(f)
                    continue;
                }
                if (line.indexOf("vt ") == 0) {
                    var f = this.toRealArray(line.substring("vt ".length).trim());
                    this.addTexture(this.textures, f);
                    continue;
                }
                if (line.indexOf("vn ") == 0) {
                    var f = this.toRealArray(line.substring("vn ".length).trim());
                    this.normals.push(f);
                    continue;
                }
                if (line.indexOf("f ") == 0) {
                    var s = line.substring("f ".length).trim();
                    var ss = s.split(" ");
                    var ind: number[][] = []
                    for (let i = 0; i < ss.length; i++) ind.push([])
                    for (let j = 0; j < ss.length; j++) {
                        var sss = ss[j].split("/");
                        var i: number[] = [-1, -1, -1]
                        ind[j] = i;
                        //var k =  new int[sss.Length];
                        for (let m = 0; m < sss.length; m++) {
                            if (sss[m].length == 0) {
                                i[m] = -1;
                            }
                            else {
                                i[m] = this.performer.convert<string, number>(sss[m]) - 1;// Shifts[m];
                            }
                        }
                    }
                    this.tuple.indx.push(ind);
                    continue;
                }
            }
        }
        catch (e) {

        }
    }

    createUnNamedGeometry(): void {
        try {
            let indexes: idx[] = []
            this.iindexes.push(indexes);

            for (var line of this.lines) {
                if (line.startsWith("usemtl")) {
                    var mat = line.substring("usemtl ".length);
                    if (mat != undefined) {
                        if (mat == "_default_") {
                            continue;
                        }
                        var effect = this.detect(mat);
                        if (!this.usedMaterials.includes(mat)) {
                            this.usedMaterials.push(mat);
                        }
                        if (effect != undefined) this.tuple = { effect: effect, indx: [] }
                        this.iindexes.push([this.tuple]);
                        continue;
                    }
                }

                if (line.indexOf("v ") == 0) {
                    var f = this.toRealArray(line.substring("v ".length).trim());
                    this.vertices.push(f);
                    continue;
                }
                if (line.indexOf("vt ") == 0) {
                    var f = this.toRealArray(line.substring("vt ".length).trim());
                    this.addTexture(this.textures, f);
                    continue;
                }
                if (line.indexOf("vn ") == 0) {
                    var f = this.toRealArray(line.substring("vn ".length).trim());
                    this.normals.push(f);
                    continue;
                }
                if (line.indexOf("f ") == 0) {
                    var s = line.substring("f ".length).trim();
                    var ss = s.split(" ");
                    var ind: number[][] = []
                    for (var ii = 0; ii < ss.length; ii++) {
                        var a: number[] = []
                        ind.push(a)
                    }
                    for (var j = 0; j < ss.length; j++) {
                        var sss = ss[j].split("/");
                        var i: number[] = [-1, -1, -1]
                        ind[j] = i;
                        //var k =  new int[sss.Length];
                        for (var m = 0; m < sss.length; m++) {
                            if (sss[m].length == 0) {
                                i[m] = -1;
                            }
                            else {
                                i[m] = this.performer.convert<string, number>(sss[m]) - 1;// Shifts[m];
                            }
                        }
                    }
                    this.tuple.indx.push(ind);
                    continue;
                }

            }
        }
        catch (e) {
        }
    }


}

