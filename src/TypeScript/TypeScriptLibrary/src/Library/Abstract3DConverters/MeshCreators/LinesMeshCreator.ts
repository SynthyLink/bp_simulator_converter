import type { IFactory } from "../../Interfaces/IFactory";
import type { IMesh } from "../Interfaces/IMesh";
import type { IMeshCreator } from "../Interfaces/IMeshCreator";
import type { IMeshCreatorTextConverter } from "../Interfaces/IMeshCreatorTextConverter";
import type { ITextReaderFactory } from "../../IO/Interfaces/ITextReaderFactory";
import { IFileFactory } from "../../IO/Interfaces/IFileFactory";
import { AbstractMeshCreator } from "./AbstractMeshCreator";

export abstract class LinesMeshCreator extends AbstractMeshCreator
{

    constructor(url: string,  obj: any, factory: IFactory) {
        super(url, "", obj, factory)      

    }

    loadMeshCreator(): void {
        this.text = this.textConverter.splitStrings(this.obj, this.url)
        this.loadText(this.text)
    }
    protected loadStrings(url: string): string[] {
        var r = this.textReaderFactory.getTextReader(this.obj, url)
        return r.getStrings()
    }

    getName(): string {
        return this.name;
    }

    loadText(text: string[]): void {
        this.lines = text;
    }

    lines: string[] = []

  
}