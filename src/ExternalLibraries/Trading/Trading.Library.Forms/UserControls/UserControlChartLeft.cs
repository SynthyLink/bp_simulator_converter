using System;
using System.Windows.Forms;

namespace Trading.Library.Forms.UserControls
{
    public partial class UserControlChartLeft : UserControl
    {
        public UserControlChartLeft()
        {
            InitializeComponent();
        }

        private void panelCenter_Resize(object sender, EventArgs e)
        {
            panelChart.Width = Width;
            panelChart.Height = Height;
        }
    }
}
