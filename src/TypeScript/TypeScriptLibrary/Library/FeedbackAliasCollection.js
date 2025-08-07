"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackAliasCollection = void 0;
const FeedbackAlias_1 = require("./FeedbackAlias");
const FictiveDesktop_1 = require("./Fiction/FictiveDesktop");
const FictiveMeasurements_1 = require("./Fiction/FictiveMeasurements");
const Performer_1 = require("./Performer");
class FeedbackAliasCollection {
    constructor(map, measurements, obj) {
        this.performer = new Performer_1.Performer();
        this.aliases = [];
        this.map = new Map();
        this.desktop = new FictiveDesktop_1.FictiveDesktop();
        this.measurements = new FictiveMeasurements_1.FictiveMeasurements();
        this.performer.copyMap(map, this.map);
        this.desktop = obj.getDesktop();
        this.measurements = measurements;
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
        var measuremets = this.performer.getMeasurementsMap(this.measurements);
        for (const [key, val] of this.map.entries()) {
            var an = this.performer.getAliasName(this.desktop, val);
            var m = measuremets.get(key);
            var iv = m;
            var alias = new FeedbackAlias_1.FeedbackAlias(an, iv);
            this.aliases.push(alias);
        }
    }
}
exports.FeedbackAliasCollection = FeedbackAliasCollection;
//# sourceMappingURL=FeedbackAliasCollection.js.map