package tests;

import general_service.interfaces.IAction;
import general_service.interfaces.IFuncT;
import generated.FeedbackFormula;
import measurements.Performer;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IMeasurements;
import runtime.DataRuntimeConsumer;

public class FeedbackFormulaAct extends FeedbackFormula implements IAction, IFuncT<boolean[]> {

    public FeedbackFormulaAct()
    {
        super();
        var c = getCategoryObjects();
        consumer = (IDataConsumer) getCategoryObjects().get(2);
        measurements = consumer.getAllMeasurements();
    }

    @Override
    public void action() {
        for (var m : measurements)
        {
            var n  = m.getMeasurementsCount();
            for (var i = 0; i < n; i++)
            {
                var o = m.getMeasurement(i);
                System.out.print(o + " ");
            }
            System.out.println();
        }
    }


    public void test()
    {
        var r = new DataRuntimeConsumer(consumer);
        var p = new Performer();
        p.performFixedStepCalculation(r, 0, 0.1, 30, this,this, stop);
    }

    IDataConsumer consumer;

    IMeasurements[] measurements;

    IFuncT<boolean[]> stop = new Cond();

    @Override
    public boolean[] funcT() {
        return b;
    }

    boolean[] b = new boolean[]{true};

    class  Cond implements IFuncT<boolean[]>
    {

        @Override
        public boolean[] funcT() {
            return b;
        }
        boolean[] b = new boolean[]{false};


    }
}

