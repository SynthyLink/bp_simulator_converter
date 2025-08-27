import category_theory.CategoryObject;
import diagram.interfaces.IDesktop;
import general_service.Entry;
import general_service.Performer;
import general_service.interfaces.IValue;
import generated.TestDesktop;
import tests.Actor;

import java.util.ArrayList;
import java.util.List;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        java.util.List<general_service.Entry<int[], String>> list = new java.util.ArrayList<>();
        list.add(new general_service.Entry(new int[] { 1, 2}, "" ));
        var a = new Actor();
   // a.testRandomTwo();
        a.testRandomFour();

    //    new generated.ODE_Feedback();
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
        System.out.printf("Hello and welcome!");

        for (int i = 1; i <= 5; i++) {
            //TIP Press <shortcut actionId="Debug"/> to start debugging your code. We have set one <icon src="AllIcons.Debugger.Db_set_breakpoint"/> breakpoint
            // for you, but you can always add more by pressing <shortcut actionId="ToggleLineBreakpoint"/>.
            System.out.println("i = " + i);
        }
    }

    static  void  Test2()
    {
        new generated.Two();
    }
    static void Test1()
    {
        var n = 3;
        var desk1 = new IDesktop[n];
        for (var i = 0; i < n; i++)
        {
            desk1[i] = new generated.ODE_Feedback();

        }
        n = 5;
        var desk2 = new IDesktop[n];
        for (var i = 0; i < n; i++)
        {
            desk2[i] = new generated.ODE_Feedback();

        }
        var p = new Performer();

        var s  = p.extend(desk1, desk2);
 s = null;
    }
}