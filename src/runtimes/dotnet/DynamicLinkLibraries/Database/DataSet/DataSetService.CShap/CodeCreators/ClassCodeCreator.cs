using BaseTypes.Attributes;
using DataSetService.Pure.Interfaces;
using Diagram.UI;
using Newtonsoft.Json;

namespace DataSetService.Pure.CodeCreators
{
    [Language("C#")]
    class ClassCodeCreator : Diagram.UI.CodeCreators.BaseClassCodeCreator
    {


        internal ClassCodeCreator() : base(false)
        {
            this.AddClassCodeCreator();
            dictionary =
            new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
            {
                    { (o) => { return o is SavedDataProvider; } , CreateSavedDataProvider },
             };
        }


 
        List<string> CreateSavedDataProvider(string preffix, object obj)
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

