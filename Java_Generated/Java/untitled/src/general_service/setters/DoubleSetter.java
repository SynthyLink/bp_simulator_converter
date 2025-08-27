package general_service.setters;

import general_service.interfaces.IValueSetter;

public class DoubleSetter implements IValueSetter {
    public  DoubleSetter()
    {
        value = array;
    }

    @Override
    public Object getDefaultValue() {
        return def;
    }

    @Override
    public Object getValue() {
        return value;
    }

    @Override
    public void setValue(Object o) {
        if (o == null)
        {
            value = null;
            return;
        }
        var d = (double[])o;
        array[0] = d[0];
        value = array;

    }

    private  double[] array = new double[]{0};

    private Object value;

    private double[] def = new double[]{0};
}
