package measurements;

import diagram.interfaces.IDesktop;
import general_service.Entry;
import general_service.FeedbackCollection;
import general_service.interfaces.IAlias;
import general_service.interfaces.IFeedbackCollection;
import measurements.interfaces.IMeasurement;
import measurements.interfaces.IMeasurements;
import measurements.variables.Variable;

import java.util.*;

public class DataConsumerMeasurements  extends  DataConsumer implements IMeasurements, IAlias {



    public DataConsumerMeasurements(String name, IDesktop desktop) {

        super(name, desktop);
    }


    @Override
    public int getMeasurementsCount() {
        return iMeasurements.size();
    }

    @Override
    public IMeasurement getMeasurement(int i) {
        return iMeasurements.get(i);
    }

    @Override
    public void updateMeasurements() {

    }

    @Override
    public void addMeasurement(IMeasurement measurement) {
        iMeasurements.add(measurement);
    }



    public double getInternalTime() {

        return timeMeasurement.getTime();
    }

    List<IMeasurement> iMeasurements = new ArrayList<>();

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
    }

    protected void setFeedback() {
        feedback.setFeedbacks();
    }

    protected void createFeedback() {
        List<Entry<int[], String>> list = new ArrayList<>();
        setFeedback(list);
    }

    protected void setFeedback(List<Entry<int[], String>> list)
    {
        feedback = new FeedbackCollection(this, list);
    }

    protected void addVariableValue(String name, Object type)
    {
    }

    protected void addVariable(Variable variable)
    {
    }


    java.util.Map<String, Entry<Object, Object>> map = new HashMap<>();

    protected IFeedbackCollection feedback;

}
