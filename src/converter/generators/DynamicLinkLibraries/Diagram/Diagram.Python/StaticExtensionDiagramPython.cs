using AssemblyService.Attributes;

namespace Diagram.UI.Python
{
    [InitAssembly]
    public static class StaticExtensionDiagramPython
    {
        static StaticExtensionDiagramPython()
        {
            new ObjectContainerClassCodeCreator();
            new DesktopCodeCreator();
        }

        /// <summary>
        /// Initializes itself
        /// </summary>
        static public void Init(InitAssemblyAttribute attr)
        {

        }

    }
}
