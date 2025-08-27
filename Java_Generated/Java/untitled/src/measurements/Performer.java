package measurements;

import category_theory.interfaces.ICategoryObject;
import general_service.interfaces.IAction;
import general_service.interfaces.IAliasName;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IDerivation;
import measurements.interfaces.IMeasurement;
import measurements.time.TimeMeasurementProvider;
import runtime.IDataRuntime;

import java.util.HashMap;
import java.util.Map;

public class Performer {
    public IMeasurement get(IDataConsumer dc, int[] k) {
        var m = dc.getAllMeasurements();
        var measurements = m[k[0]];
        return measurements.getMeasurement(k[1]);
    }

    public Map<String, IMeasurement> getMeasurementMap(IDataConsumer consumer) {
        var map = new HashMap<String, IMeasurement>();
        var mm = consumer.getAllMeasurements();
        for (var mea : mm) {
            var co = (ICategoryObject) mea;
            var nm = co.getCategoryObjectName();
            nm += ".";
            var n = mea.getMeasurementsCount();
            for (var i = 0; i < n; i++) {
                var m = mea.getMeasurement(i);
                var name = nm + m.getMeasurementName();
                map.put(name, m);
            }

        }
        return map;
    }

    public void updateChildrenData(IDataConsumer dataConsumer) {
        var children = dataConsumer.getAllMeasurements();
        for (var child : children) {
            if (child instanceof IDataConsumer dc) {
                updateChildrenData(dc);
            }
            child.updateMeasurements();
        }
    }

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

    public double getDouble(Object o) {
        var a = (double[]) o;
        return a[0];
    }

    public void setDouble(double v, Object o) {
        var a = (double[]) o;
        a[0] = v;
    }

    public IVariableSetter getSetter(Object o) {
        return null;
    }


    public double getDouble(IMeasurement measurement) {
        Object o = measurement.getMeasurementValue();
        return getDouble(o);
    }

    public double getDouble(IAliasName an) {
        Object o = an.getAliasNameValue();
        return getDouble(o);
    }

    public double getDouble(IDerivation derivation) {
        return getDouble(derivation.getDerivation());
    }

    public void performFixedStepCalculation(IDataRuntime runtime,
                                            double start, double step, int steps, IAction action) {
        var tm = new TimeMeasurementProvider();
        runtime.setTimeProvider(tm);
        runtime.startRuntime(start);
        var st = start;
        var curr = start;
        for (var i = 0; i < steps; i++) {
            tm.setTime(st);
            if (i > 0) {
                runtime.stepRuntime(curr, st);
                curr = st;
            }
            runtime.updateRuntime();
            action.action();
            st += step;
        }

    }

}