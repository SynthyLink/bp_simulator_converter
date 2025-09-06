package measurements;

import diagram.interfaces.IDesktop;
import measurements.interfaces.IMeasurements;
import measurements.interfaces.IStarted;
import measurements.variables.Variable;


import java.util.HashMap;
import java.util.Map;

public class RecursiveFormula extends DataConsumerVariableMeasurementsStarted implements IStarted, IMeasurements {
    public RecursiveFormula(String name, IDesktop desktop) {
        super(name, desktop);
    }

    @Override
    public void postSetArrow() {
        init();
        createInitial();
        createFeedback();
    }

    @Override
    public IMeasurements[] getAllMeasurements() {
        return inputs;
    }

    @Override
    public void addMeasurements(IMeasurements item)
    {
        inputs = performer.extend(inputs, item);
    }


    @Override
    public void startedStart(double time)
    {
        initial.resetInitialValues();
        feedback.setFeedbacks();
    }

    protected void calculateTree()
    {

    }


    protected void save()
    {

    }

    @Override
    public void  updateMeasurements()
    {
        this.feedback.setFeedbacks();
        this.calculateTree();
        this.save();
    }

    protected  IMeasurements[]  inputs = new IMeasurements[0];

}
