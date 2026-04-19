import type { IFactory } from "../../Interfaces/IFactory";
import { AbstractMeshCreator } from "./AbstractMeshCreator";

export abstract class LinesMeshCreator extends AbstractMeshCreator
{

    constructor(url: string, directory: string, obj: any, factory: IFactory) {
        super(url, directory, obj, factory)
        var r = this.textReaderFactory.getTextReader(obj, url) 
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

    getName(): string {
        return this.name;
    }

    protected abstract loadLines(): void

    lines: string[] = []

    globalString : string = ""

  
}