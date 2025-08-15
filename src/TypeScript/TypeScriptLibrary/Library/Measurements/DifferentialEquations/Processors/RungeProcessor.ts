import { IMeasurements } from "../../Interfaces/IMeasurements";
import { IDifferentialEquationProcessor } from "../Interfaces/IDifferentialEquationProcessor ";
import { DifferentialEquationProcessor } from "./DifferentialEquationProcessor";

export class RungeProcessor extends DifferentialEquationProcessor
{

    w: number[] = [];
    z: number[] = [];
    f: number[] = [];
    k: number[][] = [][];
    a: number[] = [0.5, 0.5, 1.0, 1.0, 0.5];



    stepDifferentialEquations(start: number, finish: number): void {
        let dt = finish - start;
        let i = 0;
        for (let m of this.measurements)
        {
            m.updateMeasurements();
            for (let j = 0; j < m.getMeasurementsCount(); j++)
            {
                var mea = m.getMeasurement(j);
                var x = mea.getMeasurementValue();
                this.w[i] = this.performer.convertFromAny<number>(x);
                ++i;
            }
        }
        i = 0;
        for (let s of this.equations) {
            s.calculateDerivations();
            let m = s as unknown as IMeasurements;
            let count = m.getMeasurementsCount();
            for (var j = 0; j < count; j++) {
                var mea = m.getMeasurement(j);
                var v = this.performer.getDerivationMeasurement(mea);
                var y = this.performer.convertFromAny<number>(v);
                this.w[i] += y * dt;
                ++i;
            }
            s.copyVariablesToSolver(i - count, this.w);
        }

    }

    updateDimension(): void
    {
        super.updateDimension()
        let n = this.dimension;
        this.z = new Array(n);
        this.f = new Array(n);
        this.w = new Array(n);
        this.k = new Array(4)
        for (let i = 0; i < this.k.length; i++)
        {
            k[i] = new Array[n];
        }
    }

    newDifferentialEquations(): IDifferentialEquationProcessor {
        return new RungeProcessor()_;
    }

}