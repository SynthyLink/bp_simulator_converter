using BaseTypes.Attributes;
using Diagram.Interfaces;
using Diagram.UI;
using Diagram.UI.Interfaces;
using Diagram.UI.Portable;

namespace Diagram.TypeScript
{
    [Language("TS")]
    public class ClassCodeCreator : IClassCodeCreator, IParametersCodeCreator, IPropertiesCodeCreator
    {
        protected IParametersCodeCreator par;
        protected IPropertiesCodeCreator pr;

        internal ClassCodeCreator()
        {
            par = this;
            pr = this;
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>
            {
                { (object o) => { return o is BelongsToCollection; } , CreateBelongs },

            };
            this.AddClassCodeCreator();
        }

        protected ClassCodeCreator(bool b)
        {
            par = this;
            pr = this;
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
        protected void Add(List<string> l, List<string> ll, int shift)
        {
            if (ll == null) return;
            performer.Add(l, ll, shift);
        }

        List<string> IClassCodeCreator.CreateCode(string prefix, object obj, string volume)
        {
            return CreateCode(prefix, obj, volume);
        }


        /// <summary>
        /// Array to list
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="x">x</param>
        /// <returns></returns>
        protected List<string> Get(string id, double[] x)
        {
            return performer.Get(id, x).ToList();
        }

        List<string> CreateBelongs(string preffix, object obj)
        {
            return CreatePure(preffix, "BelongsToCollection");
        }

        protected virtual List<string> CreatePure(string preffix, string name)
        {
            var l = new List<string>();
            var s = performer.ClassString(preffix, name);
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t}");
            l.Add("}");
            return l;
        }


        /// <summary>
        /// Enumerable to list
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="x">x</param>
        /// <returns></returns>
        protected List<string> Get(string id, IEnumerable<string> x)
        {
            return performer.CreateList(id, x).ToList();
        }

        List<string> IPropertiesCodeCreator.SetPropereties(string prefix, object obj, string volume)
        {
            return SetPropereties(prefix, obj, volume);
        }


        List<string> IParametersCodeCreator.CreateParameters(string prefix, object parent, object obj, string volume)
        {
            return CreateParameters(prefix, parent, obj, volume);
        }

        List<string> IParametersCodeCreator.SetParameters(string prefix, object parent, object obj, string volume)
        {
            return SetParameters(prefix, parent, obj, volume);
        }

        List<string> IPropertiesCodeCreator.CreatePropereties(string prefix, object obj, string volume)
        {
            return CreatePropereties(prefix, obj, volume);
        }


        protected virtual List<string> CreatePropereties(string prefix, object obj, string volume)
        {
            return null;
        }

        protected virtual List<string> CreateParameters(string prefix, object parent, object obj, string volume)
        {
            return null;
        }

        protected virtual List<string> SetParameters(string prefix, object parent, object obj, string volume)
        {
            return null;
        }

        protected virtual List<string> SetPropereties(string prefix, object obj, string volume)
        {
            return null;
        }

  
        protected Dictionary<Func<object, bool>, Func<string, object, List<string>>> dictionary;

        protected UI.TypeScript.Performer performer = new();

    }
}
