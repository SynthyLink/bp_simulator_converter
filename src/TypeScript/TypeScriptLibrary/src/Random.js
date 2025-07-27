"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const AliasName_1 = require("../Library/AliasName");
const Desktop_1 = require("../Library/Desktop");
const AliasNameMeasurement_1 = require("../Library/Measurements/AliasNameMeasurement");
const DataConsumer_1 = require("../Library/Measurements/DataConsumer");
const DataLink_1 = require("../Library/Measurements/DataLink");
const Measurement_1 = require("../Library/Measurements/Measurement");
const RandomGenerator_1 = require("../Library/Measurements/RandomGenerator");
const Recursive_1 = require("../Library/Measurements/Recursive");
const VectorFormulaConsumer_1 = require("../Library/Measurements/VectorFormulaConsumer");
class Random_CategoryObject_0 extends RandomGenerator_1.RandomGenerator {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Random_CategoryObject_1 extends RandomGenerator_1.RandomGenerator {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Random_CategoryObject_2_Measurement_11 extends Measurement_1.Measurement {
    constructor(o, name, type) {
        super(name, type);
        this.obj = o;
    }
    getMeasurementValue() {
        return this.obj.get_11();
    }
}
class Random_CategoryObject_2 extends VectorFormulaConsumer_1.VectorFormulaConsumer {
    constructor(desktop, name) {
        super(desktop, name);
        this.var_0 = 0;
        this.var_1 = 2;
        this.var_2 = 0;
        this.var_3 = 0;
        this.var_4 = 2;
        this.var_5 = 0;
        this.var_6 = 0;
        this.var_7 = 1;
        this.var_8 = false;
        this.var_9 = 0;
        this.var_10 = 0;
        this.var_11 = 0;
        let map = new Map([
            ["f", 0.0040000000000000001]
        ]);
        this.performer.setAliasMap(map, this);
        let feed = new Map([]);
        this.performer.copyMap(feed, this.feedback);
        this.arguments.push("x = Y.Random");
        this.arguments.push("y = X.Random");
        let ops = new Map([]);
    }
    calculateTree() {
        this.success = true;
        this.variable = this.measurement0.getMeasurementValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_0 = this.convert(this.variable);
        this.variable = Math.pow(this.var_0, this.var_1);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_2 = this.convert(this.variable);
        this.variable = this.measurement3.getMeasurementValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_3 = this.convert(this.variable);
        this.variable = Math.pow(this.var_3, this.var_4);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_5 = this.convert(this.variable);
        this.variable = (this.var_2) + (this.var_5);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_6 = this.convert(this.variable);
        this.variable = (this.var_6) > (this.var_7);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_8 = this.convert(this.variable);
        this.variable = this.aliasName10.getAliasNameValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_10 = this.convert(this.variable);
        this.variable = (this.var_8) ? (this.var_9) : (this.var_10);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_11 = this.convert(this.variable);
    }
    init() {
        this.addMeasurement(new Random_CategoryObject_2_Measurement_11(this, "Formula_1", 0));
        this.measurement0 = this.dataConsumer.getAllMeasurements()[0].getMeasurement(0);
        this.measurement3 = this.dataConsumer.getAllMeasurements()[1].getMeasurement(0);
        this.aliasName10 = new AliasName_1.AliasName(this.alias, "f");
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
}
class Random_CategoryObject_3 extends Recursive_1.Recursive {
    constructor(desktop, name) {
        super(desktop, name);
        this.var_0 = 0;
        this.var_1 = 0;
        this.var_2 = 0;
        this.var_3 = 0;
        this.var_4 = 0;
        this.var_5 = 0;
        this.var_6 = 0;
        let map = new Map([
            ["d", 0],
            ["c", 0],
            ["a", 0]
        ]);
        this.performer.setAliasMap(map, this);
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
        this.variable = (this.var_0) + (this.var_1);
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
        this.variable = (this.var_2) + (this.var_3);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_4 = this.convert(this.variable);
        this.variable = this.aliasName5.getAliasNameValue();
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_5 = this.convert(this.variable);
        this.variable = (this.var_4) + (this.var_5);
        if (this.check(this.variable)) {
            this.success = false;
            return;
        }
        this.var_6 = this.convert(this.variable);
    }
    init() {
        this.addMeasurement(new AliasNameMeasurement_1.AliasNameMeasurement(this, "a"));
        this.measurement1 = this.dataConsumer.getAllMeasurements()[0].getMeasurement(0);
        this.aliasName0 = new AliasName_1.AliasName(this.alias, "a");
        this.aliasName3 = new AliasName_1.AliasName(this.alias, "c");
        this.aliasName5 = new AliasName_1.AliasName(this.alias, "d");
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
    save() {
        this.setAliasValue("a", this.get_0());
    }
}
class Random_CategoryObject_4 extends DataConsumer_1.DataConsumer {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Random_CategoryArrow_0 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Random_CategoryArrow_1 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Random_CategoryArrow_2 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Random_CategoryArrow_3 extends DataLink_1.DataLink {
    constructor(desktop, name) {
        super(desktop, name);
    }
}
class Random extends Desktop_1.Desktop {
    constructor() {
        super();
        this.name = "Random";
        new Random_CategoryObject_0(this, "X");
        new Random_CategoryObject_1(this, "Y");
        new Random_CategoryObject_2(this, "Data");
        new Random_CategoryObject_3(this, "Recursive");
        new Random_CategoryObject_4(this, "Chart");
        new Random_CategoryArrow_0(this, "2");
        new Random_CategoryArrow_1(this, "1");
        new Random_CategoryArrow_2(this, "3");
        new Random_CategoryArrow_3(this, "4");
        let objects = this.getCategoryObjects();
        let arrows = this.getCategoryArrows();
        arrows[0].setSource(objects[2]);
        arrows[0].setTarget(objects[1]);
        arrows[1].setSource(objects[2]);
        arrows[1].setTarget(objects[0]);
        arrows[2].setSource(objects[3]);
        arrows[2].setTarget(objects[2]);
        arrows[3].setSource(objects[4]);
        arrows[3].setTarget(objects[3]);
        objects[2].postSetArrow();
        objects[3].postSetArrow();
    }
}
exports.Random = Random;
//# sourceMappingURL=Random.js.map