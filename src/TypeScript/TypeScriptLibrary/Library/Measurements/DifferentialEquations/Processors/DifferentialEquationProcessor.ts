import { OwnNotImplemented } from "../../../ErrorHandler/OwnNotImplemented";
import { FictiveTimeMeasurementProvider } from "../../../Fiction/FictiveTimeMeasurementProvider";
import { IMeasurements } from "../../Interfaces/IMeasurements";
import { INormalizable } from "../../Interfaces/INormalizable";
import { ITimeMeasurementProvider } from "../../Interfaces/ITimeMeasurementProvider";
import { IDifferentialEquationProcessor } from "../Interfaces/IDifferentialEquationProcessor ";
import { IDifferentialEquationSolver } from "../Interfaces/IDifferentialEquationSolver";


export class DifferentialEquationProcessor implements IDifferentialEquationProcessor
{

    protected dimension: number = 0;
    
    setDifferentialEquationProcessor(collection: any): void
    {
        throw new Error("Method not implemented.");
    }
    getDifferentialEquations(): IDifferentialEquationSolver[] {
        return this.equations;
    }

    addRangeDifferentialEquations(equations: IDifferentialEquationSolver[]): void
    {
        for (let e of equations)
        {
            this.equations.push(e);
        }
    }

    stepDifferentialEquations(start: number, finish: number): void
    {
        throw new OwnNotImplemented();
    }

    updateDimension(): void
    {
        this.dimension = 0;
        for (var m of this.measurements)
        {
            this.dimension += m.getMeasurementsCount();
        }
    }

    getDifferentialEquationsTimeProvider(): ITimeMeasurementProvider {
        return this.timeProvider;
    }

    setDifferentialEquationsTimeProvider(time: ITimeMeasurementProvider): void
    {
        this.timeProvider = time;
    }

    clearDifferentialEquations(): void
    {
        this.measurements.length = 0;
        this.norm.length = 0;
        this.equations.length = 0;
    }

    newDifferentialEquations(): IDifferentialEquationProcessor
    {
        throw new OwnNotImplemented();
    }

    getDifferentialEquationsDimention(): number
    {
        return 0;
        
    }
    /*    if (Dim == 0) {
            return;
        }
            double dt = t1 - t0;
            int i = 0;
            double t = t0;
        foreach(IMeasurements m in equations)
        {
            for (int j = 0; j < m.Count; j++)
            {
                w[i] = (double)m[j].Parameter();
                ++i;
            }
        }
        StaticExtensionDataPerformerPortable.Time = t;
        StaticExtensionDataPerformerPortable.Desktop.ResetUpdatedMeasurements();
        UpdateMeasurements();
        i = 0;
        foreach(IMeasurements m in equations)
        {
                IDifferentialEquationSolver s = m as IDifferentialEquationSolver;
            s.CalculateDerivations();
            for (int j = 0; j < m.Count; j++)
            {
                    IDerivation der = m[j] as IDerivation;
                w[i] = w[i] + der.Derivation.ToDouble() * dt;
                ++i;
            }
            s.CopyVariablesToSolver(i - m.Count, w);
        }/*/

  

    protected equations: IDifferentialEquationSolver[] = [];

    protected norm: INormalizable[] = [];

    protected measurements: IMeasurements[] = [];

    protected timeProvider: ITimeMeasurementProvider = new FictiveTimeMeasurementProvider();

}
