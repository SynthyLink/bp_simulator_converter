using BaseTypes.Attributes;
using Diagram.UI.CodeCreators.Interfaces;
using Diagram.UI.Interfaces;

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

        protected IDesktopCodeCreator DesktopCodeCreator
        { get; set; }



        List<string> IClassCodeCreator.CreateCode(string preffix, object obj)
        {
            return null;
            throw new OwnNotImplemented();
        }
    }
}