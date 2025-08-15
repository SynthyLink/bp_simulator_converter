package measurements.arrows;

import category_theory.CategoryArrow;
import category_theory.interfaces.ICategoryObject;
import category_theory.interfaces.IDesktop;
import measurements.Measurements;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IMeasurements;

public class DataLink extends CategoryArrow {
    public DataLink(String name, IDesktop desktop) {
        super(name, desktop);
    }

    IMeasurements measurements;

    IDataConsumer dataConsumer;

    @Override
    public void setSource(ICategoryObject source) {
        super.setSource(source);
        dataConsumer = (IDataConsumer) source;
    }

    /**
     * @param target
     */
    @Override
    public void setTarget(ICategoryObject target) {
        super.setTarget(target);
        measurements = (Measurements) target;
        dataConsumer.addMeasurements(measurements);
    }

}
