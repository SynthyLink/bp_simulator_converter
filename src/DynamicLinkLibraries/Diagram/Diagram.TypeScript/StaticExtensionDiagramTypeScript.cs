using AssemblyService.Attributes;

namespace Diagram.UI.TypeScript
{
    [InitAssembly]
    public static class StaticExtensionDiagramTypeScript
    {
        static StaticExtensionDiagramTypeScript()
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
