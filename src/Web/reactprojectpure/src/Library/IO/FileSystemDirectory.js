"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const posix_1 = __importDefault(require("path/posix"));
class FileSystemDirectory {
    constructor() {
        this.files = [];
    }
    getDirectoryFiles(directory) {
        this.files = [];
        /*         fs.readdir(directory, (err, files) => {
                     files.forEach(file => {
                         // will also include directory names
                         this.files.push(file)
                     });
                 });*/
        /*      fs.readdir(directory, (err, files) => {
                  this.files = files
                       });*/
        var files = fs_1.default.readdirSync(directory);
        for (const f of files) {
            this.files.push(posix_1.default.join(directory, f));
        }
        return this.files;
    }
}
exports.FileSystemDirectory = FileSystemDirectory;
//# sourceMappingURL=FileSystemDirectory.js.map