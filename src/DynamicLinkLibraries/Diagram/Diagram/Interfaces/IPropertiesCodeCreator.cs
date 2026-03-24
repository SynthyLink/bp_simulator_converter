using System.Collections.Generic;

namespace Diagram.Interfaces
{
    public interface IPropertiesCodeCreator
    {
        List<string> CreateProperties(string prefix, object obj, string volume);

        List<string> SetProperties(string prefix, object obj, string volume);

    }
}
