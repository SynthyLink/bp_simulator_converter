using CategoryTheory;

using Diagram.UI;
using Diagram.UI.Interfaces;
using Diagram.UI.Interfaces.Labels;
using Diagram.UI.Labels;

using ErrorHandler;
using System.Reflection;

namespace Test.Calculation.Forms.Factory
{
    internal class UIFactory : IUIFactory
    {
        Diagram.UI.Interfaces.Performer performer = new();

        Assembly assembly;

        protected virtual IToolsDiagram Tools
        {
            get; set;
        }

        protected virtual IUIFactory Parent
        {
            get; set;
        }

        internal UIFactory()
        {
            assembly = this.GetType().Assembly;
            this.Add();
        }

        Task<ICategoryObject> Get(IPaletteButton button)
        {
            var co = performer.Get<ICategoryObject>(button, assembly);
            return Task.FromResult(co);

        }


        IToolsDiagram IUIFactory.Tools { set => Tools = value; }
        IUIFactory IUIFactory.Parent { get => Parent; set => Parent = value; }

        void IUIFactory.CheckOrder(IDesktop desktop)
        {
            
        }

        ICategoryArrow IUIFactory.CreateArrow(IPaletteButton button)
        {
            return null;
        }

        IArrowLabelUI IUIFactory.CreateArrowLabel(IPaletteButton button, ICategoryArrow arrow, 
            IObjectLabel source, 
            IObjectLabel target)
        {
            return null;
        }

        object IUIFactory.CreateForm(INamedComponent comp)
        {
            throw new OwnNotImplemented();
        }

        IObjectLabelUI IUIFactory.CreateLabel(ICategoryObject obj)
        {
            return null;
        }

        IArrowLabelUI IUIFactory.CreateLabel(ICategoryArrow arr)
        {
            throw new OwnNotImplemented();
        }

        Task<ICategoryObject> IUIFactory.CreateObject(IPaletteButton button)
        {
            var o = Get(button);
            return o as Task<ICategoryObject>;
        }

        IObjectLabelUI IUIFactory.CreateObjectLabel(IPaletteButton button)
        {
            Type type = button.ReflectionType;
            string kind = button.Kind;
            if (type.Equals(typeof(Seriaizable.ObjectTransformer)))
            {
                return (new Labels.ObjectTransformerLabel(type, kind,
                      button.ButtonImage as Image)).CreateLabelUI(
                      Properties.Resources.thermometer, true);
            }
            return null;
         }

        object IUIFactory.GetAdditionalFeature<T>(T obj)
        {
            throw new OwnNotImplemented();
        }

        IPaletteButton IUIFactory.GetArrowButton(ICategoryArrow arrow)
        {
            throw new OwnNotImplemented();
        }

        IPaletteButton IUIFactory.GetObjectButton(ICategoryObject obj)
        {
            throw new OwnNotImplemented();
        }
    }
}
