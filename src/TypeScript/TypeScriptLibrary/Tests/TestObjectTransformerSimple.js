"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestObjectTransformerSimple = void 0;
const TestObjectTransformer_1 = require("../ExternalObjects/Test_Obects/TestObjectTransformer");
const AliasName_1 = require("../Library/AliasName");
const Desktop_1 = require("../Library/Desktop");
const FeedbackAliasCollection_1 = require("../Library/FeedbackAliasCollection");
const FictiveAliasName_1 = require("../Library/Fiction/FictiveAliasName");
const FictiveMeasurement_1 = require("../Library/Fiction/FictiveMeasurement");
const FictiveValue_1 = require("../Library/Fiction/FictiveValue");
const DataLink_1 = require("../Library/Measurements/Arrows/DataLink");
const ObjectTransformerLink_1 = require("../Library/Measurements/Arrows/ObjectTransformerLink");
const DataConsumer_1 = require("../Library/Measurements/DataConsumer");
const ObjectTransformer_1 = require("../Library/Measurements/ObjectTransformer");
const Recursive_1 = require("../Library/Measurements/Recursive");
const Variable_1 = require("../Library/Measurements/Variables/Variable");
const VectorFormulaConsumer_1 = require("../Library/Measurements/VectorFormulaConsumer");
class TestObjectTransformerSimple_CategoryObject_0 extends VectorFormulaConsumer_1.VectorFormulaConsumer {
    constructor(desktop, name) {
        super(desktop, name);
        this.aliasName0 = new FictiveAliasName_1.FictiveAliasName();
        this.aliasName1 = new FictiveAliasName_1.FictiveAliasName();
        this.aliasName2 = new FictiveAliasName_1.FictiveAliasName();
        this.aliasName3 = new FictiveAliasName_1.FictiveAliasName();
        this.var_0 = 0;
        this.var_1 = 0;
        this.var_2 = 0;
        this.var_3 = 0;
        let map = new Map([
            ["c", 0.52807755063743145],
            ["a", 0.19288702860157331],
            ["b", 0.0021040127652205607],
            ["d", 9]
        ]);
        this.performer.setAliasMap(map, this);
        this.addVariable(new Variable_1.Variable("Formula_1", 0, 0));
        this.addVariable(new Variable_1.Variable("Formula_2", 0, 0));
        this.addVariable(new Variable_1.Variable("Formula_3", 0, 0));
        this.addVariable(new Variable_1.Variable("Formula_4", 0, 0));
    }
    calculateTree() {
        this.success = true;
        this.variable = this.aliasName0.getAliasNameValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_0 = this.convert(this.variable);
        this.variable = this.aliasName1.getAliasNameValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_1 = this.convert(this.variable);
        this.variable = this.aliasName2.getAliasNameValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_2 = this.convert(this.variable);
        this.variable = this.aliasName3.getAliasNameValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_3 = this.convert(this.variable);
    }
    init() {
        var all = this.getAllMeasurements();
        this.aliasName0 = new AliasName_1.AliasName(this.alias, "a");
        this.aliasName1 = new AliasName_1.AliasName(this.alias, "b");
        this.aliasName2 = new AliasName_1.AliasName(this.alias, "c");
        this.aliasName3 = new AliasName_1.AliasName(this.alias, "d");
    }
    get_0() {
        return this.success ? this.var_0 : undefined;
    }
    get_1() {
        return this.success ? this.var_1 : undefined;
    }
    get_2() {
        return this.success ? this.var_2 : undefined;
    }
    get_3() {
        return this.success ? this.var_3 : undefined;
    }
    save() {
        var v = this.variables;
        var x0 = v.get("Formula_1");
        x0 === null || x0 === void 0 ? void 0 : x0.setIValue(this.get_0());
        var x1 = v.get("Formula_2");
        x1 === null || x1 === void 0 ? void 0 : x1.setIValue(this.get_1());
        var x2 = v.get("Formula_3");
        x2 === null || x2 === void 0 ? void 0 : x2.setIValue(this.get_2());
        var x3 = v.get("Formula_4");
        x3 === null || x3 === void 0 ? void 0 : x3.setIValue(this.get_3());
    }
    setFeedback() {
        let map = new Map([]);
        this.feedback = new FeedbackAliasCollection_1.FeedbackAliasCollection(map, this, this);
        this.feedback.fillFeedBackAliases();
    }
}
class TestObjectTransformerSimple_CategoryObject_1 extends TestObjectTransformer_1.TestObjectTransformer {
    constructor(desktop, name) {
        super(desktop, name);
        this.coefficient = 0.24;
    }
}
class TestObjectTransformerSimple_CategoryObject_2 extends ObjectTransformer_1.ObjectTransformer {
    constructor(desktop, name) {
        super(desktop, name);
        let map = new Map([
            ["a", "Vector.Formula_1"],
            ["b", "Vector.Formula_2"],
            ["c", "Vector.Formula_3"],
            ["d", "Vector.Formula_4"]
        ]);
        this.setLinks(map);
    }
}
class TestObjectTransformerSimple_CategoryObject_3 extends Recursive_1.Recursive {
    constructor(desktop, name) {
        super(desktop, name);
        this.measurement1 = new FictiveMeasurement_1.FictiveMeasurement();
        this.value2 = new FictiveValue_1.FictiveValue();
        this.measurement5 = new FictiveMeasurement_1.FictiveMeasurement();
        this.value6 = new FictiveValue_1.FictiveValue();
        this.measurement9 = new FictiveMeasurement_1.FictiveMeasurement();
        this.value10 = new FictiveValue_1.FictiveValue();
        this.aliasName0 = new FictiveAliasName_1.FictiveAliasName();
        this.aliasName14 = new FictiveAliasName_1.FictiveAliasName();
        this.var_0 = 0;
        this.var_1 = 0;
        this.var_2 = 0;
        this.var_3 = 0;
        this.var_4 = 0;
        this.var_5 = 0;
        this.var_6 = 0;
        this.var_7 = 0;
        this.var_8 = 0;
        this.var_9 = 0;
        this.var_10 = 0;
        this.var_11 = 0;
        this.var_12 = 0;
        this.var_13 = 0;
        this.var_14 = 0;
        this.var_15 = 0;
        this.var_16 = 0;
        let map = new Map([
            ["k", 0.69999999999999996],
            ["l", 0.01],
            ["a", 1],
            ["b", 3],
            ["c", 5],
            ["d", 4],
            ["f", 1]
        ]);
        this.performer.setAliasMap(map, this);
        this.addVariable(new Variable_1.Variable("a", 0, 0));
        this.addVariable(new Variable_1.Variable("b", 0, 0));
        this.addVariable(new Variable_1.Variable("c", 0, 0));
        this.addVariable(new Variable_1.Variable("d", 0, 0));
        this.addVariable(new Variable_1.Variable("f", 0, 0));
        this.initial.set("d", 4);
        this.initial.set("f", 1);
        this.initial.set("a", 1);
        this.initial.set("c", 5);
        this.initial.set("b", 3);
    }
    calculateTree() {
        this.success = true;
        this.variable = this.aliasName0.getAliasNameValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_0 = this.convert(this.variable);
        this.variable = this.measurement1.getMeasurementValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_1 = this.convert(this.variable);
        this.variable = this.value2.getIValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_2 = this.convert(this.variable);
        this.variable = (this.var_1) + (this.var_2);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_3 = this.convert(this.variable);
        this.variable = (this.var_0) * (this.var_3);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_4 = this.convert(this.variable);
        this.variable = this.measurement5.getMeasurementValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_5 = this.convert(this.variable);
        this.variable = this.value6.getIValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_6 = this.convert(this.variable);
        this.variable = (this.var_5) + (this.var_6);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_7 = this.convert(this.variable);
        this.variable = (this.var_0) * (this.var_7);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_8 = this.convert(this.variable);
        this.variable = this.measurement9.getMeasurementValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_9 = this.convert(this.variable);
        this.variable = this.value10.getIValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_10 = this.convert(this.variable);
        this.variable = (this.var_9) + (this.var_10);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_11 = this.convert(this.variable);
        this.variable = (this.var_0) * (this.var_11);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_12 = this.convert(this.variable);
        this.variable = (this.var_0) * (this.var_1);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_13 = this.convert(this.variable);
        this.variable = this.aliasName14.getAliasNameValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_14 = this.convert(this.variable);
        this.var_15 = this.getInternalTime();
        this.variable = (this.var_14) * (this.var_15);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_16 = this.convert(this.variable);
    }
    init() {
        var all = this.getAllMeasurements();
        this.measurement1 = all[0].getMeasurement(0);
        this.value2 = this.output[0];
        this.measurement5 = all[0].getMeasurement(1);
        this.value6 = this.output[1];
        this.measurement9 = all[0].getMeasurement(2);
        this.value10 = this.output[2];
        this.aliasName0 = new AliasName_1.AliasName(this.alias, "k");
        this.aliasName14 = new AliasName_1.AliasName(this.alias, "l");
    }
    get_0() {
        return this.success ? this.var_0 : undefined;
    }
    get_1() {
        return this.success ? this.var_1 : undefined;
    }
    get_2() {
        return this.success ? this.var_2 : undefined;
    }
    get_3() {
        return this.success ? this.var_3 : undefined;
    }
    get_4() {
        return this.success ? this.var_4 : undefined;
    }
    get_5() {
        return this.success ? this.var_5 : undefined;
    }
    get_6() {
        return this.success ? this.var_6 : undefined;
    }
    get_7() {
        return this.success ? this.var_7 : undefined;
    }
    get_8() {
        return this.success ? this.var_8 : undefined;
    }
    get_9() {
        return this.success ? this.var_9 : undefined;
    }
    get_10() {
        return this.success ? this.var_10 : undefined;
    }
    get_11() {
        return this.success ? this.var_11 : undefined;
    }
    get_12() {
        return this.success ? this.var_12 : undefined;
    }
    get_13() {
        return this.success ? this.var_13 : undefined;
    }
    get_14() {
        return this.success ? this.var_14 : undefined;
    }
    get_15() {
        return this.success ? this.var_15 : undefined;
    }
    get_16() {
        return this.success ? this.var_16 : undefined;
    }
    save() {
        var v = this.variables;
        var x0 = v.get("a");
        x0 === null || x0 === void 0 ? void 0 : x0.setIValue(this.get_4());
        var x1 = v.get("b");
        x1 === null || x1 === void 0 ? void 0 : x1.setIValue(this.get_8());
        var x2 = v.get("c");
        x2 === null || x2 === void 0 ? void 0 : x2.setIValue(this.get_12());
        var x3 = v.get("d");
        x3 === null || x3 === void 0 ? void 0 : x3.setIValue(this.get_13());
        var x4 = v.get("f");
        x4 === null || x4 === void 0 ? void 0 : x4.setIValue(this.get_16());
    }
    setFeedback() {
        let map = new Map([
            ["a", "Vector.a"],
            ["c", "Vector.c"],
            ["b", "Vector.b"]
        ]);
        this.feedback = new FeedbackAliasCollection_1.FeedbackAliasCollection(map, this, this);
        this.feedback.fillFeedBackAliases();
    }
}
class TestObjectTransformerSimple_CategoryObject_4 extends DataConsumer_1.DataConsumer {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class TestObjectTransformerSimple_CategoryArrow_0 extends ObjectTransformerLink_1.ObjectTransformerLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class TestObjectTransformerSimple_CategoryArrow_1 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class TestObjectTransformerSimple_CategoryArrow_2 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class TestObjectTransformerSimple_CategoryArrow_3 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class TestObjectTransformerSimple_CategoryArrow_4 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class TestObjectTransformerSimple_CategoryArrow_5 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class TestObjectTransformerSimple extends Desktop_1.Desktop {
    constructor() {
        super();
        this.name = "TestObjectTransformerSimple";
        new TestObjectTransformerSimple_CategoryObject_0(this, "Vector");
        new TestObjectTransformerSimple_CategoryObject_1(this, "Source");
        new TestObjectTransformerSimple_CategoryObject_2(this, "Transformer");
        new TestObjectTransformerSimple_CategoryObject_3(this, "Recursive");
        new TestObjectTransformerSimple_CategoryObject_4(this, "Chart");
        new TestObjectTransformerSimple_CategoryArrow_0(this, "");
        new TestObjectTransformerSimple_CategoryArrow_1(this, "");
        new TestObjectTransformerSimple_CategoryArrow_2(this, "");
        new TestObjectTransformerSimple_CategoryArrow_3(this, "");
        new TestObjectTransformerSimple_CategoryArrow_4(this, "");
        new TestObjectTransformerSimple_CategoryArrow_5(this, "");
        let objects = this.getCategoryObjects();
        let arrows = this.getCategoryArrows();
        arrows[0].setSource(objects[2]);
        arrows[0].setTarget(objects[1]);
        arrows[1].setSource(objects[2]);
        arrows[1].setTarget(objects[0]);
        arrows[2].setSource(objects[3]);
        arrows[2].setTarget(objects[2]);
        arrows[3].setSource(objects[3]);
        arrows[3].setTarget(objects[0]);
        arrows[4].setSource(objects[4]);
        arrows[4].setTarget(objects[3]);
        arrows[5].setSource(objects[4]);
        arrows[5].setTarget(objects[2]);
        objects[0].postSetArrow();
        objects[2].postSetArrow();
        objects[3].postSetArrow();
    }
}
exports.TestObjectTransformerSimple = TestObjectTransformerSimple;
//# sourceMappingURL=TestObjectTransformerSimple.js.map