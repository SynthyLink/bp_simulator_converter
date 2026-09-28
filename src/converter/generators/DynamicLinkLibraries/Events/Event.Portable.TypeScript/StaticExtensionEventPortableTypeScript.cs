using AssemblyService.Attributes;

namespace Event.Portable.TypeScript
{
    [InitAssembly]

    public static class StaticExtensionEventPortableTypeScript
    {
        static StaticExtensionEventPortableTypeScript()
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
