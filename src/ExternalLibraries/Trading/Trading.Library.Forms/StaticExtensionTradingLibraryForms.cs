using AssemblyService.Attributes;
using Diagram.UI;
using Trading.Library.Forms.Factory;

namespace Trading.Library.Forms
{
    [InitAssembly]
    public static class StaticExtensionTradingLibraryForms
    {
        static StaticExtensionTradingLibraryForms()
        {
            new UIFactory();
        }

        /// <summary>
        /// Inits itself
        /// </summary>
        static public void Init()
        {
        }

        public static readonly ButtonWrapper[] ObjectsButtons = 
            [
      
            new ButtonWrapper(typeof(Serializable.Objects.DataQuery), "",
                      "Trading query", Properties.Resources.ib_data, null, true, false),
           new ButtonWrapper(typeof(Serializable.Objects.Order), "", 
                      "Order Manager", Properties.Resources.bundle, null, true, false)

            ];


    }
}
