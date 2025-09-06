"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitalForecastCalculation = void 0;
const FictiveAlias_1 = require("../Library/Fiction/FictiveAlias");
const FictiveDataConsumer_1 = require("../Library/Fiction/FictiveDataConsumer");
const FictiveDataRuntime_1 = require("../Library/Fiction/FictiveDataRuntime");
const FictiveMeasurements_1 = require("../Library/Fiction/FictiveMeasurements");
const RungeProcessor_1 = require("../Library/Measurements/DifferentialEquations/Processors/RungeProcessor");
const PefrormerMeasuremets_1 = require("../Library/Measurements/PefrormerMeasuremets");
const DataRuntimeConsumerODE_1 = require("../Library/Runtime/DataRuntimeConsumerODE");
const OrbitalForecast_1 = require("./OrbitalForecast");
const Performer_1 = require("../Library/Performer");
class OrbitalForecastCalculation extends OrbitalForecast_1.OrbitalForecast {
    constructor() {
        super();
        this.calculate = (condition, controller) => __awaiter(this, void 0, void 0, function* () {
            this.contoller = controller;
            this.list = [];
            let processor = new RungeProcessor_1.RungeProcessor();
            this.runtime = new DataRuntimeConsumerODE_1.DataRuntimeConsumerODE(this.dc, processor);
            var p = new PefrormerMeasuremets_1.PefrormerMeasuremets();
            this.alias.setAliasValue("x", condition.X);
            p.peformCondDCFixedStepCalculation(this.runtime, this.dc, "Recursive.y", this, 0, 1, 18000, this);
            return this.list;
        });
        this.list = [];
        this.contoller = new AbortController();
        this.alias = new FictiveAlias_1.FictiveAlias();
        this.measurements = new FictiveMeasurements_1.FictiveMeasurements();
        this.dc = new FictiveDataConsumer_1.FictiveDataConsumer();
        this.runtime = new FictiveDataRuntime_1.FictiveDataRuntime();
        this.performer = new Performer_1.Performer();
        this.dc = this.getCategoryObject("Chart");
        this.alias = this.getCategoryObject("Motion equations");
        this.measurements = this.alias;
    }
    func() {
        return this.contoller.signal.aborted;
    }
    action() {
        var k = this.measurements;
        var rt = this.runtime.getTimeProvider();
        var t = rt.getTime();
        const item = {
            OrbitalTime: t,
            X: this.get(0),
            Y: this.get(1),
            Z: this.get(2),
            Vx: this.get(3),
            Vy: this.get(4),
            Vz: this.get(5)
        };
        this.list.push(item);
    }
    get(i) {
        let variable = this.measurements.getMeasurement(i).getMeasurementValue();
        return this.performer.convertFromAny(variable);
    }
}
exports.OrbitalForecastCalculation = OrbitalForecastCalculation;
//# sourceMappingURL=OrbitalForecastCalculation.js.map