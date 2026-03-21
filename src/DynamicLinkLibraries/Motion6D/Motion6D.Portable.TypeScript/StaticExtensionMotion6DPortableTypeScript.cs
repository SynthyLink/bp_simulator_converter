using AssemblyService.Attributes;

namespace Motion6D.Portable.TypeScript
{
    /// <summary>
    /// Static Extension
    /// </summary>
    [InitAssembly]
    public static class StaticExtensionMotion6DPortableTypeScript
    {
        /// <summary>
        /// Constructor
        /// </summary>
        static StaticExtensionMotion6DPortableTypeScript()
        {
            new ClassCodeCreator();
        }

        /// <summary>
        /// Initialize itself
        /// </summary>
        /// <param name="attr">Initialization attribute</param>
        static public void Init(InitAssemblyAttribute attr)
        {

        }



    }
}
