"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PureFeedbackAliasCollection = void 0;
class PureFeedbackAliasCollection {
    constructor(map) {
        this.aliases = [];
        this.map = new Map();
        var keys = map.keys();
        for (var key of keys) {
            var v = map.get(key);
            if (v != undefined) {
                this.map.set(key, v);
            }
        }
    }
    getFeedbackAliasCollectionMap() {
        return this.map;
    }
    getFeedbackAliasCollectionAliases() {
        return this.aliases;
    }
    addFeedbackAliasCollectionAlias(alias) {
        this.aliases.push(alias);
    }
    setFeedBackAliases() {
        for (var a of this.aliases) {
            a.setFeedBackAlias();
        }
    }
    fillFeedBackAliases() {
    }
}
exports.PureFeedbackAliasCollection = PureFeedbackAliasCollection;
//# sourceMappingURL=PureFeedbackAliasCollection.js.map