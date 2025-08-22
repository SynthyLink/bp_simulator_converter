package measurements;

import diagram.interfaces.IDesktop;
import general_service.interfaces.IPostSetArrow;

public class VectorFormulaConsumer extends  DataConsumerMeasurements {
    public VectorFormulaConsumer(String name, IDesktop desktop) {
        super(name, desktop);
    }

    @Override
    public void updateMeasurements()
    {
        feedback.setFeedbacks();
        calculateTree();
        save();
    }

    @Override
    public void postSetArrow() {
        init();
        setFeedback();
    }

    protected  void calculateTree()
    {
    }

    protected  void init()
    {

    }

    protected  void save()
    {
    }
}
