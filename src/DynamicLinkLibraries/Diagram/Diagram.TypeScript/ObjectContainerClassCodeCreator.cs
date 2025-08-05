using Diagram.UI.Interfaces;
using Diagram.UI.Attributes;

using ErrorHandler;

namespace Diagram.UI.TypeScript
{
    [Language("TS")]
    internal class ObjectContainerClassCodeCreator : IClassCodeCreator
    {
        public ObjectContainerClassCodeCreator()
        {
            this.AddCodeCreator();
        }
        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            return null;
            throw new OwnNotImplemented();
        }
    }
}