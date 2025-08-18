using BaseTypes.CodeCreator.Interfaces;
using ErrorHandler;

namespace DataPerformer.Portable.Java
{
    public  class TypeCreator : ITypeCreator
    {
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
