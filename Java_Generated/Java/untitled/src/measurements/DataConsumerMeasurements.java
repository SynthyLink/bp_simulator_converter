package measurements;

import diagram.interfaces.IDesktop;
import general_service.Entry;
import general_service.FeedbackCollection;
import general_service.interfaces.IAlias;
import general_service.interfaces.IFeedbackCollection;
import measurements.interfaces.IMeasurement;
import measurements.interfaces.IMeasurements;

import java.util.*;

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

    protected void setMap(java.util.Map<String, Entry<Object, Object>> map)
    {
       performer.copyMap(map, this.map);
      // map.put("nn", new general_service.Enrty<Object, Object>(null, null));
    }

    protected void setFeedback() {
        feedback.setFeedbacks();
    }

    protected  void createFeedback() {
        List<Entry<int[], String>> list = new ArrayList<>();
        setFeedback(list);
    }

    protected void setFeedback(List<Entry<int[], String>> list)
    {
        feedback = new FeedbackCollection(this, list);
    }

    java.util.Map<String, Entry<Object, Object>> map = new HashMap<>();

    protected IFeedbackCollection feedback;

}
