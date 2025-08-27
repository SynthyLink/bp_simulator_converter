package general_service.setters.factory;

import general_service.interfaces.IValueSetter;
import general_service.interfaces.IValueSetterFactory;
import general_service.setters.DoubleSetter;

public class ValueSetterFactory implements IValueSetterFactory {
    @Override
    public IValueSetter getValueSetter(Object type) {
        new DoubleSetter();
    }
}
