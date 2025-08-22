package measurements;

import diagram.interfaces.IDesktop;
import general_service.interfaces.IAlias;
import general_service.interfaces.IFeedbackCollection;
import measurements.interfaces.IMeasurement;
import measurements.interfaces.IMeasurements;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DataConsumerMeasurements  extends  DataConsumer implements IMeasurements, IAlias {

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

    public double getInternalTime() {

        return timeMeasurement.getTime();
    }

    @Override
    public String[] getAliasNames() {
        return new String[0];
    }

    @Override
    public Object getAliasType(String name) {
        return map.get(name).getKey();
    }

    @Override
    public Object getAliasValue(String name) {
        return map.get(name).getValue();
    }

    @Override
    public void setAliasValue(String name, Object obj) {
        map.get(name).setValue(obj);
    }

    protected void setMap(java.util.Map<String, general_service.Enrty<Object, Object>> map)
    {
       performer.copyMap(map, this.map);
      // map.put("nn", new general_service.Enrty<Object, Object>(null, null));
    }

    protected void setFeedback()
    {

    }

    java.util.Map<String, general_service.Enrty<Object, Object>> map = new HashMap<>();

    protected IFeedbackCollection feedback;

}
