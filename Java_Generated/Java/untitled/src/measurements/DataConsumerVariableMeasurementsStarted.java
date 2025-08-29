package measurements;

import diagram.interfaces.IDesktop;
import general_service.AliasInitialValueCollection;
import general_service.interfaces.IInitialValueCollection;
import measurements.interfaces.IStarted;

public class DataConsumerVariableMeasurementsStarted extends DataConsumerVariableMeasurements implements IStarted {
    public DataConsumerVariableMeasurementsStarted(String name, IDesktop desktop) {
        super(name, desktop);
    }

    @Override
    public void startedStart(double startTime) {
        initial.resetInitialValues();
    }

    protected void createInitial()
    {
        initial = new AliasInitialValueCollection(this, this);
    }

    protected void setInitial()
    {
        initial = new AliasInitialValueCollection(this, this);
    }

    protected IInitialValueCollection initial;
}
