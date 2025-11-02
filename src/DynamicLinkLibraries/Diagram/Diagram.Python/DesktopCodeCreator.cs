using BaseTypes.Attributes;
using CategoryTheory;

using Diagram.UI.CodeCreators.Interfaces;
using Diagram.UI.Interfaces;
using Diagram.UI.Labels;

using NamedTree;

namespace Diagram.UI.Python
{
    [Language("Python", ".py")]
    internal class DesktopCodeCreator : IDesktopCodeCreator
    {
        UI.Performer ui_performer = new ();
 
        
        Performer performer = new ();

        string Current
        {
            get;
            set;
        }

        IComponentCollection collection;

        Tuple<Dictionary<ICategoryObject, int>, Dictionary<ICategoryArrow, int>> dictionary;

        IComponentCollection IDesktopCodeCreator.ComponentCollection => collection;

        Tuple<Dictionary<ICategoryObject, int>, Dictionary<ICategoryArrow, int>> IDesktopCodeCreator.Enumeration => dictionary;

        public DesktopCodeCreator() { this.AddDesktopCodeCreator(); }


        /// <summary>
        /// Creates code for desktop
        /// </summary>
        /// <param name="desktop">The desktop</param>
        /// <param name="namespacE">The namespace</param>
        /// <param name="className">Name of desktop class</param>
        /// <param name="staticClass">The "static class" sign</param>
        /// <returns>The code</returns>
        List<string> IDesktopCodeCreator.CreateCode(IComponentCollection desktop, string namespacE, string className, bool staticClass)
        {
            Exception ex;
            try
            {
                this.collection = desktop;
                dictionary = ui_performer.Enumerate(desktop);
                List<ICategoryObject> categoryObjects;
                List<ICategoryArrow> categoryArrows;
                Dictionary<ICategoryObject, int> objects;
                Dictionary<ICategoryArrow, int> arrows;
                ui_performer.Get(desktop, out categoryObjects, out categoryArrows, out objects, out arrows);
                IClassCodeCreator classCodeCreator = ui_performer.GetLaguageObject<IClassCodeCreator>(this);
                    // StaticExtensionDiagramUI.Creators["TS"]
                var l = new List<string>();
                for (int i = 0; i < categoryObjects.Count; i++)
                {
                    var categoryObject = categoryObjects[i];
                    var pr = className + "_CategoryObject_" + i;
                    Current = pr;
                    var c = classCodeCreator.CreateCode(pr, categoryObject, null);
                    l.AddRange(c);
                    l.Add("");
                }
                for (int i = 0; i < categoryArrows.Count; i++)
                {
                    var categoryArrow = categoryArrows[i];
                    var pr = className + "_CategoryArrow_" + i;
                    var c = classCodeCreator.CreateCode(pr, categoryArrow, null);
                    l.AddRange(c);
                    l.Add("");
                }
                l.Add("");
                l.Add("");
                //var s = performer.ClassString(className, "Desktop");
                //l.Add("export " + s);
                l.Add(performer.ClassString(className, "Desktop"));
                //l.Add("{");
                l.Add("\tdef __init__(self):");

                //l.Add("\t{");
                l.Add("\t\tsuper().__init__()");
                l.Add("");
                l.Add("\t\tself.name = \"" + className + "\"");
                l.Add("");
                for (var i = 0; i < categoryObjects.Count; i++)
                {
                    var categoryObject = categoryObjects[i] as IAssociatedObject;
                    var named_component = categoryObject.Object as INamedComponent;
                    string name = named_component.RootName;
                    var pr = "\t\t" + className + "_CategoryObject_" + i + "(self, \"" + name + "\")";
                    l.Add(pr);
                }
                for (var i = 0; i < categoryArrows.Count; i++)
                {
                    var categoryArrow = categoryArrows[i] as IAssociatedObject;
                    var named_component = categoryArrow.Object as INamedComponent;
                    string name = named_component.RootName;
                    var pr = "\t\t" + className + "_CategoryArrow_" + i + "(self, \"" + name + "\")";
                    l.Add(pr);
                }
                l.Add("");

                l.Add("\t\tlet objects = this.getCategoryObjects();");
                l.Add("\t\tlet arrows = this.getCategoryArrows();");
                l.Add("");
                for (int i = 0; i < categoryArrows.Count; i++)
                {
                    var categoryArrow = categoryArrows[i];
                    var sn = objects[categoryArrow.Source];
                    var tn = objects[categoryArrow.Target];
                    // todo replace with overloaded = operation
                    l.Add("\t\tarrows[" + i + "].source = objects[" + sn + "]");
                    l.Add("\t\tarrows[" + i + "].target = objects[" + tn + "]");
                }
                for (int i = 0; i < categoryArrows.Count; i++)
                {
                    var categoryArrow = categoryArrows[i];
                    if (categoryArrow is IPostSetArrow)
                    {
                        l.Add("\t\t(arrows[" + i + "] as unknown as IPostSetArrow).postSetArrow()");
                    }

                }
                for (var i = 0; i < categoryObjects.Count; i++)
                {
                    if (categoryObjects[i] is IPostSetArrow)
                    {
                        l.Add("\t\t(objects[" + i + "] as unknown as IPostSetArrow).postSetArrow()");
                    }
                }
                return l;
            }
            catch (Exception e)
            {
                ex = ErrorHandler.IncludedException.Get(e);
            }
            throw ex;
        }
    }
}
