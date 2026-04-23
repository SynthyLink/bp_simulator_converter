"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMeshObj = void 0;
const OwnError_1 = require("../../ErrorHandler/OwnError");
const Polygon_1 = require("../Points/Polygon");
const AbstractMeshPolygon_1 = require("./AbstractMeshPolygon");
class AbstractMeshObj extends AbstractMeshPolygon_1.AbstractMeshPolygon {
    constructor(parent, name, transformationMatrix, effect, polygons, vertices, textures, normals, tuple, creator, variant, meshNumber) {
        super(parent, name, transformationMatrix, effect, polygons, vertices, textures, normals, tuple, creator);
        this.global = new Map();
        this.np = 0;
        this.shift = 0;
        this.shiftTexture = 0;
        this.shiftNormal = 0;
        this.iindexes = [];
        this.intVertices = [];
        this.intNormals = [];
        this.intTextures = [];
        this.meshNumber = 0;
        this.o3dCreator = creator;
        this.meshNumber = meshNumber;
        if (variant == 0) {
            this.vertices = [];
            this.textures = [];
            this.normals = [];
            this.intVertices = creator.getVertices();
            this.intNormals = creator.getNormals();
            this.intTextures = creator.getTextures();
            this.polygons = [];
            let indx = this.tuple.indx;
            for (var ii of indx) {
                for (var i of ii) {
                    this.vertices.push(this.intVertices[i[0]]);
                    this.textures.push(this.intTextures[i[1]]);
                    if (i.length > 2) {
                        if (i[2] >= 0) {
                            this.normals.push(this.intNormals[i[2]]);
                        }
                    }
                }
            }
            let np = 0;
            var eff = tuple === null || tuple === void 0 ? void 0 : tuple.effect;
            if (eff != undefined)
                this.effect = eff;
            var idx = tuple === null || tuple === void 0 ? void 0 : tuple.indx;
            if (idx === undefined)
                return;
            for (var ind of idx) {
                var l = [];
                for (let ii = 0; ii < ind.length; ii++) {
                    var ik = (this.normals.length == 0) ? -1 : np;
                    var point = this.createPointTexture(this, np, np, ik);
                    ++np;
                    if (point == undefined) {
                        throw new OwnError_1.OwnError("AbstractMeshObj POINT ERROR SINLE", "", "");
                    }
                    l.push(point);
                }
                if (l.length != 3) {
                }
                var polygon = new Polygon_1.Polygon(this, l, undefined);
                this.polygons.push(polygon);
            }
            return;
        }
        if (variant == 1) {
            this.effect = creator.getDefaultEffect();
            /*     var el = creator.EffectList;
                 if (el != null)
                 {
                     if (number < el.Count)
                     {
                         Effect = el[number];
                     }
                 }*/
            this.intVertices = creator.getVertices();
            this.intTextures = creator.getTextures();
            this.intNormals = creator.getNormals();
            this.polygons = [];
            let number = meshNumber;
            this.iindexes = creator.getIndexes()[number];
            let names = creator.getNames();
            if (names.length > number) {
                this.name = names[number];
            }
            else {
                name = creator.getMeshName();
            }
            if (this.iindexes != undefined) {
                if (this.iindexes.length == 0) {
                    for (var t of this.iindexes) {
                        new AbstractMeshObj(this, "", [], t.effect, [], [], [], [], undefined, creator, 1, 0);
                    }
                    return;
                }
            }
            if (this.iindexes != undefined) {
                for (var tp of this.iindexes) {
                    var iind = tp.indx;
                    for (var ii of iind) {
                        for (var iii of ii) {
                            this.vertices.push(this.intVertices[iii[0]]);
                            this.textures.push(this.intTextures[iii[1]]);
                            if (iii.length > 2) {
                                if (iii[2] >= 0) {
                                    this.normals.push(this.intNormals[iii[2]]);
                                }
                            }
                        }
                    }
                }
                for (var tpi of this.iindexes) {
                    var effect = tpi.effect;
                    var idxx = tpi.indx;
                    for (var indx of idxx) {
                        var l = [];
                        for (let i = 0; i < indx.length; i++) {
                            let npp = this.np;
                            var ik = (this.normals.length == 0) ? -1 : npp;
                            var point = this.createPointTexture(this, npp, npp, ik);
                            ++this.np;
                            if (point == null) {
                                throw new OwnError_1.OwnError("AbstractMeshObj POINT ERROR", "", "");
                            }
                            l.push(point);
                        }
                        var polygon = new Polygon_1.Polygon(this, l, effect);
                        this.polygons.push(polygon);
                    }
                }
            }
        }
    }
    createTriangles() {
    }
}
exports.AbstractMeshObj = AbstractMeshObj;
//# sourceMappingURL=AbstractMeshObj.js.map