package measurements;

import diagram.interfaces.IDesktop;
import general_service.interfaces.IAlias;
import general_service.interfaces.IValueSetterFactory;
import measurements.interfaces.IMeasurement;
import measurements.interfaces.IMeasurements;
import measurements.variables.Variable;

import java.util.HashMap;
import java.util.Map;

public class DataConsumerVariableMeasurements extends DataConsumerMeasurements  {
    public DataConsumerVariableMeasurements(String name, IDesktop desktop) {
        super(name, desktop);
    }

    protected Variable[]  output = new Variable[0];

    protected Map<String, Variable>  vatiables = new HashMap<>();


    @Override
    public int getMeasurementsCount() {
        return output.length;
    }

    @Override
    public IMeasurement getMeasurement(int i) {
        return output[i];
    }


}
