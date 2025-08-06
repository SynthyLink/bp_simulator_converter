"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectTransformer = void 0;
const CategoryObject_1 = require("../CategoryObject");
const OwnError_1 = require("../ErrorHandler/OwnError");
const OwnNotImplemented_1 = require("../ErrorHandler/OwnNotImplemented");
const Performer_1 = require("../Performer");
class ObjectTransformer extends CategoryObject_1.CategoryObject {
    constructor(desktop, name) {
        super(desktop, name);
        this.performer = new Performer_1.Performer();
        /// <summary>
        /// Input
        /// </summary>
        this.input = [];
        /// <summary>
        /// Output measurements
        /// </summary>
        this.outMea = [];
        /// <summary>
        /// Input measurements
        /// </summary>
        this.inMea = [];
        /// <summary>
        /// Input objects
        /// </summary>
        this.inO = [];
        /// <summary>
        /// Output objects
        /// </summary>
        this.outO = [];
        /// <summary>
        /// Single output
        /// </summary>
        this.outS = [];
        /// <summary>
        /// Single input
        /// </summary>
        this.inS = [];
        /// <summary>
        /// The "is updated" sign
        /// </summary>
        this.isUpdated = false;
        /// <summary>
        /// External measurements
        /// </summary>
        /// <summary>
        /// Providers of measurements
        /// </summary>
        this.measurements = [];
        /// <summary>
        /// Links to variables
        /// </summary>
        this.links = new Map();
        /// <summary>
        /// Providers of measurements
        /// </summary>
        this.providers = [];
        this.transformers = [];
        this.typeName = "ObjectTransformer";
        this.types.push("ObjectTransformer");
        this.types.push("IObjectTransformerConsumer");
        this.types.push("IDataConsumer");
        this.types.push("IMeasurements");
        this.types.push("IPostSetArrow");
        this.cons = this;
    }
    postSetArrow() {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    getMeasurementsCount() {
        return this.outMea.length;
    }
    getMeasurement(i) {
        return this.outMea[i];
    }
    updateMeasurements() {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    addMeasurement(measurement) {
        this.outMea.push(measurement);
    }
    getAllMeasurements() {
        return this.measurements;
    }
    addMeasurements(item) {
        this.measurements.push(item);
    }
    addTransformer(transformer) {
        if (this.transformer != null) {
            throw new OwnError_1.OwnError("", "", "");
        }
        this.transformer = transformer;
        this.initTransformer();
    }
    initTransformer() {
        var sl = this.outS.length;
        if (this.outO.length != sl) {
            this.outO = new Array(sl);
            const arr = [];
            //var a = this.performer.resizeArray(arr, sl);
        }
        //  outMea = new IMeasurement[outO.Length];
        //inMea = new IMeasurement[transformer.Input.Length];
        //inO = new object[inMea.Length];
        this.createOutput();
    }
    createOutput() {
        var outS = this.transformer.getOutput();
        for (var i = 0; i < outS.length; i++) {
            var name = outS[i];
            var type = this.getOutputType(i);
            this.outMea.push(new TransMeasurement(i, this.outO, name, type));
        }
    }
    getOutputType(i) {
        return this.transformer.getOutputType(i);
    }
}
exports.ObjectTransformer = ObjectTransformer;
class TransMeasurement {
    constructor(n, outO, name, type) {
        this.outO = [];
        this.name = "";
        this.n = n;
        this.outO = outO;
        this.name = name;
        this.type = type;
    }
    getMeasurementName() {
        return this.name;
    }
    getMeasurementType() {
        return this.type;
    }
    getMeasurementValue() {
        return this.outO[this.n];
    }
}
//# sourceMappingURL=ObjectTransformer.js.map