package general_service.setters;

import error_handler.interfaces.IErrorHandler;
import general_service.interfaces.IValueSetter;

import java.lang.reflect.Array;

public class DoubleSetter extends AbstractSetter {
    private   DoubleSetter()
    {
        value = array;
        def = new double[]{0};
    }

    IErrorHandler handler;

    public  DoubleSetter(IErrorHandler handler)
    {
        value = array;
        def = new double[]{0};
        this.handler = handler;
    }



    @Override
    public void setValue(Object o) {
      try {
          if (o == null) {
              value = null;
              return;
          }
          var d = (double[]) o;
          array[0] = d[0];
          value = array;
      }
      catch (Throwable ex)
      {
          handler.handle(ex);
      }
    }

    @Override
    public  String toString()
    {
        return  value == null ? "null" : array[0] + "";
    }

    private  double[] array = new double[]{0};



}
