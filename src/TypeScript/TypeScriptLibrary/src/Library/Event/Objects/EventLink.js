"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLink = void 0;
const CategoryArrow_1 = require("../../CategoryArrow");
const OwnNotImplemented_1 = require("../../ErrorHandler/OwnNotImplemented");
const FictiveEvent_1 = require("../../Fiction/FictiveEvent");
const FictiveEventHandler_1 = require("../../Fiction/FictiveEventHandler");
class EventLink extends CategoryArrow_1.CategoryArrow {
    constructor() {
        super(...arguments);
        this.event = new FictiveEvent_1.FictiveEvent();
        this.handler = new FictiveEventHandler_1.FictiveEventHandler();
        /*
    
             public IEventHandler Source { get => source; }
    
            /// <summary>
            /// The event (target)
            /// </summary>
            public IEvent Target { get => target; }
    
        */
    }
    setSource(source) {
        var h = this.getObjectT(source, "IEventHandler");
        if (h.length == 0) {
            throw new OwnNotImplemented_1.OwnNotImplemented();
        }
        this.handler = h[0];
        super.setSource(source);
    }
    setTarget(target) {
        this.target = target;
        var e = this.getObjectT(target, "IEvent");
        if (e.length == 0) {
            throw new OwnNotImplemented_1.OwnNotImplemented();
        }
        this.event = e[0];
        this.handler.addChildT(e[0]);
        super.setTarget(target);
    }
}
exports.EventLink = EventLink;
//# sourceMappingURL=EventLink.js.map