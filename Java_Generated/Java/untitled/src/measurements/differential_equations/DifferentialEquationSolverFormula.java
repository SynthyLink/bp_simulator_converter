package measurements.differential_equations;

import diagram.interfaces.IDesktop;
import measurements.DataConsumerVariableMeasurements;
import measurements.Performer;
import measurements.differential_equations.interfaces.IDifferentialEquationSolver;
import measurements.time.interfaces.ITimeMeasurementProvider;

public class DifferentialEquationSolverFormula extends DataConsumerVariableMeasurements implements IDifferentialEquationSolver {
    public DifferentialEquationSolverFormula(String name, IDesktop desktop) {
        super(name, desktop);
    }

    /// <summary>
    /// Calculates derivations
    /// </summary>
    @Override
    public void calculateDerivations() {
        feedback.setFeedbacks();
        mPerformer.updateChildrenData(this);
        this.calculateTree();
        this.save();

    }

    /// <summary>
    /// Copies variables from processor to solver
    /// </summary>
    /// <param name="offset">Offset</param>
    /// <param name="variables">Vector of all desktop differential equations variables</param>
    @Override
    public void copyVariablesToSolver(int offset, double[] variables) {
        let n = this.output.length;
        for (var i = 0; i < n; i++)
        {
            val[0] = variables[i + offset];
            output[i].setIValue(val[0]);
        }

    }

    ///
    /// Sets time provider
    ///
    @Override
    public void setDifferentialEquationSolverTimeProvider(ITimeMeasurementProvider time) {
this.time = time;
    }

    @Override
    public ITimeMeasurementProvider getDifferentialEquationSolverTimeProvider() {
        return time;
    }

    protected void calculateTree()
    {

    }

    protected void save()
    {

    }

    double[] val = new double[1];


    protected ITimeMeasurementProvider time;

    protected measurements.Performer mPerformer = new Performer();
}