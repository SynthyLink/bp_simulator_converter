"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airplane = void 0;
const BelognsToCollection_1 = require("../src/Library/Arrows/BelognsToCollection");
const Desktop_1 = require("../src/Library/Desktop");
const EventLink_1 = require("../src/Library/Event/Objects/EventLink");
const TimerObject_1 = require("../src/Library/Event/Objects/TimerObject");
const DataLink_1 = require("../src/Library/Measurements/Arrows/DataLink");
const DataConsumer_1 = require("../src/Library/Measurements/DataConsumer");
const VectorFormulaConsumer_1 = require("../src/Library/Measurements/VectorFormulaConsumer");
const ReferenceFrameArrow_1 = require("../src/Library/Motion6D/Arrows/ReferenceFrameArrow");
const RigidReferenceFrame_1 = require("../src/Library/Motion6D/Objects/RigidReferenceFrame");
const SerializablePosition_1 = require("../src/Library/Motion6D/Objects/SerializablePosition");
const Basic3DShape_1 = require("../src/Library/Motion6D/Objects/Shapes/Basic3DShape");
const BasicCamera_1 = require("../src/Library/Motion6D/Visible/BasicCamera");
const VisibleConsumerLink_1 = require("../src/Library/Motion6D/Visible/VisibleConsumerLink");
const TimeSpan_1 = require("../src/Library/Utilities/DateTime/TimeSpan");
class Airplane_CategoryObject_0_Visible0 extends Basic3DShape_1.Basic3DShape {
    constructor(desktop, name) {
        super(desktop, name);
        this.addResource("Cessna_208_Caravan.obj", "pLANE/Cessna_208_Caravan.obj", "text", ".obj");
        this.addResource("master.mtl", "pLANE/master.mtl", "text", ".mtl");
        this.addResource("mat0_c.jpg", "pLANE/mat0_c.jpg", "image", ".jpg");
    }
}
class Airplane_CategoryObject_0 extends SerializablePosition_1.SerializablePosition {
    constructor(desktop, name) {
        super(desktop, name);
        this.addChildT(new Airplane_CategoryObject_0_Visible0(desktop, name));
    }
}
class Airplane_CategoryObject_1 extends BasicCamera_1.BasicCamera {
    constructor(desktop, name) {
        super(desktop, name);
        this.fieldOfView = 30;
        this.nearDistance = 1;
        this.farDistance = 200;
    }
}
class Airplane_CategoryObject_2 extends TimerObject_1.TimerObject {
    constructor(desktop, name) {
        super(desktop, name);
        this.span = TimeSpan_1.TimeSpan.fromMilliseconds(100);
    }
}
class Airplane_CategoryObject_3 extends RigidReferenceFrame_1.RigidReferenceFrame {
    constructor(desktop, name) {
        super(desktop, name);
        this.relativePosition = [];
        this.relativeQuaternion = [];
        this.relativePosition = [];
        this.relativePosition.push(40);
        this.relativePosition.push(40);
        this.relativePosition.push(40);
        this.relativeQuaternion = [];
        this.relativeQuaternion.push(0.88047623921714935);
        this.relativeQuaternion.push(-0.27984814233312139);
        this.relativeQuaternion.push(0.36470519963100095);
        this.relativeQuaternion.push(0.11591689595929504);
    }
}
class Airplane_CategoryObject_4 extends VectorFormulaConsumer_1.VectorFormulaConsumer {
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
        //	var all = this.getAllMeasurements();
    }
    get_0() {
        return this.success ? this.var_0 : undefined;
    }
    save() {
        var v = this.variables;
        var x0 = v.get("Formula_1");
        x0?.setIValue(this.get_0());
    }
}
class Airplane_CategoryObject_5 extends DataConsumer_1.DataConsumer {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Airplane_CategoryArrow_0 extends ReferenceFrameArrow_1.ReferenceFrameArrow {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Airplane_CategoryArrow_1 extends VisibleConsumerLink_1.VisibleConsumerLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Airplane_CategoryArrow_2 extends BelognsToCollection_1.BelongsToCollection {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Airplane_CategoryArrow_3 extends BelognsToCollection_1.BelongsToCollection {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Airplane_CategoryArrow_4 extends BelognsToCollection_1.BelongsToCollection {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Airplane_CategoryArrow_5 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Airplane_CategoryArrow_6 extends EventLink_1.EventLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Airplane extends Desktop_1.Desktop {
    constructor() {
        super();
        this.name = "Airplane";
        this.mapObjects.set("Airplane_CategoryObject_0", new Airplane_CategoryObject_0(this, "pLANE"));
        this.mapObjects.set("Airplane_CategoryObject_1", new Airplane_CategoryObject_1(this, "Camera"));
        this.mapObjects.set("Airplane_CategoryObject_2", new Airplane_CategoryObject_2(this, "Timer"));
        this.mapObjects.set("Airplane_CategoryObject_3", new Airplane_CategoryObject_3(this, ""));
        this.mapObjects.set("Airplane_CategoryObject_4", new Airplane_CategoryObject_4(this, "Time"));
        this.mapObjects.set("Airplane_CategoryObject_5", new Airplane_CategoryObject_5(this, "Chart"));
        new Airplane_CategoryArrow_0(this, "");
        new Airplane_CategoryArrow_1(this, "");
        new Airplane_CategoryArrow_2(this, "");
        new Airplane_CategoryArrow_3(this, "");
        new Airplane_CategoryArrow_4(this, "");
        new Airplane_CategoryArrow_5(this, "");
        new Airplane_CategoryArrow_6(this, "");
        this.finish();
    }
    finish() {
        let objects = this.getCategoryObjects();
        let arrows = this.getCategoryArrows();
        let s0 = this.mapObjects.get("Airplane_CategoryObject_1");
        if (s0 != undefined)
            arrows[0].setSource(s0);
        let t0 = this.mapObjects.get("Airplane_CategoryObject_3");
        if (t0 != undefined)
            arrows[0].setTarget(t0);
        let s1 = this.mapObjects.get("Airplane_CategoryObject_1");
        if (s1 != undefined)
            arrows[1].setSource(s1);
        let t1 = this.mapObjects.get("Airplane_CategoryObject_0_Visible0");
        if (t1 != undefined)
            arrows[1].setTarget(t1);
        let s2 = this.mapObjects.get("Airplane_CategoryObject_5");
        if (s2 != undefined)
            arrows[2].setSource(s2);
        let t2 = this.mapObjects.get("Airplane_CategoryObject_1");
        if (t2 != undefined)
            arrows[2].setTarget(t2);
        let s3 = this.mapObjects.get("Airplane_CategoryObject_5");
        if (s3 != undefined)
            arrows[3].setSource(s3);
        let t3 = this.mapObjects.get("Airplane_CategoryObject_3");
        if (t3 != undefined)
            arrows[3].setTarget(t3);
        let s4 = this.mapObjects.get("Airplane_CategoryObject_5");
        if (s4 != undefined)
            arrows[4].setSource(s4);
        let t4 = this.mapObjects.get("Airplane_CategoryObject_0");
        if (t4 != undefined)
            arrows[4].setTarget(t4);
        let s5 = this.mapObjects.get("Airplane_CategoryObject_5");
        if (s5 != undefined)
            arrows[5].setSource(s5);
        let t5 = this.mapObjects.get("Airplane_CategoryObject_4");
        if (t5 != undefined)
            arrows[5].setTarget(t5);
        let s6 = this.mapObjects.get("Airplane_CategoryObject_5");
        if (s6 != undefined)
            arrows[6].setSource(s6);
        let t6 = this.mapObjects.get("Airplane_CategoryObject_2");
        if (t6 != undefined)
            arrows[6].setTarget(t6);
        objects[0].postSetArrow();
        objects[4].postSetArrow();
        objects[5].postSetArrow();
        objects[6].postSetArrow();
    }
}
exports.Airplane = Airplane;
//# sourceMappingURL=Airplane.js.map