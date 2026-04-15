"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameFactory = void 0;
const Motion6DFactory_1 = require("../Library/Motion6D/Motion6DFactory");
class GameFactory extends Motion6DFactory_1.Motion6DFactory {
    constructor() {
        super();
        this.addFactory(new GameMtlDetector(), "IMtlDetector");
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