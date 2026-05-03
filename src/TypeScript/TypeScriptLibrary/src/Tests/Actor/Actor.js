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
exports.Actor = void 0;
const ConditionTestAct_1 = require("../Wrappers/ConditionTestAct");
const ODEAct_1 = require("../Wrappers/ODEAct");
const OrbitAct_1 = require("../Wrappers/OrbitAct");
const RandomAcr_1 = require("../Wrappers/RandomAcr");
const SimpleFeedAct_1 = require("../Wrappers/SimpleFeedAct");
const TwoAct_1 = require("../Wrappers/TwoAct");
const ODE_FeedbackAct_1 = require("../Wrappers/ODE_FeedbackAct");
const PIAct_1 = require("../Wrappers/PIAct");
const OrbitalForecastAct_1 = require("../Wrappers/OrbitalForecastAct");
const OrbitalForecastCalculation_1 = require("../../Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation");
const FeedBackFormulaAct_1 = require("../Wrappers/FeedBackFormulaAct");
const RecursvieFeedbackAct_1 = require("../Wrappers/RecursvieFeedbackAct");
const RecursiveFeedbackSimpleAct_1 = require("../Wrappers/RecursiveFeedbackSimpleAct");
const ODE_FeedAcs_1 = require("../Wrappers/ODE_FeedAcs");
const DateTimeConverter_1 = require("../../Library/Utilities/DateTime/DateTimeConverter");
const DenstyAct_1 = require("../Wrappers/DenstyAct");
const OrbitalData_1 = require("../../Algorithms/OrbitalForecastCalculation/OrbitalData");
const Donchian_1 = require("../Donchian");
const ComposionAct_1 = require("../Wrappers/ComposionAct");
const PerformerMeasuremets_1 = require("../../Library/Measurements/PerformerMeasuremets");
const Obj3DCreator_1 = require("../../Library/Abstract3DConverters/MeshCreators/Obj3DCreator");
const UniversalFactory_1 = require("../../Library/UniversalFactory");
const StreamReader_1 = require("../../Library/IO/StreamReader");
const FileSystemFactory_1 = require("../../Library/IO/FileSystemFactory");
const LineEndSplitter_1 = require("../../Library/Utilities/String/LineEndSplitter");
//import { Airplane } from '../../Airplane';
function finish(e) {
    console.log(e);
    /* rl.question('Is this example useful? [y/n] ', (answer) => {
          switch (answer.toLowerCase()) {
              case 'y':
                  console.log('Super!');
                  break;
              case 'n':
                  console.log('Sorry! :(');
                  break;
              default:
                  console.log('Invalid answer!');
          }
       //   rl.close();
     // });
     */
}
class Actor {
    constructor() {
    }
    finish(e) {
        /*   rl.question('Is this example useful? [y/n] ', (answer) => {
               switch (answer.toLowerCase()) {
                   case 'y':
                       console.log('Super!');
                       break;
                   case 'n':
                       console.log('Sorry! :(');
                       break;
                   default:
                       console.log('Invalid answer!');
               }
               rl.close();
           });*/
    }
    loadObj(filename) {
        var fact = new UniversalFactory_1.UniversalFactory();
        var ff = new FileSystemFactory_1.FileSystemFactory();
        ff.setFactory(fact);
        var ss = new LineEndSplitter_1.LineEndSplitter();
        fact.addFactory(ss, "IStringSplitter");
        var creator = new Obj3DCreator_1.Obj3DCreator(filename, "", undefined, fact);
        var m = creator.getMeshCreatorMeshes();
        console.log(m);
    }
    readTest(f) {
        let reader = new StreamReader_1.StreamReader(f);
        let s = reader.readToEnd();
        console.log(s);
    }
    actDonchianLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            var d = new Donchian_1.Donchian();
            var ac = new AbortController();
            yield d.loadAsync(ac);
        });
    }
    actCompositionAct() {
        var comp = new ComposionAct_1.CompositionAct();
        comp.test();
    }
    actAirplane() {
        //  new Airplane()
    }
    actCompositionEvent(stop) {
        //  var comp = new CompositionEvent(stop)
        // comp.test();
    }
    testDate() {
        var dt = new DateTimeConverter_1.DateTimeConverter();
    }
    actOrbitCalculation(b) {
        return __awaiter(this, void 0, void 0, function* () {
            var o = new OrbitalForecastCalculation_1.OrbitalForecastCalculation();
            var bb = 1770457504;
            const cond = {
                begin: bb, end: bb + 18000, x: -5448.34815324, y: -4463.93698421, z: 0, vx: -0.98539477743, vy: 1.21681893834, vz: 7.45047785592
            };
            o.set(cond);
            if (b) {
                var ab = new AbortController();
                const t = yield o.calculate(cond, ab);
                for (var x of t) {
                    var y = (0, OrbitalData_1.toDateTime)(x);
                    console.log(y);
                }
            }
            else {
                let dc = o.getCategoryObject("Chart");
                let p = new PerformerMeasuremets_1.PerformerMeasuremets();
                o.set(cond);
                o.performFixedStepCalculation();
                const list = o.getResult();
                console.log(list);
                //    let m = this.getCategoryObject("A-transformation") as unknown as IMeasurements;
                //   this.measurement = m.getMeasurement(0);
            }
            console.log("finish");
        });
    }
    actDensity() {
        try {
            var o = new DenstyAct_1.DensityAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actTime() {
        console.log(new Date(0));
        var x = new DateTimeConverter_1.DateTimeConverter();
        console.log(x.fromOADate(0));
        var t = 1770463387;
        t = t / (24 * 60 * 60);
        console.log(t);
        var d = x.fromOADate(t);
        console.log(d);
        console.log(x.toOADate(d));
    }
    actFeedbackFormula() {
        try {
            var o = new FeedBackFormulaAct_1.FeedBackFormulaAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actODE_FeedAct() {
        try {
            var o = new ODE_FeedAcs_1.ODE_FeedAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actRecursiveFeedback() {
        try {
            var o = new RecursvieFeedbackAct_1.RecursvieFeedbackAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actRecursiveFeedbackSimplw() {
        try {
            var o = new RecursiveFeedbackSimpleAct_1.RecursiveFeedbackSimpleAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actODEFeedback() {
        try {
            var o = new ODE_FeedbackAct_1.ODE_FeedbackAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actOrbitalForecast() {
        try {
            var o = new OrbitalForecastAct_1.OrbitaForecasAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actTransformerFeedback() {
        try {
            //    var o = new TransformerRecursveAct();
            //   o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actODE() {
        try {
            var o = new ODEAct_1.ODEAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actCondition() {
        try {
            var o = new ConditionTestAct_1.ConditionTestAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actPI() {
        try {
            var o = new PIAct_1.PIAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }
    actTestObjectTransformerSimple() {
        try {
            /*  var o = new TestObjectTransformerSimpleAct();
              o.test();*/
        }
        catch (e) {
            finish(e);
        }
    }
    actSimpleFeed() {
        try {
            var o = new SimpleFeedAct_1.SimpleFeedAct();
            o.test();
        }
        catch (e) {
            console.log(e);
        }
    }
    actTwo() {
        try {
            var o = new TwoAct_1.TwoAct();
            o.test();
        }
        catch (e) {
            console.log(e);
        }
    }
    actComposition() {
        try {
            var o = new ComposionAct_1.CompositionAct();
            o.test();
        }
        catch (e) {
            console.log(e);
        }
    }
    actRandom() {
        try {
            var o = new RandomAcr_1.RandomAct();
            o.test();
        }
        catch (e) {
            console.log(e);
        }
    }
    actOrbit() {
        try {
            var o = new OrbitAct_1.OrbitAct();
            o.test();
        }
        catch (e) {
            var i = 0;
        }
    }
}
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map