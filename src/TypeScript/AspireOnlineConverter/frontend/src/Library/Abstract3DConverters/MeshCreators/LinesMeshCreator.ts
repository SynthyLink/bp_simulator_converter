import type { IFactory } from "../../Interfaces/IFactory";
import type { IFileFactory } from "../../IO/Interfaces/IFileFactory";
import type { IIODirectoryFactory } from "../../IO/Interfaces/IIODirectoryFactory";
import type { IPathFactory } from "../../IO/Interfaces/IPathFactory";
import type { ITextReaderFactory } from "../../IO/Interfaces/ITextReaderFactory";
import type { IStringSplitter } from "../../Utilities/String/Interfaces/IStringSplitter";
import type { IImageDetectorFactory } from "../Interfaces/IImageDetectorFactory";
import { AbstractMeshCreator } from "./AbstractMeshCreator";

export abstract class LinesMeshCreator extends AbstractMeshCreator
{
    constructor(url: string, name: string, directory: string, obj: any, factory: IFactory,
        func: ITextReaderFactory | undefined) {
        super(url, name, directory, obj, factory)
        if (func == undefined) return
        this.textReaderFactory = func
        var r = func.getTextReader(obj, url)
        if (r === undefined) return;
        let tc = factory.getFactory<IStringSplitter>("IStringSplitter")
        if (tc != undefined) {
            this.textConverter = tc
        }
        if (func === undefined) {
            let tf = factory.getFactory<ITextReaderFactory>("ITextReaderFactory")
            if (tf != undefined) {
                this.textReaderFactory = tf
            }
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
            if (this.path != undefined) {
                this.directory = this.path.getDirectoryName(url)
            }
        }
        let td = factory.getFactory<IIODirectoryFactory>("IIODirectoryFactory")
        if (td != undefined) {
            this.directoryio = td.createDirectoryFactory(obj)
        }
        let idt = factory.getFactory<IImageDetectorFactory>("IImageDetectorFactory")
        if (idt != undefined)
            this.imageDetector = idt.getImageDetector(obj)

        this.globalString = r.readToEnd();
        this.loadMeshCreator()
    }

    loadMeshCreator(): void {
        this.lines = this.textConverter.splitStrings(this.obj, this.globalString)
        this.loadLines()
    }

    protected loadStrings(url: string): string[] {
        let s = url
        if (this.directory != undefined) {
            if (!s.startsWith(this.directory)) {
                s = this.path.pathCombine(this.directory, s)
            }
        }
        var r = this.textReaderFactory.getTextReader(this.obj, s)
        if (r === undefined) return []
        return r.getStrings()
    }

    protected abstract loadLines(): void

    getName(): string {
        return this.name;
    }


    lines: string[] = []

    globalString: string = ""
  
}