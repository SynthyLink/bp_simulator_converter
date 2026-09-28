using System;
using System.Runtime.Serialization;
using System.Windows.Forms;

using CategoryTheory;
using Diagram.UI.Labels;
using Trading.Library.Objects;

using Trading.Library.Forms.UserControls;

namespace Trading.Library.Forms.Labels
{
    [Serializable()]
    public class TradingDataLabel : UserControlBaseLabel
    {
        new UserControlTradingData control = new UserControlTradingData();



        DataQuery dataQuery;
        public TradingDataLabel() : 
            base(typeof(Trading.Library.Serializable.Objects.DataQuery), "", 
                Properties.Resources.ib_data.ToBitmap())
        { }

        protected TradingDataLabel(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {

        }



        protected override ICategoryObject Object 
        { 
            get => dataQuery;
            set
            {
                if (!(value is DataQuery))
                {
                    CategoryException.ThrowIllegalSourceException();
                }
                dataQuery = value as DataQuery;
                value.Object = this;
                control.DataQuery = dataQuery;

            }
        }

        protected override UserControl Control => control;
    }
}
