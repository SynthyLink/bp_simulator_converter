using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

using IBApi;

using Trading.Library.Objects;
using System.ComponentModel;

namespace Trading.Library.Forms.UserControls
{
    public partial class UserControlTradingData : UserControl
    {
        private DataQuery dataQuery;

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        public Dictionary<string, object> Symbols
        {
            get;
            set;
        }

        private void Fill(DataQuery dataQuery)
        {
            Symbols =  dataQuery.Symbols;
            /*      foreach (var symbol in symbols.Keys)
                  {
                      var val = symbols[symbol];
                      comboBoxSymbol.Items.Add(symbol);
                  }*/
            comboBoxSymbol.Items.AddRange(Symbols.Keys.ToArray());
            comboBoxSymbol.SelectedIndex = 2;
            var itervals = StaticExtensionIBApi.Barsizes;
            comboBoxInterval.Items.Clear();
            comboBoxInterval.Items.AddRange(itervals);
            comboBoxInterval.SelectedIndex = 10;

        }

        public UserControlTradingData()
        {
            InitializeComponent();
            

        }

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Hidden)]
        internal DataQuery DataQuery
        {
            set
            {
                if (value == null)
                {
                    return;
                }
                if (dataQuery != null) 
                {
                    throw new Exception();
                }
                dataQuery = value;
                Fill(dataQuery);
                var g = dataQuery.Object;
                comboBoxSymbol.SelectedIndex = dataQuery.ToIndex(dataQuery.Object); 
                comboBoxInterval.SelectedIndex = dataQuery.Period.ToIndex();
                dateTimePickerBegin.Value = dataQuery.Begin;
                dateTimePickerEnd.Value = dataQuery.End;
                comboBoxSymbol.SelectedIndexChanged += ComboBoxSymbol_SelectedIndexChanged;
                comboBoxInterval.SelectedIndexChanged += ComboBoxInterval_SelectedIndexChanged;
                dateTimePickerBegin.ValueChanged += DateTimePickerBegin_ValueChanged;
                dateTimePickerEnd.ValueChanged += DateTimePickerEnd_ValueChanged;     
            }
        }

        private void DateTimePickerBegin_ValueChanged(object sender, EventArgs e)
        {
            dataQuery.Begin = dateTimePickerBegin.Value;
        }

        private void DateTimePickerEnd_ValueChanged(object sender, EventArgs e)
        {
           dataQuery.End = dateTimePickerEnd.Value;
        }

        private void ComboBoxInterval_SelectedIndexChanged(object sender, EventArgs e)
        {
            var o = comboBoxInterval.SelectedItem;
            if (o != null)
            {
                var s = o as string;
                dataQuery.Period = s;

            }
        }

        private void ComboBoxSymbol_SelectedIndexChanged(object sender, EventArgs e)
        {
            var o = comboBoxSymbol.SelectedItem;
            if (o != null)
            {
                var s = o as string;
                dataQuery.Object = dataQuery.ToGuid(s);
            }
        }
    }
}
