"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackAliasCollection = void 0;
class FeedbackAliasCollection {
    constructor() {
        this.aliases = [];
        this.map = new Map();
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
exports.FeedbackAliasCollection = FeedbackAliasCollection;
//# sourceMappingURL=FeedbackAliasCollection.js.map