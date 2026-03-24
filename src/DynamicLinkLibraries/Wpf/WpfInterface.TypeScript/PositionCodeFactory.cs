using Diagram.Interfaces;
using Motion6D.Interfaces;
using Motion6D.Portable.TypeScript.Interfaces;

namespace WpfInterface.TypeScript
{
    public class PositionCodeFactory : IPositionCodeFactory, IParametersCodeCreator
    {

        Diagram.UI.TypeScript.Performer performer = new();
        public PositionCodeFactory()
        {
        }

        List<string> IPositionCodeFactory.CreateCode(string prefix, object obj, string volume)
        {
            return null;
        }

        List<string> IParametersCodeCreator.CreateParameters(string prefix, object parent, object obj, string volume)
        {
            if (obj is IVisible)
            {
                return performer.CreatePure(prefix + "_Shape", "Basic3DShape");
            }
            return null;
        }

        List<string> IParametersCodeCreator.SetParameters(string prefix, object parent, object obj, string volume)
        {
            var l = new List<string>();
            if (obj is IVisible)
            {
                l.Add("this.setParameters(new + prefix + \"_Shape())");
                return l;
            }
            return null;
        }


        protected virtual Dictionary<string, byte[]> Files { get; } = new Dictionary<string, byte[]>();


    }
}
