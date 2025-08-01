using System.ComponentModel;

namespace Test.Calculation.Forms.UserControls
{
    public partial class UserControlObjectTransformer : UserControl
    {
        ObjectTransformer transformer;

        public UserControlObjectTransformer()
        {
            InitializeComponent();
        }

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        internal ObjectTransformer Transformer
        {
            set
            {
                transformer = value;
                textBox.Text = value.Coefficient.ToString();
                textBox.KeyUp += TextBox_KeyUp;
            }
        }

        private void TextBox_KeyUp(object? sender, KeyEventArgs e)
        {
            if (e.KeyCode != Keys.Enter)
            {
                return;
            }
            double a;
            if (double.TryParse(textBox.Text, out a))
            {
                transformer.Coefficient = a;
                return;
            }
            textBox.Text = transformer.Coefficient.ToString();
        }

        private void textBox_TextChanged(object sender, EventArgs e)
        {
            double a;
            if (double.TryParse(textBox.Text, out a))
            {
                transformer.Coefficient = a;
                return;
            }
            textBox.Text = transformer.Coefficient.ToString();

        }
    }
}
