namespace WebGLCodeGenerator
{
    /// <summary>
    /// Static Extension
    /// </summary>
    [InitAssembly]
    public static class StaticExtensionWebGLCodeGenerator
    {
        static  StaticExtensionWebGLCodeGenerator()
        {
            new AdditionalCodeGenerator();
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
