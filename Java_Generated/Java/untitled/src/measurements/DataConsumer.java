package measurements;

import category_theory.CategoryObject;
import diagram.interfaces.IDesktop;
import general_service.Performer;
import general_service.interfaces.IPostSetArrow;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IMeasurements;
import measurements.interfaces.ITimeMeasurementConsumer;
import measurements.interfaces.ITimeMeasurementProvider;

import java.util.ArrayList;
import java.util.List;

public class DataConsumer extends CategoryObject implements IDataConsumer, IPostSetArrow,
        ITimeMeasurementConsumer
{

    protected Performer performer = new Performer();

    ITimeMeasurementConsumer tms;

    ITimeMeasurementProvider timeMeasurement;

    boolean success = true;

    protected IDataConsumer dataConsumer;



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

    @Override
    public ITimeMeasurementProvider getTimeMeasutement() {
        return timeMeasurement;
    }

    @Override
    public void setTimeMeasurement(ITimeMeasurementProvider provider) {
timeMeasurement = provider;
    }

    @Override
    public double getInternalTime() {
        return 0;
    }
}
