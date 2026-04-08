using BaseTypes.Attributes;

using Diagram.UI;
using Diagram.UI.Interfaces;

using Motion6D.Interfaces;

namespace WebGLCodeGenerator
{
    [AdditionalCodeLanguage("WebGL")]
    internal class AdditionalCodeGenerator : IAdditionalCodeGenerator
    {
        Diagram.UI.Performer performer = new();

        public AdditionalCodeGenerator()
        {
            this.AddAdditinalCodeCreator();
        }


        protected void Save(ISaveGrahicalData data, string directory)
        {
            var name = performer.GetRootName(data);
            var dir = Path.Combine(directory, name);
            if (Directory.Exists(dir))
            {
                Directory.Delete(dir, true);
            }
            Directory.CreateDirectory(dir);
            data.Save(dir, "WebGL");
        }


        void IAdditionalCodeGenerator.Generate(IComponentCollection componentCollection, string name, string directory)
        {
            componentCollection.ForEach((ISaveGrahicalData data) => Save(data, directory));
        }
    }
}
