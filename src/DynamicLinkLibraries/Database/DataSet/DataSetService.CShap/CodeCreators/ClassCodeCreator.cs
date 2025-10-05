using BaseTypes.Attributes;
using DataSetService.Pure.Interfaces;
using Diagram.UI;
using Diagram.UI.Interfaces;
using Newtonsoft.Json;

namespace DataSetService.Pure.CodeCreators
{
    [Language("C#")]
    class ClassCodeCreator : Diagram.UI.CodeCreators.ClassCodeCreator
    {

        static NamedTree.Performer performer = new();

        static readonly Dictionary<Func<object, bool>, Func<string, object, List<string>>> dictionary =
            new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
            {
                    { (o) => { return o is SavedDataProvider; } , CreateSavedDataProvider },
             };


        internal ClassCodeCreator() : base(false)
        {
            this.AddClassCodeCreator();
        }


        protected override List<string> CreateCode(string prefix, object obj, string volume)
        {
            foreach (Func<object, bool> key in dictionary.Keys)
            {
                if (key(obj))
                {
                    return dictionary[key](prefix, obj);
                }
            }
            return null;
        }

        static List<string> CreateSavedDataProvider(string preffix, object obj)
        {
            List<string> l = new List<string>();
            string pr = preffix;
            if (pr[pr.Length - 1] != '.')
            {
                pr = pr + ".";
            }
            SavedDataProvider sv = obj as SavedDataProvider;
            l.Add("DataSetService.Pure.SavedDataProvider");
            l.Add("{");
            l.Add("");
            l.Add("\tinternal CategoryObject()");
            l.Add("\t{");
            IDataSetProvider prov = sv;
            var dataSet = prov.DataSet;
            var sr = JsonSerializer.Create();
            var s = JsonConvert.SerializeObject(dataSet);
            var ll = performer.GenerateLong("s", s, 1000);
            performer.Add(l, ll, 2);
            l.Add("\t\tvar ds = Newtonsoft.Json.JsonConvert.DeserializeObject<System.Data.DataSet>(s);");
            l.Add("\t\tSet(ds);");

            l.Add("\t}");

            l.Add("}");
            return l;
        }

    }
}

