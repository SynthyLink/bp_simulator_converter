"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackAliasCollection = void 0;
const FictiveDesktop_1 = require("./Fiction/FictiveDesktop");
const FictiveMeasurements_1 = require("./Fiction/FictiveMeasurements");
const Performer_1 = require("./Performer");
const PureFeedbackAliasCollection_1 = require("./PureFeedbackAliasCollection");
class FeedbackAliasCollection extends PureFeedbackAliasCollection_1.PureFeedbackAliasCollection {
    constructor(measurements, obj, map) {
        super(map);
        this.measuerments = new FictiveMeasurements_1.FictiveMeasurements();
        this.desktop = new FictiveDesktop_1.FictiveDesktop();
        this.performer = new Performer_1.Performer();
        this.desktop = obj.getDesktop();
        this.measuerments = measurements;
    }
    fillFeedBackAliases() {
    }
}
exports.FeedbackAliasCollection = FeedbackAliasCollection;
//# sourceMappingURL=FeedbackAliasCollection.js.map