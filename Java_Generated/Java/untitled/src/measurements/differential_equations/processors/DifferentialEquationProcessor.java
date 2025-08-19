package measurements.differential_equations.processors;

import general_service.Performer;
import measurements.differential_equations.interfaces.IDifferentialEquationProcessor;
import measurements.differential_equations.interfaces.IDifferentialEquationSolver;
import measurements.differential_equations.interfaces.INormalizable;
import measurements.interfaces.IMeasurements;
import measurements.interfaces.ITimeMeasurementProvider;

public class DifferentialEquationProcessor implements IDifferentialEquationProcessor {


    protected Performer performer = new Performer();

    protected int dimension;


    protected IDifferentialEquationSolver[] equations = new IDifferentialEquationSolver[0];

    protected INormalizable[] norm = new INormalizable[0];

    protected  IMeasurements[] measurements = new IMeasurements[0];

    protected  ITimeMeasurementProvider timeMeasurementProvider;
    @Override
    public IDifferentialEquationSolver[] getDifferentialEquations() {
       return null;
    }

    public static String[] addRangeSystemArrayCopy(String[] originalArray, String[] elementsToAdd) {
        int originalLength = originalArray.length;
        int elementsToAddLength = elementsToAdd.length;

        String[] newArray = new String[originalLength + elementsToAddLength];

        System.arraycopy(originalArray, 0, newArray, 0, originalLength);
        System.arraycopy(elementsToAdd, 0, newArray, originalLength, elementsToAddLength);

        return newArray;
    }

    @Override
    public void addRangeDifferentialEquations(IDifferentialEquationSolver[] equations) {
        int originalLength = this.equations.length;
        int elementsToAddLength = equations.length;
        var n = new  IDifferentialEquationSolver[originalLength + elementsToAddLength];
        System.arraycopy(this.equations, 0, n, 0, originalLength);
        System.arraycopy(equations, 0, n, originalLength, elementsToAddLength);
        this.equations = n;

    }

    @Override
    public void stepDifferentialEquations(double start, double finish) {

    }

    @Override
    public void updateDimension() {
        dimension = 0;
        var l = measurements.length;
        for (var i = 0; i < l; i++)
        {
            dimension += measurements[i].getMeasurementsCount();
        }

    }

    @Override
    public ITimeMeasurementProvider getDifferentialEquationsTimeProvider() {
        return null;
    }

    @Override
    public void setDifferentialEquationsTimeProvider(ITimeMeasurementProvider timeProvider) {
this.timeMeasurementProvider = timeProvider;
    }

    @Override
    public void clearDifferentialEquations() {
equations = new IDifferentialEquationSolver[0];
    }

    @Override
    public IDifferentialEquationProcessor newDifferentialEquations() {
        return null;
    }
}
