package measurements;

import diagram.interfaces.IDesktop;

public class VectorFormulaConsumer extends  DataConsumerMeasurements {
    public VectorFormulaConsumer(String name, IDesktop desktop) {
        super(name, desktop);
    }

    @Override
    public void updateMeasurements() {
        setFeedback();
        calculateTree();
        save();
    }

    @Override
    public void postSetArrow() {
        init();
        createFeedback();
    }

    protected void calculateTree() {
    }

    protected void init() {

    }

    protected void save() {
    }

}
