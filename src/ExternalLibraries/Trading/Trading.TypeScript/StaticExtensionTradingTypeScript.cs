using AssemblyService.Attributes;

namespace Trading.TypeScript
{

    [InitAssembly]
    public static class StaticExtensionTradingTypeScript
    {
        static StaticExtensionTradingTypeScript()
        {
            new ClassCodeCreator();
        }

        #region Public Members

        /// <summary>
        /// Initialize itself
        /// </summary>
        static public void Init(InitAssemblyAttribute attr)
        {

        }

        #endregion


    }
}
