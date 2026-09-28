using AssemblyService.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataPerformer.Portable.Python
{
    [InitAssembly]
    public static class StaticExtensionDataPerformerPortablePython
    {
        /// <summary>
        /// Constructor
        /// </summary>
        static StaticExtensionDataPerformerPortablePython()
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
