using BaseTypes.Attributes;
using CategoryTheory;
using Diagram.Interfaces;
using Diagram.UI;
using Motion6D.Portable.TypeScript.Interfaces;

namespace Motion6D.Portable.TypeScript
{
    [Language("TS")]
    public class ClassCodeCreator : DataPerformer.Portable.TypeScript.ClassCodeCreator
    {
        IPositionCodeFactory factory;



        protected ClassCodeCreator(bool b) : base(b) { }



        internal ClassCodeCreator(IPositionCodeFactory factory) : base(true)
        {
            this.factory = factory;
            dictionary = new Dictionary<Func<object, bool>, Func<string, object, List<string>>>()
         {
                      { (object o) => { return o.GetType().Name.Contains("RigidReferenceFrame"); } , CreateReferenceFrame },
                      { (object o) => { return o is ReferenceFrameArrow; } , CreateReferenceFrameArrow },
                      { (object o) => { return o is VisibleConsumerLink;  } , CreateVisibleCosumerLink },
                  { (object o) => { return o is ReferenceFrameData; } , CreateReferenceFrameData},
                  { (object o) => { return o is Camera; } , CreateCamera},
                          { (object o) => { return o is SerializablePosition; } , CreateSerializablePosition},
    };


            this.AddClassCodeCreator();
        }

        protected override  List<string> CreateCode(string prefix, object obj, string volume)
        {
            if (factory != null)
            {
                var t = factory.CreateCode(prefix, obj, volume);
                if (t != null) { return t; }
            }
            return base.CreateCode(prefix, obj, volume);
        }


        List<string> CreateReferenceFrame(string preffix, object obj)
        {

            var l = new List<string>();
            var frame = obj as RigidReferenceFrame;
            var s = performer.ClassString(preffix, "RigidReferenceFrame");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            l.Add("\t\tthis.relativePosition = []");
            l.Add("\t\tthis.relativeQuaternion = []");
            var ll = Get("relativePosition", frame.RelativePosition);
            Add(l, ll, 1);
            ll = Get("relativePosition", frame.RelativeQuaternion);
            Add(l, ll, 1);
            l.Add("\t}");
            l.Add("}");
            return l;
        }

        List<string> CreateReferenceFrameData(string preffix, object obj)
        {

            var l = new List<string>();
            var frame = obj as ReferenceFrameData;
            var s = performer.ClassString(preffix, "ReferenceFrameData");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            var ll = Get("this.parametersList", frame.Parameters);
            Add(l, ll, 0);
            l.Add("\t}");
            l.Add("}");
            return l;
        }

        List<string> CreateSerializablePosition(string preffix, object obj)
        {
            var l = new List<string>();
            var sp = obj as SerializablePosition;
            var par = sp.Parameters;
            if (par != null)
            {
                var ll = this.par.CreateParameters(preffix, this, par, "");
                    Add(l, ll, 2);
                
            }
            IProperties properties = sp;
            var pr = properties.Properties;
            if (pr != null)
            {
                var ll = this.pr.CreateProperties(preffix, pr, "");
                Add(l, ll, 2);
            }
            var s = performer.ClassString(preffix, "SerializablePosition");
            l.Add(s);
            l.Add("{");
            performer.AddObjectConstructor(l);
            if (par != null)
            {
                var ll = this.par.SetParameters(preffix, this, par, "");
                Add(l, ll, 2);
            }
            if (pr != null)
            {
                var ll = this.pr.SetProperties(preffix, par, "");
                Add(l, ll, 2);
            }
            l.Add("\t}");
            l.Add("}");
            return l;
        }


        List<string> CreateCamera(string preffix, object obj)
        {
            return CreatePure(preffix, "BasicCamera");
        }

        List<string> CreateReferenceFrameArrow(string preffix, object obj)
        {
            return CreatePure(preffix, "ReferenceFrameArrow");
        }

        List<string> CreateVisibleCosumerLink(string preffix, object obj)
        {
            return CreatePure(preffix, "VisibleConsumerLink");
        }


        protected override List<string> CreateProperties(string prefix, object obj, string volume)
        {
            if (factory is IPropertiesCodeCreator pr)
            {
                var pp = pr.CreateProperties(prefix, obj, volume);
                if (pp != null)
                {
                    return pp;
                }
            }
            return base.CreateProperties (prefix, obj, volume);    
        }

        protected override List<string> CreateParameters(string prefix, object parent, object obj, string volume)
        {
            if (factory is IParametersCodeCreator pr)
            {
                var pp = pr.CreateParameters(prefix, parent, obj, volume);
                if (pp != null) 
                {
                    return pp;
                }
            }
            return base.CreateParameters(prefix, parent, obj, volume);
        }

        protected override List<string> SetParameters(string prefix, object parent, object obj, string volume)
        {
            if (factory is IParametersCodeCreator pr)
            {
                var pp = pr.SetParameters(prefix,  parent, obj, volume);
                if (pp != null)
                {
                    return pp;
                }
            }
            return base.SetParameters(prefix, parent, obj, volume);
        }

        protected override List<string> SetProperties(string prefix, object obj, string volume)
        {
            if (factory is IPropertiesCodeCreator pr)
            {
                var pp = pr.SetProperties(prefix, obj, volume);
                if (pp != null)
                {
                    return pp;
                }
            }
            return base.SetProperties(prefix, obj, volume);
        }





    }
}
