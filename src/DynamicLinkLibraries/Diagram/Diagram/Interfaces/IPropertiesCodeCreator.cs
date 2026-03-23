using System.Collections.Generic;

namespace Diagram.Interfaces
{
    public interface IPropertiesCodeCreator
    {
        List<string> CreatePropereties(string prefix, object obj, string volume);

        List<string> SetPropereties(string prefix, object obj, string volume);

    }
}
