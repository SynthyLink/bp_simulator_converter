package measurements;

import category_theory.CategoryObject;
import category_theory.interfaces.IDesktop;
import general_service.interfaces.IPostSetArrow;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IMeasurements;

import java.util.ArrayList;
import java.util.List;

public class DataConsumer extends CategoryObject implements IDataConsumer, IPostSetArrow {

    protected List<IMeasurements> measurements = new ArrayList<>();

    public DataConsumer(String name, IDesktop desktop) {
        super(name, desktop);
    }


    @Override
    public IMeasurements[] getAllMeasurements() {
        var size = measurements.size();
        IMeasurements[] m = new IMeasurements[size];
        measurements.toArray(m);
        return m;
    }

    @Override
    public void addMeasurements(IMeasurements item) {
        measurements.add(item);
    }

    @Override
    public void postSetArrow() {

    }
}
