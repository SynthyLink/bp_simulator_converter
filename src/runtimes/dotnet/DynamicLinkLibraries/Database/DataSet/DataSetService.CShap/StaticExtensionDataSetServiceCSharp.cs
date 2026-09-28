using AssemblyService.Attributes;
using DataSetService.Pure.CodeCreators;

namespace DataSetService.CShap
{

    /// <summary>
    /// Static extension
    /// </summary>
    [InitAssembly]
    public static class StaticExtensionDataSetServiceCSharp
    {
        static StaticExtensionDataSetServiceCSharp()
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
