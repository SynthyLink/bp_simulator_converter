package tests;

import general_service.interfaces.IAction;
import generated.OrbitalForecast;
import measurements.Performer;
import measurements.differential_equations.processors.RungeProcessor;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IMeasurements;
import runtime.DataRuntimeConsumerODE;

public class OrbitalForecastAct extends OrbitalForecast implements IAction {
    IDataConsumer consumer;

    IMeasurements measurements;

    public OrbitalForecastAct() {
        consumer = performer.get(this, "Chart");
    }

    @Override
    public void action()
    {
      general_service.Performer.print(consumer);
    }

    public void test() {
        var pr = new RungeProcessor(null);
        var r = new DataRuntimeConsumerODE(consumer, pr);
        var p = new Performer();
       // p.performFixedStepCalculation(r, 0, 1, 18000, this);
        p.performFixedStepCalculation(r, 1770457504, 1, 18000, this, "Recursive.y");

    }
}


