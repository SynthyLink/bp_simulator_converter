package measurements.interfaces;

import general_service.interfaces.IChildren;

public interface IDataConsumer {

    IMeasurements[] getAllMeasurements();

    void addMeasurements(IMeasurements item);

}
