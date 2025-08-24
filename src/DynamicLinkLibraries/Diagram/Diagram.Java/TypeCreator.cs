using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
using Diagram.UI;
using ErrorHandler;


namespace Diagram.Java
{
    [Language("Java")]
    internal class TypeCreator : ITypeCreator
    {
        internal TypeCreator()
        {
            this.AddTypeCreator();
        }
        string ITypeCreator.GetDefaultValue(object o)
        {
            throw new OwnNotImplemented();
        }

        string ITypeCreator.GetStringValue(object o)
        {
            throw new OwnNotImplemented();
        }

        string ITypeCreator.GetType(object o)
        {
            throw new OwnNotImplemented();
        }
    }
}
