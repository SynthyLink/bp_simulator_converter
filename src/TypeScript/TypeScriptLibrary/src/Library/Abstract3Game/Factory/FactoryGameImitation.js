"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryGameImitation = void 0;
const PurePathFactory_1 = require("../../IO/PurePathFactory");
const Motion6DFactory_1 = require("../../Motion6D/Motion6DFactory");
const LineEndSplitter_1 = require("../../Utilities/String/LineEndSplitter");
class FactoryGameImitation extends Motion6DFactory_1.Motion6DFactory {
    constructor() {
        super();
        this.types.push("IIODirectoryFactory");
        this.types.push("IFileFactory");
        this.types.push("ITextReaderFactory");
        this.types.push("GameFactory");
        this.typeName = "GameFactory";
        this.addFactory(new GameMtlDetector(), "IMtlDetector");
        this.addFactory(new GameLoaderFactory(), "IGameLoaderFactory");
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
exports.FactoryGameImitation = FactoryGameImitation;
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
//# sourceMappingURL=FactoryGameImitation.js.map