using System;
using System.Collections.Generic;
using System.Drawing;

using AssemblyService.Attributes;

using Chart.DataPerformer;
using Chart.DataPerformer.Interfaces;
using Chart.Drawing;
using Chart.Drawing.Interfaces;
using Chart.Drawing.Interfaces.Points;
using Chart.Drawing.Painters;
using Chart.Drawing.TextPainters;

using DataPerformer.Base.Filters;
using DataPerformer.UI.UserControls;

using Database.UI.Windows;

using Diagram.UI;

using NamedTree;

using Trading.Charts;
using Trading.Library.Forms.Factory;
using Trading.Library.Objects;
using ErrorHandler;

namespace Trading.Library.Forms
{
    [InitAssembly]
    public static class StaticExtensionTradingLibraryForms
    {

        static string a = @"Data Source=IVANKOV\SQLEXPRESS;Initial Catalog=TradeStation;Integrated Security=True;Encrypt=False;MultipleActiveResultSets=True;TrustServerCertificate=true";
        static StaticExtensionTradingLibraryForms()
        {
            new UIFactory();
            new SeriesFactory();
            Database.StaticExtensionTradingDatabase.ConnectionString = Properties.Settings.Default.ConnectionString;
            Database.StaticExtensionTradingDatabase.@interface = new ConnectionStringEditor(new List<string>());
            Database.StaticExtensionTradingDatabase.OnSuccess += (s, b) =>
            {
                try
                {
                    if (b)
                    {
                        if (Properties.Settings.Default.ConnectionString == s)
                        {
                            return;
                        }
                        Properties.Settings.Default.ConnectionString = s;
                        if (!Properties.Settings.Default.LastConnections.Contains(s))
                        {
                            Properties.Settings.Default.LastConnections.Add(s);
                        }

                    }
                    else
                    {
                        if (Properties.Settings.Default.LastConnections.Contains(s))
                        {
                            Properties.Settings.Default.LastConnections.Remove(s);
                        }
                        if (Properties.Settings.Default.ConnectionString == s)
                        {
                            Properties.Settings.Default.ConnectionString = "";
                        }
                    }

                }
                catch (Exception e)
                {
                    e.HandleException();
                }
                    Properties.Settings.Default.Save();
            };

        }
                

        /// <summary>
        /// Inits itself
        /// </summary>
        static public void Init(InitAssemblyAttribute assemblyAttribute)
        {
        }

