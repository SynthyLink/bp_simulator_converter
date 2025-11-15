using AssemblyService.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
