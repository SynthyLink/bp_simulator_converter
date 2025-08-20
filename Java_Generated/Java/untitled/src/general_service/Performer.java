package general_service;

import java.lang.reflect.Array;
import category_theory.interfaces.ICategoryObject;
import general_service.interfaces.IAliasName;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IDerivation;
import measurements.interfaces.IMeasurement;



public class Performer {

    public IMeasurement getMeasurement(IDataConsumer dataConsumer, String name) {

        var mm = dataConsumer.getAllMeasurements();
        var n = mm.length;
        for (var k = 0; k < n; k++) {
            var mea = mm[k];
            var co = (ICategoryObject) mea;
            var nm = co.getCategoryObjectName();
            nm += ".";
            var nn = mea.getMeasurementsCount();
            for (var i = 0; i < nn; i++) {
                var m = mea.getMeasurement(i);
                var nam = nm + m.getMeasurementName();
                if (nam == name) {
                    return m;
                }
            }

        }
        return null;
    }

    public double getDouble(Object o)
    {
        var a = (double[])o;
        return a[0];
    }

    public void setDouble(double v, Object o)
    {
        var a = (double[])o;
        a[0] = v;
    }


    public  <T>  T[] extend (T[] t, T s)
    {
        var n = t.length;
        var type = s.getClass();
        var ct = type.componentType();
        var r = (T[]) Array.newInstance(ct, n + 1);
        System.arraycopy(t, 0, r, 0, t.length);
        r[n] = s;
        return  r;
    }

    public  <T>  T[] extend (T[] t, T[] s)
    {
        var n = t.length + s.length;
        var type = s.getClass();
        var ct = type.componentType();
        var r = (T[]) Array.newInstance(ct, n);
        System.arraycopy(t, 0, r, 0, t.length);
        System.arraycopy(s, 0, r, t.length, s.length);
        return r;
    }


    public double gedDouble(IMeasurement measurement)
    {
        Object o = measurement.getMeasurementValue();
        return getDouble(o);
    }

    public double getDouble(IAliasName an)
    {
        Object o = an.getAliasNameValue();
        return getDouble(o);
    }

    public  double getDouble(IDerivation derivation)
    {
        return  getDouble(derivation.getDerivation());
    }
}
