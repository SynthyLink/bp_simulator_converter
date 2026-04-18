import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IFile } from "../IO/Interfaces/IFile";
import { Performer } from "../Performer";
import { ColorTexture } from "./ColorTexture";

export class Converter3DPefrormer {

    performer: Performer = new Performer()

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