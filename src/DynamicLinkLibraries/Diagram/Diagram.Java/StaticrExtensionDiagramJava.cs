using AssemblyService.Attributes;

namespace Diagram.UI.Java
{
    [InitAssembly]
    public static class StaticrExtensionDiagramJava
    {
        static  StaticrExtensionDiagramJava()
        {
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
