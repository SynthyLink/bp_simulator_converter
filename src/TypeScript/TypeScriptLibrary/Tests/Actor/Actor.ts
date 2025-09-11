
import * as readline from 'readline';
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
import { OrbitalForecastCalculation } from '../../ExternalObjects/Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation';
import { FeedBackFormulaAct } from '../Wrappers/FeedBackFormulaAct';
import { RecursvieFeedbackAct } from '../Wrappers/RecursvieFeedbackAct';
import { RecursiveFeedbackSimpleAct } from '../Wrappers/RecursiveFeedbackSimpleAct';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function finish(e: any) {
    console.log(e);
    rl.question('Is this example useful? [y/n] ', (answer) => {
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
    });
}
export class Actor
{
    finish(e: any) : void {
        rl.question('Is this example useful? [y/n] ', (answer) => {
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
        });
    }

    async actOrbitCalculation(): Promise<void> {
        var o = new OrbitalForecastCalculation();
        const cond = {
            Begin: 0, End: 20000, X: -5448.34815324, Y: -4463.93698421, Z: 0, Vx: 0.98539477743, Vy: 1.21681893834, Vz: 7.45047785592
        };
        var ab = new AbortController();
        const t = await o.calculate(cond, ab);
        console.log(t);
        console.log("finish");
    }


    actFeedbackFormula(): void {
        try {
            var o = new FeedBackFormulaAct();
            o.test();
        }
        catch (e: any) {
            finish(e);
        }

    }

    actRecursiveFeedback(): void {
        try {
            var o = new RecursvieFeedbackAct();
            o.test();
        }
        catch (e: any) {
            finish(e);
        }

    }



    actRecursiveFeedbackSimplw(): void {
        try {
            var o = new RecursiveFeedbackSimpleAct();
            o.test();
        }
        catch (e: any) {
            finish(e);
        }

    }



    actODEFeedback(): void
    {
        try
        {
            var o = new ODE_FeedbackAct();
            o.test();
        }
        catch (e: any) {
            finish(e);
        }

    }


    actOrbitalForecast(): void {
        try {
            var o = new OrbitaForecasAct();
            o.test();
        }
        catch (e: any) {
            finish(e);
        }

    }



    actTransformerFeedback(): void {
        try {
            var o = new TransformerRecursveAct();
            o.test();
        }
        catch (e: any) {
            finish(e);
        }

    }


    actODE(): void
    {
        try
        {
            var o = new ODEAct();
            o.test();
        }
        catch (e: any)
        {
            finish(e);
        }
    }

    actCondition(): void {
        try {
            var o = new ConditionTestAct();
            o.test();
        }
        catch (e: any) {
            finish(e);
        }
    }

    actPI(): void {
        try {
            var o = new PIAct();
            o.test();
        }
        catch (e: any) {
            finish(e);
        }
    }


    actTestObjectTransformerSimple(): void {
        try {
            /*  var o = new TestObjectTransformerSimpleAct();
              o.test();*/
        }
        catch (e: any) {
            finish(e);
        }
    }


    actSimpleFeed(): void {
        try {
            var o = new SimpleFeedAct();
            o.test();
        }
        catch (e: any) {
            console.log(e);
        }
    }
    actTwo(): void {
        try {
            var o = new TwoAct();
            o.test();
        }
        catch (e: any) {
            console.log(e);
            rl.question('Is this example useful? [y/n] ', (answer) => {
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
            });
        }
    }
    actRandom(): void {
        try {
            var o = new RandomAct();
            o.test();
        }
        catch (e: any) {
            console.log(e);
            rl.question('Is this example useful? [y/n] ', (answer) => {
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
            });
        }

    }

    actOrbit(): void {
        try {
            var o = new OrbitAct();
            o.test();
        }
        catch (e: any) {
            var i = 0;
        }
    }
}
