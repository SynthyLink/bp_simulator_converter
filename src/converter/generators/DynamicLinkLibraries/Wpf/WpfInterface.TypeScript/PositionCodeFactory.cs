using Diagram.UI;
using Diagram.UI.CodeCreators.Interfaces;
using Diagram.UI.Interfaces;
using Motion6D.Portable.TypeScript.Interfaces;

namespace WpfInterface.TypeScript
{
    public class PositionCodeFactory : IPositionCodeFactory, ISaveDesktopInformation// IParametersCodeCreator,
     //   ISaveDesktopInformation
    {

        Diagram.UI.TypeScript.Performer performer = new();
        public PositionCodeFactory()
        {
            this.SetSaveDesktopInformation();
        }

        List<string> IPositionCodeFactory.CreateCode(string prefix, object obj, string volume)
        {
            return null;
        }

  /*      List<string> IParametersCodeCreator.CreateParameters(string prefix, object parent, object obj, string volume)
        {
            var l = new List<string>();
            l = performer.CreatePure(pr, "Basic3DShape");
            DesktopCodeCreator.Loaded[obj] = pr;
            return l;
        }

        List<string> IParametersCodeCreator.SetParameters(string prefix, object parent, object obj, string volume)
        {
            var l = new List<string>();
            l.Add("this.setParameters(new " + prefix + "(desktop, name))");
            return l;
        }*/

        bool ISaveDesktopInformation.Save(object o, string url)
        {
            return false;
        }


        protected virtual Dictionary<string, byte[]> Files { get; } = new Dictionary<string, byte[]>();
        //IDesktopCodeCreator IParametersCodeCreator.DesktopCodeCreator { get => DesktopCodeCreator; set => DesktopCodeCreator = value; }
        public virtual IDesktopCodeCreator DesktopCodeCreator { get; set; }
    }
}
