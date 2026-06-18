import type { IMesh } from "../Interfaces/IMesh";
import type { ITextureIndex } from "../Interfaces/ITextureIndex";
import { EffectTexture } from "../EffectTexture";
import { Obj3DCreator } from "../MeshCreators/Obj3DCreator";
import { Polygon } from "../Points/Polygon";
import { AbstractMeshPolygon } from "./AbstractMeshPolygon";


export class AbstractMeshObj extends AbstractMeshPolygon {
    constructor(parent: IMesh | undefined, name: string, transformationMatrix: number[], effect: EffectTexture, polygons: Polygon[],
        vertices: number[][], textures: number[][], normals: number[][], tuple: ITextureIndex | undefined,
        creatorObj: Obj3DCreator, variant: number, meshNumber: number) {
        super(parent, name, transformationMatrix, effect, polygons, vertices, textures, normals, tuple,
            creatorObj);
        this.o3dCreator = creatorObj;
        this.meshNumber = meshNumber
        this.vertices = [];
        this.textures = [];
        this.normals = [];
        this.intVertices = this.o3dCreator.getVertices();
        this.intNormals = this.o3dCreator.getNormals();
        this.intTextures = this.o3dCreator.getTextures();
        this.polygons = []
        let ind = this.o3dCreator.getIndexes();
        let indexes = ind[meshNumber]
        if (variant == 0) {
            var eff = tuple?.effect;
            if (eff != undefined) this.effect = eff;

            if (this.o3dCreator.getNames().length > meshNumber) {
                this.name = this.o3dCreator.getNames()[meshNumber]
            }
            else {
                this.name = this.o3dCreator.getMeshName();
            }
            let nm = 0
            for (let tuple of indexes) {
                if (tuple.indx.length > 0) {
                    new AbstractMeshObj(this, "", [], effect, [], this.intVertices, this.intTextures, this.intNormals,
                        tuple, this.o3dCreator, 1, nm)
                }
                ++nm;
            }
            return
        }
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
    }
 
    createTriangles(): void {
    }
    protected o3dCreator!: Obj3DCreator;
    protected global: Map<number, number[]> = new Map();
    np: number = 0

    protected shift: number = 0;
    protected shiftTexture: number = 0;
    protected shiftNormal: number = 0;

    protected iindexes: ITextureIndex[] = [];

    protected intVertices: number[][] = [];
    protected intNormals: number[][] = [];
    protected intTextures: number[][] = [];

    meshNumber: number = 0

}
