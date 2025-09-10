package measurements;

import category_theory.interfaces.ICategoryObject;
import general_service.Entry;
import general_service.interfaces.*;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IDerivation;
import measurements.interfaces.IMeasurement;
import measurements.interfaces.IMeasurements;
import measurements.time.TimeMeasurementProvider;
import runtime.interfaces.IDataRuntime;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Performer {

    protected general_service.Performer performer = new general_service.Performer();

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

    public  void updateChildrenData(IDataConsumer dataConsumer, IFeedbackCollection collection)
    {
        if (collection.isEmpty())
        {
            return;
        }
        collection.setFeedbacks();
        updateChildrenData(dataConsumer);
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

    public IValueSetter getSetter(Object o) {
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

    public IValueSetter convert(Entry<Object, Object> entry, IValueSetterFactory factory)
    {
        var o = entry.getKey();
        var setter = factory.getValueSetter(o);
        setter.setValue(entry.getValue());
        return setter;
    }

    public String[] copyMap(Map<String, Entry<Object, Object>> input, Map<String, IValueSetter> output, IValueSetterFactory factory)
    {
        var es = input.entrySet();
        var s = new String[0];
        for (var item : es)
        {
            var x = item.getValue();
            var setter = convert(x, factory);
            var name = item.getKey();
            output.put(name, setter);
            s = performer.extend(s, name);
        }
        return s;
    }


 public IMeasurement[] get(IMeasurements measurements)
 {
     var m = new IMeasurement[0];
     var n = measurements.getMeasurementsCount();
     for (var i = 0; i < n; i++)
     {
         m = performer.extend(m, measurements.getMeasurement(i));
     }
     return  m;
 }

    public double getDouble(IDerivation derivation)
    {
        var der = derivation.getDerivation();
        return getDouble(der);
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

    public void performFixedStepCalculation(IDataRuntime runtime,
                                            double start, double step, int steps, IAction action, IFuncT<boolean[]> condition) {
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
            var cond = condition.funcT();
            if (cond[0]) {
                action.action();
            }
            st += step;

        }
    }

    public void performFixedStepCalculation(IDataRuntime runtime,
                                            double start, double step, int steps, IAction action, IFuncT<boolean[]> condition, IFuncT<boolean[]> stop) {
        var tm = new TimeMeasurementProvider();
        runtime.setTimeProvider(tm);
        runtime.startRuntime(start);
        var st = start;
        var curr = start;
        for (var i = 0; i < steps; i++) {
            var stp = stop.funcT();
            if (stp[0])
            {
                return;
            }
            tm.setTime(st);
            if (i > 0) {
                runtime.stepRuntime(curr, st);
                curr = st;
            }
            runtime.updateRuntime();
            var cond = condition.funcT();
            if (cond[0]) {
                action.action();
            }
            st += step;

        }
    }


    public void performFixedStepCalculation(IDataRuntime runtime,
                                            double start, double step, int steps, IAction action, String condition) {
        var desktop = runtime.getDesktop();
        var n = condition.lastIndexOf('.');
        var fn = condition.substring(0, n);
        var nam = condition.substring(n + 1);
        IMeasurements m = performer.get(desktop, fn);
        IFuncT<boolean[]> function = null;
        var nm = m.getMeasurementsCount();
        for (var i = 0; i < nm; i++)
        {
            var measurement = m.getMeasurement(i);
            var measurementName = measurement.getMeasurementName();
            if (measurementName.equals(nam))
            {
                function = new MeasurementBoolFunc(measurement);
                break;
            }
        }
        performFixedStepCalculation(runtime,
                start, step, steps, action, function);
    }
}