using BaseTypes.CodeCreator.Interfaces;
using Diagram.UI;
using ErrorHandler;
using FormulaEditor.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataPerformer.Formula
{
    public class Performer : Diagram.UI.Performer()
    {
        public Performer() { }


        readonly Type tcreatort = typeof(ITreeCollectionCodeCreator);


        public override T GetLaguageObject<T>(object o) where T : class
        {
            var x = base.GetLaguageObject<T>(o);
            if (x != null)
            {
                return x;
            }

            var lang = GetLanguage(o);
            var t = typeof(T);
            if (t == tcreatort)
            {
                return StaticExtensionDataPerformerFormula.TreeCodeCreators[lang] as T;
            }


            return null;
        }
    }
}
