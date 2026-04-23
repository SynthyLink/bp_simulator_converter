import fs from 'fs';
import path from 'path/posix';


import { IIODirectory } from "./Interfaces/IIODirectory";

export class FileSystemDirectory implements IIODirectory {
    getDirectoryFiles(directory: string): string[] {
        this.files = []
   /*         fs.readdir(directory, (err, files) => {
                files.forEach(file => {
                    // will also include directory names
                    this.files.push(file)
                });
            });*/
  /*      fs.readdir(directory, (err, files) => {
            this.files = files
                 });*/

        var files = fs.readdirSync(directory)
        for (const f of files) {
            this.files.push(path.join(directory, f))
        }
        return this.files
    }

    files: string[] = []



}