import { IFactory } from "../../Interfaces/IFactory";
import { IFuncT } from "../../Interfaces/IFuncT";
import { ITextReader } from "../../IO/Interfaces/ITextReader";
import { IStringSplitter } from "../../Utilities/String/Interfaces/IStringSplitter";
import { AbstractMeshCreator } from "./AbstractMeshCreator";

export abstract class LinesMeshCreator extends AbstractMeshCreator
{
    constructor(url: string, name: string, directory: string, obj: any, factory: IFactory,
        func: IFuncT<ITextReader | undefined, string> | undefined) {
        super(url, name, directory, obj, factory)
        if (func == undefined) return
        this.func = func
        var r = func.functT(url);
        if (r === undefined) return;
        let tc = factory.getFactory<IStringSplitter>("IStringSplitter")
        if (tc != undefined) {
            this.textConverter = tc
        }
 /*    let tf = factory.getFactory<ITextReaderFactory>("ITextReaderFactory")
        if (tf != undefined) {
            this.textReaderFactory = tf
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
            this.directoryio = td.createDirectoryFactory(obj)
        }
        let idt = factory.getFactory<IImageDetectorFactory>("IImageDetectorFactory")
        if (idt != undefined)
            this.imageDetector = idt.getImageDetector(obj)*/

        this.globalString = r.readToEnd();
        this.loadMeshCreator()
    }

    loadMeshCreator(): void {
        this.lines = this.textConverter.splitStrings(this.obj, this.globalString)
        this.loadLines()
    }

    protected loadStrings(url: string): string[] {
        var r = this.textReaderFactory.getTextReader(this.obj, url)
        return r.getStrings()
    }

  
    func !: IFuncT<ITextReader | undefined, string>


    protected abstract loadLines(): void

    getName(): string {
        return this.name;
    }


    lines: string[] = []

    globalString: string = ""
  
}