        public static readonly ButtonWrapper[] ObjectsButtons = 
            [
      
            new ButtonWrapper(typeof(Serializable.Objects.DataQuery), "",
                      "Trading query", Properties.Resources.ib_data, null, true, false),
           new ButtonWrapper(typeof(Serializable.Objects.Order), "", 
                      "Order Manager", Properties.Resources.bundle, null, true, false)

            ];
        class SeriesFactory : ISeriesPainterFactory, ICoordinateFunctionsCreator,
      IAttachedToPointFactory, IChartPerformerPreparation
        {
            Brush sellBrush = new SolidBrush(Color.Red);
            Brush buyBrush = new SolidBrush(Color.Green);


            object Attach(object value)
            {

                var s = value.GetType().ToString();
                if (s.Contains("Trading.Library"))
                {
                    if (value is IAssociatedObject)
                    {
                        var o = (value as IAssociatedObject).Object;
                        if (o is Objects.Order p)
                        {
                            var pos = p.PositionDirection;
                            return pos;
                        }
                    }
                }
                return null;
            }

            internal SeriesFactory()
            {
                StaticExtensionDataPerformerChart.AttachedToPointFactory = this;
                StaticExtensionChartDrawing.SeriesPainterFactory = this;
                StaticExtensionChartInterfaces.CoordinateFunctionsCreator = this;
                StaticExtensionChartDrawing.ChartPerformerPreparation = this;
            }

            void DrawTriangle(Brush brush, int[] n, bool right, Graphics graphics, int k)
            {
                Point[] points = right ?

                                    [new Point(n[0], n[1]),
                                        new Point(n[0] - 2 * k, n[1] - k),
                                        new Point(n[0] - 2 * k, n[1] + k)] :
                  [new Point(n[0], n[1]),
                      new Point(n[0] + 2 * k, n[1] - k),
                      new Point(n[0] + 2 * k, n[1] + k)];
                graphics.FillPolygon(brush, points);

            }

            void DrawTriangleO(Brush brush, int[] n, Graphics graphics, int k, Objects.Order order)
            {
                var p = order.PositionDirection == Library.Enums.PositionDirection.Opened;
                DrawTriangle(brush, n, p, graphics, k);

            }

            bool OpenPosition(object o)
            {
                if (o is IPoint)
                {
                    var p = (o as IPoint).Properties;
                    if (p != null)
                    {
                        return p.Equals(Library.Enums.PositionDirection.Opened);
                    }
                }
                return false;
            }

            #region Implementation of interfaces

            object IAttachedToPointFactory.this[object value] => Attach(value);


            void IChartPerformerPreparation.Prepare(ChartPerformer performer, object obj)
            {
                var control = performer.Control;
                if (!(control is Chart.ChartPerformer.ControlWrapper))
                {
                    return;
                }
                var c = (control as Chart.ChartPerformer.ControlWrapper).Control;
                var cc = c.FindParent<UserControlGraph>();
                if (cc == null)
                {
                    return;
                }
                if (obj.GetType().FullName == "Trading.Library.Objects.DataQuery+FullTimeMeasurement")
                {
                    performer.Coordinator.X = new DataTimeFromOATextPainter();
                }
                else
                {
                    performer.Coordinator.X = new SimpleCoordTextPainter();
                }



            }

            Func<object, object>[] ICoordinateFunctionsCreator.this[object obj]
                    => Create(obj);



            ISeriesPainter ISeriesPainterFactory.this[object key]
            {
                get
                {
                    if (key is Tuple<ISeries, Color[], ChartPerformer, object>)
                    {
                        var t = key as Tuple<ISeries, Color[], ChartPerformer, object>;
                        var type = t.Item4.GetType();
                        var fn = type.FullName;
                        FilterWrapper filterWrapper = null;
                        Objects.Order order = null;
                        if (t.Item4 is IAssociatedObject)
                        {
                            var of = (t.Item4 as IAssociatedObject).Object;
                            if (of is FilterWrapper)
                            {
                                filterWrapper = (FilterWrapper)of;
                                if (filterWrapper.Kind > 0)
                                {
                                    return new StepSeriesPainter(t.Item2);
                                }
                            }
                            if (of is Objects.Order or)
                            {
                                order = or;
                                if (fn.Equals("Trading.Library.Objects.Order+IncomeMeasurement"))
                                {
                                    return new StepSeriesPainter(t.Item2);
                                }
                            }
                        }

                        if (fn == "DataPerformer.Portable.FilterWrapper+DonchianMeasurement")
                        {
                            return new StepSeriesPainter(t.Item2);
                        }
                        if (type.Assembly != typeof(DataQuery).Assembly)
                        {
                            return null;
                        }

                        if (fn == "Trading.Library.Objects.DataQuery+CandleMeasurement")
                        {
                            return new CandleSeriesPainter(Color.LightGreen, Color.LightPink);
                        }
                        int k = 10;
                        object o = null;
                        if (t.Item4 is IAssociatedObject)
                        {
                            o = (t.Item4 as IAssociatedObject).Object;
                        }
                        if (fn == "Trading.Library.Objects.Order+BuyTaxMeasurement")
                        {
                            var buyP = new DelegatePainter();

                            /*    buyP.Paint += (int[] n, Graphics g) =>
                                    {
                                       DrawTriangle(buyBrush, n,  g,  k, order);

                                     };*/
                            buyP.PaintPoint += (n, g, o) =>
                            {
                                var op = OpenPosition(o);
                                DrawTriangle(buyBrush, n, op, g, k);

                            };
                            return buyP;
                        }
                        if (fn == "Trading.Library.Objects.Order+SellTaxMeasurement")
                        {
                            var sellP = new DelegatePainter();
                            sellP.PaintPoint +=
                                (n, g, o) =>
                                {
                                    var op = OpenPosition(o);

                                    DrawTriangle(sellBrush, n, op, g, k);

                                };
                            return sellP;

                        }

                    }
                    return null;
                }
            }

            #endregion


            Func<object, object>[] Create(object obj)
            {
                return [fdt, f];
            }

            object fdt(object obj)
            {
                double t = (double)obj;
                var dt = DateTime.FromOADate(t);
                return dt.ToString();
            }

            object f(object obj) => obj;




        }

      

    }
}
