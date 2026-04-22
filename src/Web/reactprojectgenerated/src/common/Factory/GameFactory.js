"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameFactory = void 0;
const Motion6DFactory_1 = require("../Library/Motion6D/Motion6DFactory");
const GameLoader_1 = require("./Factory/GameLoader");
const LineEndSplitter_1 = require("../Library/Utilities/String/LineEndSplitter");
const PurePath_1 = require("../Library/IO/PurePath");
class GameFactory extends Motion6DFactory_1.Motion6DFactory {
    constructor() {
        super();
        this.addFactory(new GameMtlDetector(), "IMtlDetector");
        this.addFactory(new GameLoader_1.GameLoaderFactory(), "ILoaderFactory");
        this.addFactory(new LineEndSplitter_1.LineEndSplitter(), "IStringSplitter");
        this.addFactory(new PurePath_1.PurePath(), "IPath");
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
//# sourceMappingURL=GameFactory.js.map