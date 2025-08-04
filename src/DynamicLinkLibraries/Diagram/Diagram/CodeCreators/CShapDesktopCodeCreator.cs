using System.Collections.Generic;
using Diagram.UI.Attributes;
using Diagram.UI.CodeCreators.Interfaces;
using Diagram.UI.Interfaces;

namespace Diagram.UI.CodeCreators
{
    [Language("C#", ".cs")]
    internal class CShapDesktopCodeCreator : IDesktopCodeCreator
    {
        public CShapDesktopCodeCreator()
        {
            this.AddCodeCreator();
        }


        List<string> IDesktopCodeCreator.CreateCode(IDesktop desktop, string namespacE, string className, bool staticClass)
        {
            return desktop.CreateInitDesktopCSharpCode(namespacE, className, staticClass);
        }
    }
}
