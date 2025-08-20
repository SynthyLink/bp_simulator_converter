package general_service.interfaces;

public interface IVariableSetter
{
    Object getDefaultValue();

    void set(Object input, Object output);
}
