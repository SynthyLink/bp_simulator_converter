import fs from 'fs';
import { LinesTextReader } from "./LinesTextReader"

export class StreamReader extends LinesTextReader {
    constructor(fullpath: string) {
        super()
        this.text = fs.readFileSync(fullpath, 'utf-8')
        this.split()
    }
}