"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameFactory = void 0;
const Motion6DFactory_1 = require("../Library/Motion6D/Motion6DFactory");
const GameLoader_1 = require("./GameLoader");
const LineEndSplitter_1 = require("../Library/Utilities/String/LineEndSplitter");
const SceneHolder_1 = require("./SceneHolder");
const PurePathFactory_1 = require("../Library/IO/PurePathFactory");
// lass FileSystemFactory implements IObject, ITextReaderFactory, 
class GameFactory extends Motion6DFactory_1.Motion6DFactory {
    constructor() {
        super();
        this.types.push("IIODirectoryFactory");
        this.types.push("IFileFactory");
        this.types.push("ITextReaderFactory");
        this.types.push("GameFactory");
        this.typeName = "GameFactory";
        this.addFactory(new GameMtlDetector(), "IMtlDetector");
        this.addFactory(new GameLoader_1.GameLoaderFactory(), "ILoaderFactory");
        this.addFactory(new LineEndSplitter_1.LineEndSplitter(), "IStringSplitter");
        this.addFactory(new PurePathFactory_1.PurePathFactory(), "IPathFactory");
        this.addFactory(this, "IIODirectoryFactory");
        this.addFactory(this, "IFileFactory");
        this.addFactory(this, "ITextReaderFactory");
    }
    getTextReader(obj, url) {
        return new SceneReader(obj, url);
    }
    createFile(obj) {
        return new SceneFile(obj);
    }
    createDirectoryFactory(object) {
        return new SceneDirectory(object);
    }
}
exports.GameFactory = GameFactory;
class GameMtlDetector {
    constructor() {
        this.typeName = "GameMtlDetector";
        this.types = ["IObject", "IMtlDetector", "GameMtlDetector"];
    }
    getName() {
        return "";
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
    detectMtl(url, obj) {
        let game = obj;
        var str = game.loader.resources[url];
        return str.split('\n');
    }
}
class SceneDirectory extends SceneHolder_1.SceneHolder {
    constructor(object) {
        super(object);
        this.types.push("IIODirectory");
        this.types.push("SceneDirectory");
        this.typeName = "SceneDirectory";
    }
    getDirectoryFiles(directory) {
        return this.scene.getDirectoryFiles(directory);
    }
}
class SceneFile extends SceneHolder_1.SceneHolder {
    constructor(object) {
        super(object);
        this.types.push("IFile");
        this.types.push("SceneFile");
        this.typeName = "SceneFile";
    }
    existsFile(fileName) {
        return this.scene.fileExists(fileName);
    }
}
class SceneReader extends SceneHolder_1.SceneHolder {
    constructor(object, url) {
        super(object);
        this.strings = [];
        this.text = "";
        this.end = false;
        this.n = 0;
        this.types.push("ITextReader");
        this.types.push("SceneReader");
        this.typeName = "SceneReader";
        this.text = this.scene.getResourceText(url);
        this.split();
    }
    getStrings() {
        return this.strings;
    }
    reset() {
        this.n = 0;
        this.end = false;
    }
    readToEnd() {
        this.end = true;
        return this.text;
    }
    readLine() {
        let s = this.strings[this.n];
        this.n++;
        if (this.n >= this.strings.length)
            this.end = true;
        return s;
    }
    eof() {
        return this.end;
    }
    split() {
        var s = this.text.split("\n");
        for (var str of s) {
            this.strings.push(str.replace("\r", ""));
        }
    }
}
//# sourceMappingURL=GameFactory.js.map