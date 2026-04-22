import type { IFactory } from "../../Interfaces/IFactory";
import type { IFile } from "../../IO/Interfaces/IFile";
import type { IFileFactory } from "../../IO/Interfaces/IFileFactory";
import type { ITextReaderFactory } from "../../IO/Interfaces/ITextReaderFactory";
import type { IMesh } from "../Interfaces/IMesh";
import type { IMeshCreator } from "../Interfaces/IMeshCreator";
import type { IPath } from "../../IO/Interfaces/IPath";
import type { IPathFactory } from "../../IO/Interfaces/IPathFactory";
import type { IIODirectory } from "../../IO/Interfaces/IIODirectory";
import type { IIODirectoryFactory } from "../../IO/Interfaces/IIODirectoryFactory";
import { Performer } from "../../Performer";
import { Converter3DPefrormer } from "../Converter3DPerformer";
import { EffectTexture } from "../EffectTexture";
import { IImageDetector } from "../Interfaces/IImageDetector";
import { IImageDetectorFactory } from "../Interfaces/IImageDetectorFactory";
import { IStringSplitter } from "../../Utilities/String/Interfaces/IStringSplitter";

export abstract class AbstractMeshCreator implements IMeshCreator {

    constructor(url: string, directory: string, obj: any, factory: IFactory) {
        this.url = url
        this.directory = directory
        this.factory = factory
        this.obj = obj;
        let tc = factory.getFactory<IStringSplitter>("IStringSplitter")
        let tf = factory.getFactory<ITextReaderFactory>("ITextReaderFactory")
        if (tf != undefined) {
            this.textReaderFactory = tf
        }
        if (tc != undefined) {
            this.textConverter = tc
        }
        let tfile = factory.getFactory<IFileFactory>("IFileFactory")
        if (tfile != undefined) {
            this.fileio = tfile.createFile(obj)
        }
        let tpath = factory.getFactory<IPathFactory>("IPathFactory")
        if (tpath != undefined) {
            this.path = tpath.createPath(obj)
        }
        if (directory.length == 0) {
            this.directory = this.path.getDirectoryName(url)
        }
        let td = factory.getFactory<IIODirectoryFactory>("IIODirectoryFactory")
        if (td != undefined) {
            this.directoryio = td.createDirectoryFacrory(obj)
        }
        let idt = factory.getFactory<IImageDetectorFactory>("IImageDetectorFactory")
        if (idt != undefined) this.imageDetector = idt.getImageDetector(obj)
    }

    getMeshCreatorDirectory(): string {
        return this.directory
    }

    abstract loadMeshCreator(): void 

    getName(): string {
        return ""
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


    protected detectImage(path: string): boolean {
        if (this.imageDetector === undefined) {
            return true
        }
        return this.imageDetector.detectImage(path)
    }

    protected existsFile(fileName: string) {
        return this.fileio.existsFile(fileName)
    }

    protected pathCombine(path1: string, path2: string): string {
        return this.path.pathCombine(path1, path2)
    }

    protected toStringT(object: any): string {
        return this.performer.convert<any, string>(object)
    }

    protected toShiftString(str: string, shift: string): string {
        return this.cPerformer.toShiftString(str, shift)
    }

    protected toReal(s: string): number {
        return this.performer.convert<string, number>(s)
    }

    protected toRealArray(str: string): number[]
    {
        return this.cPerformer.toRealArray(str)
    }

    protected addTexture(l: number[][], texture: number[]): void {
        this.cPerformer.addTexture(l, texture)
    }

    protected toFloat(s: string): number {
        return this.performer.convert<string, number>(s)
    }




    protected effects: Map<string, EffectTexture> = new Map()

    protected meshes: IMesh[] = []

    protected performer: Performer = new Performer()

    protected directory: string = ""

    protected dict: Map<string, EffectTexture> = new Map();

    protected directoryio !: IIODirectory

    protected url: string = "";

    protected factory !: IFactory

    protected obj: any

    protected typeName: string = "AbstractMeshCreator";

    protected types: string[] = ["IObject", "IMeshCreator", "AbstractMeshCreator"];

    protected name: string = ""

    protected textConverter !: IStringSplitter

    protected textReaderFactory !: ITextReaderFactory

    cPerformer: Converter3DPefrormer = new Converter3DPefrormer()

    protected fileio !: IFile

    protected path !: IPath

    protected effectList: EffectTexture[] = []

    protected imageDetector !: IImageDetector

    protected vertices: number[][] = []
    protected normals: number[][] = []
    protected textures: number[][] = []
}