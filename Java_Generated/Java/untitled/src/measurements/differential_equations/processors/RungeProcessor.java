package measurements.differential_equations.processors;

import measurements.differential_equations.interfaces.IDifferentialEquationProcessor;
import measurements.differential_equations.interfaces.IDifferentialEquationSolver;
import measurements.interfaces.ITimeMeasurementProvider;

public class RungeProcessor extends  DifferentialEquationProcessor{

    double[] w = new double[0];
    double[] z = new double[0];
    double[] f = new double[0];
    double[][] k = new double[4][];
    @Override
    public void stepDifferentialEquations(double t0, double t1) {
        double dt = t1 - t0;
        int i = 0;
        for (int j = 0; j < equations.length; j++)
        {
            var m = equations[j].
            var s  (IDifferentialEquationSolver)mer;
            m.UpdateMeasurements(true);
            int n = s.GetVariablesCount();
            for (int j = 0; j < n; j++)
            {
                w[i] = ToDouble(m[j]);
                f[i] = w[i];
                ++i;
            }
            s.CopyVariablesToSolver(i - s.GetVariablesCount(), w);
        }
        double t = t0;
        timeProvider.Time = t;
        i = 0;
        foreach (IMeasurements m in equations)
        {
            IDifferentialEquationSolver s = m as IDifferentialEquationSolver;
            s.CalculateDerivations();
            for (int j = 0; j < s.GetVariablesCount(); j++)
            {
                IDerivation der = m[j] as IDerivation;
                z[i] = ToDouble(der.Derivation);
                k[0, i] = z[i] * dt;
                w[i] = f[i] + 0.5 * k[0, i];
                ++i;
            }
            s.CopyVariablesToSolver(i - s.GetVariablesCount(), w);
        }
        t = t0 + 0.5 * dt;
        timeProvider.Time = t;
        i = 0;
        foreach (IMeasurements m in equations)
        {
            IDifferentialEquationSolver s = m as IDifferentialEquationSolver;
            s.CalculateDerivations();
            for (int j = 0; j < s.GetVariablesCount(); j++)
            {
                IDerivation der = m[j] as IDerivation;
                z[i] = ToDouble(der.Derivation);
                k[1, i] = z[i] * dt;
                w[i] = f[i] + 0.5 * k[1, i];
                ++i;
            }
            s.CopyVariablesToSolver(i - s.GetVariablesCount(), w);
        }
        t = t0 + 0.5 * dt;
        timeProvider.Time = t;
        i = 0;
        foreach (IMeasurements m in equations)
        {
            IDifferentialEquationSolver s = m as IDifferentialEquationSolver;
            s.CalculateDerivations();
            for (int j = 0; j < s.GetVariablesCount(); j++)
            {
                IDerivation der = m[j] as IDerivation;
                z[i] = der.Derivation.ToDouble();
                k[2, i] = z[i] * dt;
                w[i] = f[i] + k[2, i];
                ++i;
            }
            s.CopyVariablesToSolver(i - s.GetVariablesCount(), w);
        }
        t = t0 + dt;
        timeProvider.Time = t;
        i = 0;
        foreach (IMeasurements m in equations)
        {
            IDifferentialEquationSolver s = m as IDifferentialEquationSolver;
            s.CalculateDerivations();
            for (int j = 0; j < s.GetVariablesCount(); j++)
            {
                IDerivation der = m[j] as IDerivation;
                z[i] = ToDouble(der.Derivation);
                k[3, i] = z[i] * dt;
                ++i;
            }
        }
        i = 0;
        foreach (IMeasurements m in equations)
        {
            IDifferentialEquationSolver s = m as IDifferentialEquationSolver;
            for (int j = 0; j < s.GetVariablesCount(); j++)
            {
                f[i] += (k[0, i] + 2 * k[1, i] + 2 * k[2, i] + k[3, i]) / 6;
                ++i;
            }
            s.CopyVariablesToSolver(i - s.GetVariablesCount(), f);
        }
        i = 0;
        foreach (IMeasurements m in equations)
        {
            IDifferentialEquationSolver s = m as IDifferentialEquationSolver;
            for (int j = 0; j < s.GetVariablesCount(); j++)
            {
                IMeasurement measure = m[j];
                IDerivation d = m[j] as IDerivation;
                IMeasurement der = d.Derivation;
                if (!(der is IDistribution))
                {
                    ++i;
                    continue;
                }
                IDistribution distr = der as IDistribution;
                f[i] += distr.Integral;
                distr.Reset();
                ++i;
            }
            s.CopyVariablesToSolver(i - s.GetVariablesCount(), f);
        }

    }

    @Override
    public void updateDimension() {
super.updateDimension();
w = new double[dimension];
        z = new double[dimension];
        f = new double[dimension];
        for (var i = 0; i < 4; i++)
        {
            k[i] = new double[dimension];
        }

    }



    @Override
    public IDifferentialEquationProcessor newDifferentialEquations() {
        return new RungeProcessor();
    }
}
