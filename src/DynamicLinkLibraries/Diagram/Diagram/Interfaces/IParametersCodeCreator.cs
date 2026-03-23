using System.Collections.Generic;

namespace Diagram.Interfaces
{
    public interface IParametersCodeCreator
    {
        List<string> CreateParameters(string prefix, object parent, object obj, string volume);

        List<string> SetParameters(string prefix, object parent, object obj, string volume);
    }
}
