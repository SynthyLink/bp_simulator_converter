import { IFactory } from "../../Interfaces/IFactory";
import { Effect } from "../Effect";
import { IMesh } from "../Intersaces/IMesh";
import { IMeshCreator } from "../Intersaces/IMeshCreator";

export abstract class LinesMeshCreator implements IMeshCreator {

    constructor(url: string, sep: string, obj: any, factory: IFactory) {
        this.url = url
        this.sep = sep;
        this.factory = factory
        this.obj = obj;
    }

    getURL(): string {
        return this.url;
    }

    load(obj: any): void {
        let s = obj as string
        let text = s.split(this.sep)
        this.loadText(text)
    }

    abstract loadText(text: string[]): void

    abstract getMeshes(): IMesh[];

    abstract getEffects(): Map<string, Effect>


    protected sep: string;

    protected text: string[] = []

    protected url: string = "";

    protected factory: IFactory

    protected obj : any

}