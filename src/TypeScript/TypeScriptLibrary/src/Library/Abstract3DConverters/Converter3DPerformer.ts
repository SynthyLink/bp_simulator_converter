import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IFile } from "../IO/Interfaces/IFile";
import { Performer } from "../Performer";
import { ColorTexture } from "./ColorTexture";

export class Converter3DPefrormer {

    performer: Performer = new Performer()



    public toReal(s: string): number
    {
        return this.performer.convert < string, number>(s)
    }

    toRealArray(str: string): number[]
    {
        let ss = str.split("\r\n");
        var x: number[] = []
        for (let s of ss) {
            if (s.length > 0) {
                let a = this.toReal(s);
                x.push(a)
            }
        }
        return x;
    }

    public getTextureCoordinate(a: number): number{
        if (a >= 0 && a <= 1)
        {
            return a;
        }
        return a - Math.floor(a);
    }

    public addTexture(l: number[][], texture: number[]) : void {
        let t = [this.getTextureCoordinate(texture[0]), this.getTextureCoordinate(texture[1])];
        this.performer.addCut(l, t, 2)
    }



    public stringToColor(str: string, hex: boolean): ColorTexture {
        if (hex) throw new OwnNotImplemented()
        let values: number[] = []
        for (var v of str) {
            if (v.length == 0) {
                continue;
            }
            var d = this.performer.convert<string, number>(v)
            values.push(d)
        }
        return new ColorTexture(values)

    }

    public fileExists(filename: string, file: IFile): boolean {
        return file.existsFile(filename);
    }


    public toShiftString(str: string, shift: string): string {
        var str = this.performer.toShiftString(str, shift)
        return str.replace("/", "")
    }
}