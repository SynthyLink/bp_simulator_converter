package tests;

import general_service.interfaces.IAction;
import generated.ODE;
import measurements.Performer;
import measurements.differential_equations.processors.RungeProcessor;
import measurements.interfaces.IDataConsumer;
import runtime.DataRuntimeConsumerODE;

public class ODEAct extends ODE implements IAction {

    IDataConsumer consumer;

    public ODEAct() {
        consumer = performer.get(this, "Chart");
    }

    @Override
    public void action() {
        System.out.println(consumer.getAllMeasurements()[0].getMeasurement(0));
    }

    public void test() {
        var pr = new RungeProcessor(null);
        var r = new DataRuntimeConsumerODE(consumer, pr);
        var p = new Performer();
        p.performFixedStepCalculation(r, 0, 0.01, 800, this);

    }
}
