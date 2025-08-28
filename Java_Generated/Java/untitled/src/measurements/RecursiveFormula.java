package measurements;

import diagram.interfaces.IDesktop;
import measurements.interfaces.IMeasurements;
import measurements.variables.Variable;


import java.util.HashMap;
import java.util.Map;

public class RecursiveFormula extends DataConsumerVariableMeasurementsStarted {
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
        performer.extend(inputs, item);
    }

    protected Map<String , Variable> variables = new HashMap<>();

    protected void calculateTree()
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
