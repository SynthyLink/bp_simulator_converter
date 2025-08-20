package measurements.variables;

import general_service.Performer;
import general_service.interfaces.IValue;
import measurements.interfaces.IDerivation;
import measurements.interfaces.IMeasurement;
import general_service.interfaces.IVariableSetter;

import java.lang.reflect.Array;

public class Variable implements IMeasurement,  IValue, IDerivation {
    public Variable(Object type, String name) {
        this.type = type;
        this.name = name;
        setter = performer.getSetter(type);
        value = setter.getDefaultValue();
    }

    @Override
    public Object getIValue() {
        return value;
    }

    @Override
    public void setIValue(Object value) {
        setter.set(value, this.value);
    }

    @Override
    public IMeasurement getDerivation() {
        return derivation;
    }

    @Override
    public void setDerivation(IMeasurement measurement) {
        derivation = measurement;
    }

    @Override
    public String getMeasurementName() {
        return name;
    }

    @Override
    public Object getMeasurementType() {
        return type;
    }

    @Override
    public Object getMeasurementValue() {
        return value;
    }

    Object value;

    Object type;

    Array array;

    String name;

    IMeasurement derivation;

    IVariableSetter setter;
    Performer performer = new Performer();
}

