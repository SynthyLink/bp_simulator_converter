import fs from 'fs';
import { LinesTextReader } from '../../Library/IO/LinesTextReader';

export class StreamReader extends LinesTextReader {
    constructor(fullpath: string) {
        super()
        this.typeName = "StreamReader"
        this.types.push("StreamReader")
        this.text = fs.readFileSync(fullpath, "utf-8").replace("\r\n", "\n")
        this.split()
    }
}