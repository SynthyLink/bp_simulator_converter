using System;
using System.Drawing.Design;


using Diagram.UI;
using Diagram.UI.Components;

namespace BP_Simulator.UI.Components
{
    public class AviationControlSystemsComponent : DesktopHolder
    {

        public AviationControlSystemsComponent()
            : base(new Editor())
        {
        }

        class Editor : UITypeEditor
        {
            public override object EditValue(System.ComponentModel.ITypeDescriptorContext context, IServiceProvider provider, object value)
            {
                ByteHolder holder = value as ByteHolder;
                BasicEngineering.UI.Factory.Advanced.Forms.FormMain m = StaticExtension.CreateBPForm(null, holder, null, null, null, null, false, null, null, null, null);
                m.ShowDialog();
                return m.Creator.Holder;
            }

            public override UITypeEditorEditStyle GetEditStyle(System.ComponentModel.ITypeDescriptorContext context)
            {
                return UITypeEditorEditStyle.Modal;
            }
        }

    }
}
