package measurements.differential_equations.processors;

import measurements.differential_equations.interfaces.IDifferentialEquationProcessor;
import measurements.differential_equations.interfaces.IDifferentialEquationSolver;
import measurements.interfaces.IDerivation;
import measurements.interfaces.IMeasurement;
import measurements.interfaces.IMeasurements;
import measurements.interfaces.ITimeMeasurementProvider;

public class RungeProcessor extends  DifferentialEquationProcessor {

    double[] w = new double[0];
    double[] z = new double[0];
    double[] f = new double[0];
    double[][] k = new double[4][];

    @Override
    public void stepDifferentialEquations(double t0, double t1) {
        double dt = t1 - t0;
        int i = 0;
        for (IDifferentialEquationSolver s : equations) {
            var m = (IMeasurements) s;
            int n = m.getMeasurementsCount();
            for (int j = 0; j < n; j++) {
                w[i] = performer.gedDouble(m.getMeasurement(j));
                f[i] = w[i];
                ++i;
            }
            s.copyVariablesToSolver(i - ((IMeasurements) s).getMeasurementsCount(), w);
        }
        double t = t0;
        timeProvider.setTime(t);
        i = 0;
        for (IDifferentialEquationSolver s : equations) {
            var m = (IMeasurements) s;
            s.calculateDerivations();
            var p = m.getMeasurementsCount();
            for (int l = 0; l < p; l++) {
                IDerivation der = (IDerivation) m.getMeasurement(l);
                z[i] = performer.getDouble(der);
                k[0][i] = z[i] * dt;
                w[i] = f[i] + 0.5 * k[0][i];
                ++i;
            }
            s.copyVariablesToSolver(i - m.getMeasurementsCount(), w);
        }
        t = t0 + 0.5 * dt;
        timeProvider.setTime(t);
        i = 0;
        for (IDifferentialEquationSolver s : equations) {
            var m = (IMeasurements) s;
            s.calculateDerivations();
            var p = m.getMeasurementsCount();
            for (int l = 0; l < p; l++) {
                IDerivation der = (IDerivation) m.getMeasurement(l);
                z[i] = performer.getDouble(der);
                k[1][i] = z[i] * dt;
                w[i] = f[i] + 0.5 * k[1][i];
                ++i;
            }
            s.copyVariablesToSolver(i - p, w);
        }

        t = t0 + 0.5 * dt;
        timeProvider.setTime(t);
        i = 0;
        for (IDifferentialEquationSolver s : equations) {
            var m = (IMeasurements) s;
            s.calculateDerivations();
            var p = m.getMeasurementsCount();
            for (int l = 0; l < p; l++) {
                IDerivation der = (IDerivation) m.getMeasurement(l);
                z[i] = performer.getDouble(der);
                k[2][i] = z[i] * dt;
                w[i] = f[i] + k[2][i];
                ++i;
            }
            s.copyVariablesToSolver(i - p, w);
        }
        t = t0 + dt;
        timeProvider.setTime(t);
        i = 0;
        for (IDifferentialEquationSolver s : equations) {
            var m = (IMeasurements) s;
            s.calculateDerivations();
            var p = m.getMeasurementsCount();
            for (int l = 0; l < p; l++) {
                IDerivation der = (IDerivation) m.getMeasurement(l);
                z[i] = performer.getDouble(der);
                k[3][i] = z[i] * dt;
                ++i;
            }
        }
        i = 0;
        for (IDifferentialEquationSolver s : equations) {
            var m = (IMeasurements) s;
            var p = m.getMeasurementsCount();
            for (int j = 0; j < p; j++) {
                f[i] += (k[0][i] + 2 * k[1][i] + 2 * k[2][i] + k[3][i]) / 6;
                ++i;
            }
            s.copyVariablesToSolver(i - p, f);
        }

    }

    @Override
    public IDifferentialEquationProcessor newDifferentialEquations() {
        return new RungeProcessor();
    }

    @Override
     public void updateDimension() {
        super.updateDimension();
        w = new double[dimension];
        z = new double[dimension];
        f = new double[dimension];
        for (var i = 0; i < 4; i++) {
            k[i] = new double[dimension];
        }
    }
    }
