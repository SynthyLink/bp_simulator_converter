
import { ConditionTestAct } from '../Wrappers/ConditionTestAct';
import { ODEAct } from '../Wrappers/ODEAct';
import { OrbitAct } from '../Wrappers/OrbitAct';
import { RandomAct } from '../Wrappers/RandomAcr';
import { SimpleFeedAct } from '../Wrappers/SimpleFeedAct';
import { TwoAct } from '../Wrappers/TwoAct';
import { ODE_FeedbackAct } from '../Wrappers/ODE_FeedbackAct';
import { TransformerRecursveAct } from '../Wrappers/TransformerRecursveAct';
import { PIAct } from '../Wrappers/PIAct';
import { OrbitaForecasAct } from '../Wrappers/OrbitalForecastAct';
import { OrbitalForecastCalculation } from '../../Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation';
import { FeedBackFormulaAct } from '../Wrappers/FeedBackFormulaAct';
import { RecursvieFeedbackAct } from '../Wrappers/RecursvieFeedbackAct';
import { RecursiveFeedbackSimpleAct } from '../Wrappers/RecursiveFeedbackSimpleAct';
import { ODE_FeedAct } from '../Wrappers/ODE_FeedAcs';
import { DateTimeConverter } from '../../Library/Utilities/DateTime/DateTimeConverter';
import { DensityAct } from '../Wrappers/DenstyAct';
import { IDataConsumer } from '../../Library/Measurements/Interfaces/IDataConsumer';
import { RungeProcessor } from '../../Library/Measurements/DifferentialEquations/Processors/RungeProcessor';
import { DataRuntimeConsumerODE } from '../../Library/Runtime/DataRuntimeConsumerODE';
import { toDateTime } from '../../Algorithms/OrbitalForecastCalculation/OrbitalData';
import { Donchian } from '../Donchian';
import { CompositionAct } from '../Wrappers/ComposionAct';
import { CompositionEvent } from '../Wrappers/CompositionEvent';

import { PerformerMeasuremets } from '../../Library/Measurements/PerformerMeasuremets';
import { Composition } from '../Composition';
import { IFunc } from '../../Library/Interfaces/IFunc';
import { Obj3DCreator } from '../../Library/Abstract3DConverters/MeshCreators/Obj3DCreator';
import { UniversalFactory } from '../../Library/UniversalFactory';
import { StreamReader } from '../../Library/IO/StreamReader';
import { FileSystemFactory } from '../../Library/IO/FileSystemFactory';
import { LineEndSplitter } from '../../Library/Utilities/String/LineEndSplitter';
import type { IStringSplitter } from '../../Library/Utilities/String/Interfaces/IStringSplitter';

//import { Airplane } from '../../Airplane';



function finish(e : any) {
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
export class Actor {
    constructor()
    {

    }
    finish(e : any): void {
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

    public loadObj(filename: string): void {
        var fact = new UniversalFactory()
        var ff = new FileSystemFactory()
        ff.setFactory(fact)
        var ss = new LineEndSplitter()
        fact.addFactory<IStringSplitter>(ss, "IStringSplitter")
        var creator = new Obj3DCreator(filename, undefined, fact)
    }



    public readTest(f: string): void {
        let reader = new StreamReader(f)
        let s = reader.readToEnd()
        console.log(s)
    }

    public async actDonchianLoad(): Promise<void> {
        var d = new Donchian();
        var ac = new AbortController();
        await d.loadAsync(ac);
    }

    public actCompositionAct() {
        var comp = new CompositionAct()
        comp.test();

    }

    public actAirplane() {
      //  new Airplane()
    }
    public actCompositionEvent(stop: IFunc<boolean>) {
      //  var comp = new CompositionEvent(stop)
       // comp.test();

    }


    public testDate(): void {
        var dt = new DateTimeConverter();
    }

    async actOrbitCalculation(b: boolean): Promise<void> {
        var o = new OrbitalForecastCalculation();
        var bb = 1770457504;
        const cond = {
            begin: bb, end: bb + 18000, x: -5448.34815324, y: -4463.93698421, z: 0, vx: -0.98539477743, vy: 1.21681893834, vz: 7.45047785592
        };
        o.set(cond);
        if (b) {
            var ab = new AbortController();
            const t = await o.calculate(cond, ab);
            for (var x of t) {
                var y = toDateTime(x);
                console.log(y);
            }
        }
        else {
            let dc = o.getCategoryObject("Chart") as unknown as IDataConsumer;
            let p = new PerformerMeasuremets();
            o.set(cond);
            o.performFixedStepCalculation();
            const list = o.getResult();
            console.log(list);

            //    let m = this.getCategoryObject("A-transformation") as unknown as IMeasurements;
            //   this.measurement = m.getMeasurement(0);


        }
        console.log("finish");
    }

    actDensity(): void {
        try {
            var o = new DensityAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }

    actTime(): void {
        console.log(new Date(0));
        var x = new DateTimeConverter();
        console.log(x.fromOADate(0));
        var t = 1770463387;
        t = t / (24 * 60 * 60);
        console.log(t);
        var d = x.fromOADate(t);
        console.log(d);
        console.log(x.toOADate(d));

    }


    actFeedbackFormula(): void {
        try {
            var o = new FeedBackFormulaAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }

    }

    actODE_FeedAct(): void {
        try {
            var o = new ODE_FeedAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }

    }


    actRecursiveFeedback(): void {
        try {
            var o = new RecursvieFeedbackAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }

    }



    actRecursiveFeedbackSimplw(): void {
        try {
            var o = new RecursiveFeedbackSimpleAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }

    }



    actODEFeedback(): void {
        try {
            var o = new ODE_FeedbackAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }

    }


    actOrbitalForecast(): void {
        try {
            var o = new OrbitaForecasAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }

    }



    actTransformerFeedback(): void {
        try {
            var o = new TransformerRecursveAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }

    }


    actODE(): void {
        try {
            var o = new ODEAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }

    actCondition(): void {
        try {
            var o = new ConditionTestAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }

    actPI(): void {
        try {
            var o = new PIAct();
            o.test();
        }
        catch (e) {
            finish(e);
        }
    }


    actTestObjectTransformerSimple(): void {
        try {
            /*  var o = new TestObjectTransformerSimpleAct();
              o.test();*/
        }
        catch (e) {
            finish(e);
        }
    }


    actSimpleFeed(): void {
        try {
            var o = new SimpleFeedAct();
            o.test();
        }
        catch (e) {
            console.log(e);
        }
    }
    actTwo(): void {
        try {
            var o = new TwoAct();
            o.test();
        }
        catch (e) {
            console.log(e);
        }
    }

    public actComposition(): void {
        try {
            var o = new CompositionAct()
            o.test();
        }
        catch (e) {
            console.log(e);
        }
    }

   


    actRandom(): void {
        try {
            var o = new RandomAct();
            o.test();
        }
        catch (e) {
            console.log(e);
          }

    }

    actOrbit(): void {
        try {
            var o = new OrbitAct();
            o.test();
        }
        catch (e) {
            var i = 0;
        }
    }
}
