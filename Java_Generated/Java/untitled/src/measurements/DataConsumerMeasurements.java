package measurements;

import diagram.interfaces.IDesktop;
import measurements.interfaces.IMeasurement;
import measurements.interfaces.IMeasurements;

import java.util.ArrayList;
import java.util.List;

public class DataConsumerMeasurements  extends  DataConsumer implements IMeasurements {
    protected List<IMeasurement> measurementsData = new ArrayList<>();


    public DataConsumerMeasurements(String name, IDesktop desktop) {
        super(name, desktop);
    }

    @Override
    public int getMeasurementsCount() {
        return measurementsData.size();
    }

    @Override
    public IMeasurement getMeasurement(int i) {
        return measurementsData.get(i);
    }

    @Override
    public void updateMeasurements() {

    }

    @Override
    public void addMeasurement(IMeasurement measurement) {
        measurementsData.add(measurement);
    }

    public  double  getInternalTime()
    {

        return timeMeasurement.getTime();
    }

}
