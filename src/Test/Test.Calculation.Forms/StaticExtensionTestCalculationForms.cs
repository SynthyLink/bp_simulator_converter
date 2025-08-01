using AssemblyService.Attributes;
using Diagram.UI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Test.Calculation.Forms.Factory;

namespace Test.Calculation.Forms
{
    [InitAssembly]
    public static class StaticExtensionTestCalculationForms
    {
        /// <summary>
        /// Initialize itself
        /// </summary>
        static public void Init(InitAssemblyAttribute attr)
        {

        }

        static StaticExtensionTestCalculationForms()
        {
            new UIFactory();
        }

    }
}
