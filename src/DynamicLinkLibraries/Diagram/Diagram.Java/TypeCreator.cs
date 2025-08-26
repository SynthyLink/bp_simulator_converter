using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
using Diagram.UI;
using ErrorHandler;


namespace Diagram.Java
{
    [Language("Java")]
    internal class TypeCreator : ITypeCreator
    {
        const double a = 0;

        Performer performer = new Performer();
        internal TypeCreator()
        {
            this.AddTypeCreator();
        }
        string ITypeCreator.GetDefaultValue(object o)
        {
            if (o.GetType() == typeof(double))
            {
                return "new double[]{0}";
            }
            throw new OwnNotImplemented();
        }

        string ITypeCreator.GetStringValue(object o)
        {
            if (o.GetType() == typeof(double))
            {
                var x = (double)o;
                var c = performer.DoubleToString(x);
                return "new double[]{" + c + "}";
            }
            throw new OwnNotImplemented();
        }

        string ITypeCreator.GetType(object o)
        {
            if (o.GetType() == typeof(double))
            {
                return "new double[0]";
            }
            throw new OwnNotImplemented();
        }
    }
}