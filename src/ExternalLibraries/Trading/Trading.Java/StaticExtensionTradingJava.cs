using AssemblyService.Attributes;

namespace Trading.Java
{
    [InitAssembly]
    public static class StaticExtensionTradingJava
    {

        static StaticExtensionTradingJava()
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
