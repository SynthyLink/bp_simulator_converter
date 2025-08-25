using BaseTypes.Attributes;
using DataPerformer.Interfaces;
using Diagram.Interfaces;
using Diagram.UI.Interfaces;
using ErrorHandler;
using FormulaEditor;
using FormulaEditor.CodeCreators.Interfaces;
using FormulaEditor.Interfaces;

namespace DataPerformer.Formula.Java
{
    [Language("Java")]
    internal class TreeCollectionCodeCreator : ITreeCollectionCodeCreator
    {
        Performer performer = new Performer();

        object current;

        ObjectFormulaTree[] trees;

        public TreeCollectionCodeCreator()
        {
            this.AddTreeCollectionCodeCreator();

        }

        Dictionary<string, List<string>> ITreeCollectionCodeCreator.CreateCode(object obj, ObjectFormulaTree[] trees, string className, string constructorModifier, bool checkValue)
        {
            throw new OwnNotImplemented();
        }

        private List<string> PostCreateCode(ITreeCodeCreator local, object ob, IList<string> lcode,
     IList<string> variables, IList<string> initializers, string consturctor, bool checkValue = true)
        {
            List<string> l = new();
            performer.Add(l, lcode as List<string>, 1);
            int nTree = local.Trees.Length;
            l.Add("");
             l.Add("init() : void");
            l.Add("{");
            if (ob is IMeasurements)
            {
                l.Add("\tvar all = this.getAllMeasurements();");
            }
            performer.Add(l, initializers as List<string>, 1);
            l.Add("}");
            l.Add("");
            foreach (string s in variables)
            {
                l.Add("" + s);
            }
            if (checkValue)
            {
            }
            return l;
        }

        private List<string> PreCreateCode(object obj, out ITreeCodeCreator local,
             out IList<string> variables, out IList<string> initializers, string current)
        {
            var treeCodeCreator = performer.GetLaguageObject<ITreeCodeCreator>(this);
            var classCodeCreator = performer.GetLaguageObject<IClassCodeCreator>(this);
            if (classCodeCreator is ICurrentObject currentObject)
            {
                var co = currentObject.CurrentObject;
                if (co != this.current)
                {
                    this.current = co;
                    if (co is ITreeCollection collection)
                    {
                        trees = collection.Trees;
                    }
                }
            }
            local = treeCodeCreator.Create(obj, trees);
            ObjectFormulaTree[] tr = local.Trees;
            throw new ErrorHandler.OwnNotImplemented();
        /*    foreach (ObjectFormulaTree tree in tr)
            {
               // AddTree(tree, initializers, variables);
            }*/
             var l = new List<string>();
          /*  l.Add("calculateTree() : void");
            l.Add("{");
            l.Add("\tthis.success = true;");
            performer.Add(l, lcode as List<string>, 1);
            l.Add("}");*/
            return l;
        }

    }
}
