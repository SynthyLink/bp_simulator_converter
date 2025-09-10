package tests;

import general_service.interfaces.IAction;
import general_service.interfaces.IFuncT;
import generated.RecursvieFeedback;
import measurements.Performer;
import measurements.interfaces.IDataConsumer;
import measurements.interfaces.IMeasurements;
import runtime.DataRuntimeConsumer;

public class RecursvieFeedbackAct extends RecursvieFeedback implements IAction, IFuncT<boolean[]> {

    public RecursvieFeedbackAct()
    {
        super();
        var c = getCategoryObjects();
        consumer = (IDataConsumer) performer.get(this, "Chart");
        measurements = consumer.getAllMeasurements();
    }

    @Override
    public void action() {
        general_service.Performer.print(consumer);
   /*
        for (var m : measurements)
        {
            var n  = m.getMeasurementsCount();
            for (var i = 0; i < n; i++)
            {
                var o = m.getMeasurement(i);
                System.out.print(o + " ");
            }
            System.out.println();
        }*/
    }


    public void test()
    {
        var r = new DataRuntimeConsumer(consumer);
        var p = new Performer();
        p.performFixedStepCalculation(r, 0, 0.1, 30, this,this, cond);
    }

    IDataConsumer consumer;

    IMeasurements[] measurements;

    @Override
    public boolean[] funcT() {
        return b;
    }

    Cond cond = new Cond();

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
