using CategoryTheory;
using Diagram.UI.CodeCreators.Interfaces;
using NamedTree;
using System.Collections.Generic;

namespace Diagram.Interfaces
{
    public interface IChildrenCodeCreator
    {
        List<string> CreateChildren(string prefix, IChildren<ICategoryObject> obj, string volume);

        List<string> InsertChidren(string prefix, IChildren<ICategoryObject> obj, string volume);
        IDesktopCodeCreator DesktopCodeCreator { get; set; }

    }
}
