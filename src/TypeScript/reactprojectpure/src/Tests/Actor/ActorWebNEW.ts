
import { IDataConsumer } from '../../Library/Measurements/Interfaces/IDataConsumer';
import { RungeProcessor } from '../../Library/Measurements/DifferentialEquations/Processors/RungeProcessor';
import { DataRuntimeConsumerODE } from '../../Library/Runtime/DataRuntimeConsumerODE';
//import { toDateTime } from '../../Algorithms/OrbitalForecastCalculation/OrbitalData';
import { IFunc } from '../../Library/Interfaces/IFunc';
import { IPlayEngine } from '../../Library/Interfaces/IPlayEngine';



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
export class ActorWebNew {
    finish(e): void {
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

 
    public actCompositionAct() {
   /*     var comp = new CompositionAct()
        comp.test();
        */

    }

    public actCompositionScada(engine: IPlayEngine) {
        //new ScadaComposition(engine)
    }

    public actCompositionEvent(engine: IPlayEngine) {
      /*  var comp = new CompositionEvent(engine)
        comp.test();*/

    }
}
