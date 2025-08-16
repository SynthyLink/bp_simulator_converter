using AssemblyService.Attributes;

namespace DataPerformer.Formula.Java
{
    /// <summary>
    /// Static extensions
    /// </summary>
    [InitAssembly]
    public static class StaticExtensionDataPerformerFormulaJava
    {
        static  StaticExtensionDataPerformerFormulaJava()
        {
            new ClassCodeCreator();
        }

        /// <summary>
        /// Initialize itself
        /// </summary>
        static public void Init(InitAssemblyAttribute attr)
        {

        }

    }
}
