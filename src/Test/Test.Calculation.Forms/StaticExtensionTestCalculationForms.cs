using AssemblyService.Attributes;
using Test.Calculation.Forms.CodeCreators;
using Test.Calculation.Forms.Factory;

namespace Test.Calculation.Forms
{
    [InitAssembly]
    public static class StaticExtensionTestCalculationForms
    {
        /// <summary>
        /// Initialize itself
        /// </summary>
        static public void Init(InitAssemblyAttribute attr)
        {

        }

        static StaticExtensionTestCalculationForms()
        {
            new UIFactory();
            new CSCodeCreator();
            new TSCodeCreator();
            new JavaCodeCreator();
        }

    }
}
