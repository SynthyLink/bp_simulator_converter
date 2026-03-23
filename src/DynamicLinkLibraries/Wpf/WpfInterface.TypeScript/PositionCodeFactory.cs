using Diagram.Interfaces;
using Motion6D.Portable.TypeScript.Interfaces;
using System.ComponentModel;

namespace WpfInterface.TypeScript
{
    public class PositionCodeFactory : IPositionCodeFactory, IParametersCodeCreator, IAdditionalFiles
    {
        public PositionCodeFactory()
        {
        }

        List<string> IPositionCodeFactory.CreateCode(string prefix, object obj, string volume)
        {
            return null;
        }

        List<string> IParametersCodeCreator.CreateParameters(string prefix, object parent, object obj, string volume)
        {
            return null;
        }

        List<string> IParametersCodeCreator.SetParameters(string prefix, object parent, object obj, string volume)
        {
            return null;
        }

        Dictionary<string, byte[]> IAdditionalFiles.Files => Files;

        protected virtual Dictionary<string, byte[]> Files { get; } = new Dictionary<string, byte[]>();


    }
}
