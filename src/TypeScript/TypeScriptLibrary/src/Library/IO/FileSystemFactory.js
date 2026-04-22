"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemFactory = void 0;
const fs_1 = __importDefault(require("fs"));
const FilePath_1 = require("./FilePath");
const StreamReader_1 = require("./StreamReader");
const FileSystemDirectory_1 = require("./FileSystemDirectory");
class FileSystemFactory {
    constructor() {
        this.typeName = "FileSystemFactory";
        this.types = ["IObject", "ITextReaderFactory", "IFileFactory", "IIODirectoryFactory",
            "IPathFactory", "FileSystemFactory"];
        this.name = "";
    }
    createPath(obj) {
        return new FilePath_1.FilePath();
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
    createDirectoryFactory(object) {
        return new FileSystemDirectory_1.FileSystemDirectory();
    }
    createFile(obj) {
        return new FileSystemFile();
    }
    getTextReader(obj, url) {
        return new StreamReader_1.StreamReader(url);
    }
    setFactory(factory) {
        let ff = new FileSystemFactory();
        factory.addFactory(ff, "ITextReaderFactory");
        factory.addFactory(ff, "IFileFactory");
        factory.addFactory(ff, "IIODirectoryFactory");
        factory.addFactory(ff, "IPathFactory");
    }
}
exports.FileSystemFactory = FileSystemFactory;
class FileSystemFile {
    existsFile(fileName) {
        return fs_1.default.existsSync(fileName);
    }
}
//# sourceMappingURL=FileSystemFactory.js.map