package tests;

public class Actor {

    public void testRandomTwo()
    {
        var r = new RandomTwoAct();
        r.test();
    }

    public void testRandomFour()
    {
        var r = new RandomFourAct();
        r.test();
    }

    public void testPI()
    {
        var r = new PiAct();
        r.test();
    }

    public void testODE()
    {
        var r = new ODEAct();
        r.test();
    }


    public void testCondition()
    {
        var r = new ConditionAct();
        r.test();
    }

}
