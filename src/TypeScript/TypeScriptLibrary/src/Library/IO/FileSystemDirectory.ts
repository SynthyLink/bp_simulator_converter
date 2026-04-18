import fs from 'fs';

import { IIODirectory } from "./Interfaces/IIODirectory";

export class FileSystemDirectory implements IIODirectory {
    getDirectoryFiles(directory: string): string[] {
        if (this.files.length == 0) {

            fs.readdir(directory, (err, files) => {
                files.forEach(file => {
                    // will also include directory names
                    this.files.push(file)
                });
            });
        }
        return this.files
    }

    files: string[] = []



}