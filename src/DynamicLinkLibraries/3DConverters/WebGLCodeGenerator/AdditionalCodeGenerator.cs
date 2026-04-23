using BaseTypes.Attributes;
using DataPerformer.Portable;
using Diagram.UI;
using Diagram.UI.Interfaces;

using Motion6D.Interfaces;

namespace WebGLCodeGenerator
{
    [AdditionalCodeLanguage("WebGL")]
    internal class AdditionalCodeGenerator : IAdditionalCodeGenerator
    {
        Diagram.UI.Performer performer = new();

        static readonly string models = "models";

        IComponentCollection componentCollection;

        static List<string> scene = new List<string>();

        string name;

        string directory;

        string modeldir;

        string sceneFile;

        static AdditionalCodeGenerator()
        {
            var f = Properties.Resources.NameScene;
            using var stream = new MemoryStream(f);
            using var reader = new StreamReader(stream);
            do
            {
                scene.Add(reader.ReadLine());
            }
            while (!reader.EndOfStream);
        }


        public AdditionalCodeGenerator()
        {
            this.AddAdditinalCodeCreator();
        }


        protected void Save(ISaveGrahicalData data, string directory)
        {
            var name = performer.GetRootName(data);
            var dir = Path.Combine(directory, name);
            if (Directory.Exists(dir))
            {
                Directory.Delete(dir, true);
            }
            Directory.CreateDirectory(dir);
            data.Save(dir, "WebGL");
        }

        protected virtual List<string> CreateScene()
        {
            var l = new List<string>();
            foreach (var s in scene)
            {
                var t = s;
                if (t.Contains("})"))
                {
                    continue;
                }
                if (t.Contains("Cessna"))
                {
                    t = t.Replace("Cessna", name);
                }
                if (s.Contains("NameScene"))
                {
                    t = t.Replace("NameScene", name + "Scene");
                }
                if (s.Contains("LOAD"))
                {
                    var ll = GetLoad();
                    performer.Add(l, ll, 3);
                    continue;
                }
                l.Add(t);
            }
            return l;
        }

        List<string> texts = new List<string>() { ".obj", ".mtl" };

        protected string Wrap(string s, char c)
        {
            return c + s + c;
        }

        string datadir;
        List<string> GetLoad()
        {
            var l = new List<string>();
            var res = new List<string>();
            var s = "";
            componentCollection.ForEach((ISaveGrahicalData data)
            =>
            {
                var name = performer.GetRootName(data);
                datadir = Path.Combine(modeldir, name);
                var t = data.GetGraphicalData("");
                foreach (var item in t)
                {
                    res.Add("this.addResource(\"" + Path.Combine(datadir, item.Key) + "\")");
                    if (s.Length > 0)
                    {
                        s += ",";
                        l.Add(s);
                    }
                    s = Add(item);
                }
            });
            l.Add(s);
            l.Add("})");
            foreach (var r in res)
            {
                l.Add(r.Replace("\\", "/"));
            }
            return l;
        }

        protected string Add(KeyValuePair<string, string> item)
        {
            var ext = Path.GetExtension(item.Value).ToLower();
            var type = texts.Contains(ext) ? "\'text\'" : "\'image\'";
            var dd = Path.Combine(datadir, item.Value);
            var s = "[" + Wrap(item.Key, '\"') + "]:{ url: " + Wrap(dd, '\'') + ", type: " + type + "}";
            return s.Replace("\\", "/");
        }

        protected virtual void Generate(IComponentCollection componentCollection, string name, string directory)
        {
            this.componentCollection = componentCollection;
            this.name = name;
            this.directory = directory;
            sceneFile = name + "Scene.ts";
            modeldir = "models";
            var dir = Path.Combine(directory, modeldir); 
            componentCollection.ForEach((ISaveGrahicalData data) => Save(data, dir));
            var l = CreateScene();
            dir = Path.Combine(Path.Combine(directory, "src"), "scenes");
            var p = Path.Combine(dir, sceneFile);
            if (File.Exists(p))
            {
                File.Delete(p);
            }
            performer.SaveStrings(l, p);
        }

        void IAdditionalCodeGenerator.Generate(IComponentCollection componentCollection, string name, string directory)
        {
            Generate(componentCollection, name, directory);
           
        }
    }
}
