package measurements.interfaces;

public interface ITimeMeasurementProvider {
    IMeasurement getTimeMeasurement();

    double getTime();

    void setTime(double time);


}
