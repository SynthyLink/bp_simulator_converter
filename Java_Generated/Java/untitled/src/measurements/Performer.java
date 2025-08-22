package measurements;

import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IMeasurement;

public class Performer {
    public IMeasurement get(IDataConsumer dc, int[] k)
    {
        var m = dc.getAllMeasurements();
        var measurements = m[k[0]];
        return measurements.getMeasurement(k[1]);
    }
}
