"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cessna = void 0;
const BelognsToCollection_1 = require("../Library/Arrows/BelognsToCollection");
const Desktop_1 = require("../Library/Desktop");
const EventLink_1 = require("../Library/Event/Objects/EventLink");
const TimerObject_1 = require("../Library/Event/Objects/TimerObject");
const DataLink_1 = require("../Library/Measurements/Arrows/DataLink");
const DataConsumer_1 = require("../Library/Measurements/DataConsumer");
const VectorFormulaConsumer_1 = require("../Library/Measurements/VectorFormulaConsumer");
const ReferenceFrameArrow_1 = require("../Library/Motion6D/Arrows/ReferenceFrameArrow");
const RigidReferenceFrame_1 = require("../Library/Motion6D/Objects/RigidReferenceFrame");
const SerializablePosition_1 = require("../Library/Motion6D/Objects/SerializablePosition");
const Basic3DShape_1 = require("../Library/Motion6D/Objects/Shapes/Basic3DShape");
const BasicCamera_1 = require("../Library/Motion6D/Visible/BasicCamera");
const VisibleConsumerLink_1 = require("../Library/Motion6D/Visible/VisibleConsumerLink");
const TimeSpan_1 = require("../Library/Utilities/DateTime/TimeSpan");
class Cessna_CategoryObject_0_Visible0 extends Basic3DShape_1.Basic3DShape {
    constructor(desktop, name) {
        super(desktop, name);
        let map = this.getSaveGrahicalData();
        map.set("Cessna_208_Caravan.obj", "Cessna_208_Caravan.obj");
        map.set("master.mtl", "master.mtl");
        map.set("mat0_c.jpg", "mat0_c.jpg");
    }
}
class Cessna_CategoryObject_0 extends SerializablePosition_1.SerializablePosition {
    constructor(desktop, name) {
        super(desktop, name);
        this.addChildT(new Cessna_CategoryObject_0_Visible0(desktop, name));
    }
}
class Cessna_CategoryObject_1 extends BasicCamera_1.BasicCamera {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Cessna_CategoryObject_2 extends TimerObject_1.TimerObject {
    constructor(desktop, name) {
        super(desktop, name);
        this.span = TimeSpan_1.TimeSpan.fromMilliseconds(100);
    }
}
class Cessna_CategoryObject_3 extends RigidReferenceFrame_1.RigidReferenceFrame {
    constructor(desktop, name) {
        super(desktop, name);
        this.relativePosition = [];
        this.relativeQuaternion = [];
        this.relativePosition = [];
        this.relativePosition.push(40);
        this.relativePosition.push(40);
        this.relativePosition.push(40);
        this.relativePosition = [];
        this.relativePosition.push(0.88047623921714935);
        this.relativePosition.push(-0.27984814233312139);
        this.relativePosition.push(0.36470519963100095);
        this.relativePosition.push(0.11591689595929504);
    }
}
class Cessna_CategoryObject_4 extends VectorFormulaConsumer_1.VectorFormulaConsumer {
    constructor(desktop, name) {
        super(desktop, name);
        this.var_0 = 0;
        let map = new Map([]);
        this.performer.setAliasMap(map, this);
        this.addVariableValue("Formula_1", 0, 0);
    }
    calculateTree() {
        this.success = true;
        this.var_0 = this.getInternalTime();
    }
    init() {
        var all = this.getAllMeasurements();
    }
    get_0() {
        return this.success ? this.var_0 : undefined;
    }
    save() {
        var v = this.variables;
        var x0 = v.get("Formula_1");
        x0 === null || x0 === void 0 ? void 0 : x0.setIValue(this.get_0());
    }
}
class Cessna_CategoryObject_5 extends DataConsumer_1.DataConsumer {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Cessna_CategoryArrow_0 extends ReferenceFrameArrow_1.ReferenceFrameArrow {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Cessna_CategoryArrow_1 extends VisibleConsumerLink_1.VisibleConsumerLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Cessna_CategoryArrow_2 extends BelognsToCollection_1.BelongsToCollection {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Cessna_CategoryArrow_3 extends BelognsToCollection_1.BelongsToCollection {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Cessna_CategoryArrow_4 extends BelognsToCollection_1.BelongsToCollection {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Cessna_CategoryArrow_5 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Cessna_CategoryArrow_6 extends EventLink_1.EventLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Cessna extends Desktop_1.Desktop {
    constructor() {
        super();
        this.name = "Cessna";
        this.mapObjects.set("Cessna_CategoryObject_0", new Cessna_CategoryObject_0(this, "pLANE"));
        this.mapObjects.set("Cessna_CategoryObject_1", new Cessna_CategoryObject_1(this, "Camera"));
        this.mapObjects.set("Cessna_CategoryObject_2", new Cessna_CategoryObject_2(this, "Timer"));
        this.mapObjects.set("Cessna_CategoryObject_3", new Cessna_CategoryObject_3(this, ""));
        this.mapObjects.set("Cessna_CategoryObject_4", new Cessna_CategoryObject_4(this, "Time"));
        this.mapObjects.set("Cessna_CategoryObject_5", new Cessna_CategoryObject_5(this, "Chart"));
        new Cessna_CategoryArrow_0(this, "");
        new Cessna_CategoryArrow_1(this, "");
        new Cessna_CategoryArrow_2(this, "");
        new Cessna_CategoryArrow_3(this, "");
    }
}
exports.Cessna = Cessna;
//# sourceMappingURL=Cessna.js.map