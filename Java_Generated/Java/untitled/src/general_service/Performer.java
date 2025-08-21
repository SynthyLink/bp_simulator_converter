package general_service;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.Map;

import category_theory.CategoryArrow;
import category_theory.interfaces.ICategoryArrow;
import category_theory.interfaces.ICategoryObject;
import diagram.interfaces.IDesktop;
import error_handler.interfaces.IErrorHandler;
import general_service.interfaces.IAction;
import general_service.interfaces.IAliasName;
import general_service.interfaces.IVariableSetter;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IDerivation;
import measurements.interfaces.IMeasurement;
import measurements.time.TimeMeasurementProvider;
import runtime.IDataRuntime;


public class Performer {

    static IErrorHandler errorHandler;

    static void set(IErrorHandler errorHandler) {
        Performer.errorHandler = errorHandler;
    }

    public void handle(Throwable exception) {
        errorHandler.handle(exception);
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

    public void show(String message) {
        errorHandler.show(message);
    }

    public <T, S> void copyMap(Map<T, S> from, Map<T, S> to) {
        var e = from.entrySet();
        for (var item : e) {
            to.put(item.getKey(), item.getValue());
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


    public <T> T[] extend(T[] t, T s) {
        var n = t.length;
        var type = t.getClass();
        var ct = type.componentType();
        var r = (T[]) Array.newInstance(ct, n + 1);
        System.arraycopy(t, 0, r, 0, t.length);
        r[n] = s;
        return r;
    }

    public <T> T[] extend(T[] t, T[] s) {
        var n = t.length + s.length;
        var type = s.getClass();
        var ct = type.componentType();
        var r = (T[]) Array.newInstance(ct, n);
        System.arraycopy(t, 0, r, 0, t.length);
        System.arraycopy(s, 0, r, t.length, s.length);
        return r;
    }

    public <T> T get(IDesktop desktop, String name) {
        var o = desktop.getCategoryObject(name);
        if (o != null) {
            return (T) o;
        }
        T categoryArrow = (T) desktop.getCategoryArrow(name);
        return categoryArrow;
    }

    public <T> T get(ICategoryObject object, String name) {
        var desktop = object.getDesktop();
        return get(desktop, name);
    }

    public <T> T get(ICategoryArrow arrow, String name) {
        var desktop = arrow.getDesktop();
        return get(desktop, name);
    }


    public <T> T get(Object object, String name) {
        return switch (object) {
            case IDesktop desktop -> get(desktop, name);
            case ICategoryObject categoryObject -> get(categoryObject, name);
            case ICategoryArrow categoryArrow -> get(categoryArrow, name);
            default -> null;
        };
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