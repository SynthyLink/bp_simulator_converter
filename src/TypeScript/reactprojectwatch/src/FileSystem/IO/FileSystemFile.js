"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemFile = void 0;
const fs_1 = __importDefault(require("fs"));
class FileSystemFile {
    constructor() {
        this.typeName = "CategoryArrow";
        this.types = ["IObject", "IFile", "FileSystemFile"];
        this.name = "";
    }
    existsFile(fileName) {
        return fs_1.default.existsSync(fileName);
    }
    getName() {
        return this.name;
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
}
exports.FileSystemFile = FileSystemFile;
//# sourceMappingURL=FileSystemFile.js.map