import { INodeT } from "../../NamedTree/Interfaces/INodeT";
import { Performer } from "../../Performer";
import { EffectTexture } from "../EffectTexture";
import { IMesh } from "../Interfaces/IMesh";

export class AbstractMesh implements IMesh {

    constructor() {

    }
    getAbsoluteVertices(): number[] {
        return this.absolutevertices;
    }
    getEffect(): EffectTexture {
        return this.effect;
    }
    calculateAbsolute(): void {
        
    }

    protected typeName: string = "AbstractMesh";

    protected types: string[] = ["IObject", "IMesh", "INodeT<IMesh>", "IGeometry", "INamed", "AbstractMesh"];

    protected name: string = "";

    getVertices(): number[] {
        return this.vertices;
    }
    getNormals(): number[] {
        return this.normals
    }
    getTextures(): number[] {
        return this.textures;
    }
    getTransformationMatrix(): number[] {
        return this.transformationMatrix
    }
    getNamedName(): string {
        return this.name
    }

    setNamedName(name: string): void {
        this.name = name;
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

  
    getParentT(): INodeT<IMesh> | undefined {
        return this.parent;
    }
    setParentT(parent: INodeT<IMesh>): void {
        this.parent = parent;
    }
    getNodesT(): INodeT<IMesh>[] {
        return this.nodes
    }
    addNodeT(node: INodeT<IMesh>): void {
        this.nodes.push(node)
    }
    removeNodeT(node: INodeT<IMesh>): void {
        this.performer.remove<INodeT<IMesh>>(this.nodes, node)
    }
    getNodeValueT(): IMesh {
        return this;
    }

    performer : Performer = new Performer()

    parent !: INodeT<IMesh> 

    nodes: INodeT<IMesh>[] = []

    effect !: EffectTexture


    transformationMatrix: number[] = []
    textures: number[] = []
    normals: number[] = []
    vertices: number[] = []
    absolutevertices: number[] = []


}