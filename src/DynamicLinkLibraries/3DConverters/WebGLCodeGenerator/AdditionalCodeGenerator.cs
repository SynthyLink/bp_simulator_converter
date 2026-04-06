using BaseTypes.Attributes;
using Diagram.UI;
using Diagram.UI.Interfaces;

namespace WebGLCodeGenerator
{
    [AdditionalCodeLanguage("WebGL")]
    internal class AdditionalCodeGenerator : IAdditionalCodeGenerator
    {
        public AdditionalCodeGenerator()
        {
            this.AddAdditinalCodeCreator();
        }

        void IAdditionalCodeGenerator.Generate(IComponentCollection componentCollection, string name, string directory)
        {
            throw new NotImplementedException();
        }
    }
}
