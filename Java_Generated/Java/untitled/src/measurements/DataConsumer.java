package measurements;

import category_theory.CategoryObject;
import diagram.interfaces.IDesktop;
import general_service.Entry;
import general_service.Performer;
import general_service.interfaces.IPostSetArrow;
import general_service.interfaces.IValueSetter;
import general_service.interfaces.IValueSetterFactory;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IMeasurements;
import measurements.time.interfaces.ITimeMeasurementConsumer;
import measurements.time.interfaces.ITimeMeasurementProvider;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DataConsumer extends CategoryObject implements IDataConsumer, IPostSetArrow,
        ITimeMeasurementConsumer
{

    protected Performer performer = new Performer();

    ITimeMeasurementConsumer tms;

    ITimeMeasurementProvider timeMeasurement;

    protected boolean success = true;

    protected IDataConsumer dataConsumer;

    protected IValueSetterFactory valueSetterFactory;

    protected List<IMeasurements> measurements = new ArrayList<>();

    protected Object variable;

    public DataConsumer(String name, IDesktop desktop)
    {
        super(name, desktop);
        valueSetterFactory = desktop.getValueSetterFactory();
    }

    protected void init() {

    }



    @Override
    public IMeasurements[] getAllMeasurements() {
        var size = measurements.size();
        IMeasurements[] m = new IMeasurements[size];
        measurements.toArray(m);
        return m;
    }

    @Override
    public void addMeasurements(IMeasurements item)
    {
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

    protected String[] copyMap(Map<String, Entry<Object, Object>> input, Map<String, IValueSetter> output)
    {
        return mPefrformer.copyMap(input, output, valueSetterFactory);
    }


    protected measurements.Performer mPefrformer = new measurements.Performer();
}
