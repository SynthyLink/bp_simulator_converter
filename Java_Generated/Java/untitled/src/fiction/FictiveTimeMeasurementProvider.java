package fiction;

import measurements.interfaces.IMeasurement;
import measurements.interfaces.ITimeMeasurementProvider;

public class FictiveTimeMeasurementProvider implements ITimeMeasurementProvider {
    @Override
    public IMeasurement getTimeMeasurement() {
        return null;
    }

    @Override
    public double getTime() {
        return 0;
    }

    @Override
    public void setTime(double time) {

    }
}
