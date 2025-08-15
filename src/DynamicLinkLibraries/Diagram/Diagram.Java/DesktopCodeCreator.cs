using CategoryTheory;

using Diagram.UI.Attributes;
using Diagram.UI.CodeCreators.Interfaces;
using Diagram.UI.Interfaces;

namespace Diagram.UI.Java
{
    [Language("Java", ".java")]
    internal class DesktopCodeCreator : IDesktopCodeCreator
    {
        UI.Performer performer = new UI.Performer();

        NamedTree.Performer tPerformrer = new NamedTree.Performer();
        public DesktopCodeCreator() { this.AddCodeCreator(); }

        List<string> IDesktopCodeCreator.CreateCode(IDesktop desktop, string namespacE, string className, bool staticClass)
        {
           var l = new List<string>();
            l.Add("package generated;");
            l.Add("");
            l.Add("import category_theory.Desktop;");
            l.Add("");
            l.Add("public class " + className + " extends Desktop {");
            l.Add("");
            List<ICategoryObject> categoryObjects;
            List<ICategoryArrow> categoryArrows;
            Dictionary<ICategoryObject, int> objects;
            Dictionary<ICategoryArrow, int> arrows;
            performer.Get(desktop, out categoryObjects, out categoryArrows, out objects, out arrows);
            IClassCodeCreator classCodeCreator = StaticExtensionDiagramUI.Creators["Java"];
            for (int i = 0; i < categoryObjects.Count; i++)
            {
                var categoryObject = categoryObjects[i];
                var pr = className + "." + "CategoryObject" + i;
                var c = classCodeCreator.CreateCode(pr, categoryObject);
                tPerformrer.Add(l, c, 2);
                l.Add("");
            }
            for (int i = 0; i < categoryArrows.Count; i++)
            {
                var categoryArrow = categoryArrows[i];
                var pr = "CategoryArrow" + i;
                var c = classCodeCreator.CreateCode(pr, categoryArrow);
                tPerformrer.Add(l, c, 2);
                l.Add("");
            }
            l.Add("\tpublic " + className + "() {");
            l.Add("");
            for (int i = 0; i < objects.Count; i++)
            {
                l.Add("\t\tnew CategoryObject_" + i + "();");
            }
            for (int i = 0; i < arrows.Count; i++)
            {
                l.Add("\t\tnew CategoryArrow" + i + "();");
            }
            for (int i = 0; i < categoryArrows.Count; i++)
            {
                var categoryArrow = categoryArrows[i];
                var sn = objects[categoryArrow.Source];
                var tn = objects[categoryArrow.Target];
                l.Add("\t\tarrows[" + i + "].setSource(objects[" + sn + "]);");
                l.Add("\t\tarrows[" + i + "].setTarget(objects[" + tn + "]);");
            }
            l.Add("\t\tpostSet();");
            l.Add("\t}");
            l.Add("");
            l.Add("");
            l.Add("}");

            return l;
        }
    }
}
