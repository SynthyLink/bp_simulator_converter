using System;
using System.Windows.Forms;
using System.Drawing;
using System.Text;
using System.Threading;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Diagram.UI;

using DataPerformer.Portable;
using DataPerformer.UI.Interfaces;
using DataPerformer.UI;
using DataPerformer.Interfaces;

using Chart.Interfaces;
using Chart.DataPerformer;

using Trading.Library.Forms.Interfaces;
using Trading.Library.Objects;

using WindowsExtensions;


namespace Trading.Library.Forms.UserControls
{
    public partial class UserControlOrderFull : UserControl, IOrderHolder, IMouseChartIndicator
    {
        Order order;

        CancellationTokenSource ctx;

        UserControlOrderChart chart;

        Dictionary<string, object> dictionary;

        bool mouseWheelEnabled = false;

        IColorDictionary colorDictionary;

        Dictionary<string, Dictionary<string, Color>> dColor;

        public UserControlOrderFull()
        {
            InitializeComponent();
            tabControlMain.TabPages.Remove(tabPageProperties);
            colorDictionary = this.FindChildObject<IColorDictionary>();
            chart = this.FindChildObject<UserControlOrderChart>();
        }

        Order IOrderHolder.Order
        {
            get => order;
            set => order = value;
        }

        private void toolStripButtonStart_Click(object sender, EventArgs e)
        {
            Start();
        }


        void SolveTask()
        {
            ctx = new();
            var mea = order.FindMeasurement(order.Date);
             MeasurementSeries[] m = null;
            var str = colorDictionary.ToStrings().ToArray();
            dictionary = order.PerformIterator(order.Iterator,
    order.Date, str, out m, () => ctx.Token.IsCancellationRequested);

        }

        async void Start()
        {
            if (order.Iterator == null) { return; }
            toolStripButtonStart.Enabled = false;
            toolStripButtonStop.Enabled = true;
            dColor = colorDictionary.ColorDictionary;
            var task =
              new Task(
          SolveTask);
            task.Start();
            await task;
            TaskCompleted();
            return;
            task.GetAwaiter().OnCompleted(TaskCompleted);
            task.Start();
        }

        void TaskCompleted()
        {
            
            var act = () =>
                {
                    toolStripButtonStart.Enabled = true;
                    toolStripButtonStop.Enabled = false;

                };
            this.InvokeIfNeeded(act);
            colorDictionary.Set(order);
            IMeasurements[] mmm = colorDictionary.GetMeasurements(order).ToArray();
            if (chart != null)
            {
                chart.Process(dictionary, mmm, colorDictionary.ColorDictionary);
            }
        }

        private void toolStripButtonStop_Click(object sender, EventArgs e)
        {
            var a = () =>
            {

                ctx.Cancel();
                toolStripButtonStop.Enabled = false;
            };
            this.InvokeIfNeeded(a);

        }

        void SetMouseWheel(bool enabled)
        {
            mouseWheelEnabled = enabled;
            if (!enabled)
            {
                toolStripStatusLabel.Text = string.Empty;
            }
        }


        static object f(object o)
        {
            return o;
        }

        new internal Func<object, object>[] Show = [f, f];


        bool IMouseChartIndicator.IsEnabled
        {
            get => mouseWheelEnabled;
            set => SetMouseWheel(value);

        }

        void IMouseChartIndicator.Indicate(double x, double y)
        {
     //       toolStripStatusLabel.Text = "X = " + Show[0](x) + " Y= " + Show[1](y);
            var dt  = Show[0](x).ToString();
            StringBuilder buffer = new StringBuilder(dt);
            int n = 50 - (int)buffer.Length;
            for (int i = 0; i < n; i++) 
            { 
                buffer.Append(' ');
            }

            toolStripStatusLabel.Text = "X = " + buffer + " Y= " + y;
        }
    }
}