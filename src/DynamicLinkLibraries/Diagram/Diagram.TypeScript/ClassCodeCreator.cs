using Diagram.UI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagram.TypeScript
{
    public class ClassCodeCreator : IClassCodeCreator
    {
  
        internal ClassCodeCreator()
        {

        }

        protected ClassCodeCreator(bool b)
        {

        }

        protected virtual List<string> CreateCode(string prefix, object obj, string volume)
        {
            foreach (var val in dictionary)
            {
                if (val.Key(obj))
                {
                    return val.Value(prefix, obj);
                }
            }
            return null;
        }

        List<string> IClassCodeCreator.CreateCode(string prefix, object obj, string volume)
        {
            return CreateCode(prefix, obj, volume);
        }

        protected Dictionary<Func<object, bool>, Func<string, object, List<string>>> dictionary;

        protected UI.TypeScript.Performer performer = new();

    }
}
