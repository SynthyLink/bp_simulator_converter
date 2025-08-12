import { Performer } from "../../../Performer";
import { IMeasurements } from "../../Interfaces/IMeasurements";
import { IDifferentialEquationProcessor } from "../Interfaces/IDifferentialEquationProcessor ";
import { DifferentialEquationProcessor } from "./DifferentialEquationProcessor";

export class EulerProcessor extends DifferentialEquationProcessor
{
    performer: Performer = new Performer();

    w: number[] = [];

    stepDifferentialEquations(start: number, finish: number): void
    {
    /*    isBusy = true;
        if (Dim == 0) {
            return;
        }
            double dt = t1 - t0;
            int i = 0;
            */
        let dt = finish - start;
        let i = 0;
        for (let m of this.measurements)
        {
            for (let j = 0; j < m.getMeasurementsCount(); j++)
            {
                var mea = m.getMeasurement(j);
                var v = mea.getMeasurementValue();
                this.w[i] = this.performer.convertFromAny<number>(x);
                ++i;
            }
        }
     //   StaticExtensionDataPerformerPortable.Time = t;
     //   StaticExtensionDataPerformerPortable.Desktop.ResetUpdatedMeasurements();
     //   UpdateMeasurements();
        i = 0;
        for (let s of this.equations)
        {
            s.calculateDerivations();
            let m = s as unknown as IMeasurements;
            let count = m.getMeasurementsCount();
            for (var j = 0; j < count; j++)
            {
                var mea = m.getMeasurement(j);
                var x = this.performer.getDerivationMeasuremet(mea);
                w[i] += w[i] + x * dt;
                ++i;
            }
            s.copyVariablesToSolver(i - count, w);
        }

    }

    updateDimension(): void
    {
       
    }

    newDifferentialEquations(): IDifferentialEquationProcessor
    {
        return new EulerProcessor();
    }

    w: number[] = [];

}