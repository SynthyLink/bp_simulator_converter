import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { Performer } from "../Performer";
import { ColorTexture } from "./ColorTexture";

export class Converter3DPefrormer {

    performer : Performer = new Performer()

    public stringToColor(str: string, hex: boolean): ColorTexture {
        if (hex) throw new OwnNotImplemented()
        let values: number[] = []
        for (var v of str)
        {
            if (v.length == 0) {
                continue;
            }
            var d = this.performer.convert<string, number>(v)
            values.push(d)
        }
        return new ColorTexture(values)

    }

}