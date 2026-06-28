
namespace Generated
{
    public static class Donchian
    {

        static public bool SuccessLoad { get; private set; } = true;

        public static async Task<Diagram.UI.Interfaces.IDesktop> GetDesktop(System.Threading.CancellationToken token)
        {
            var desk = new InternalDesktop(true);
            return await desk.GetDesktopAsync(desk, token);
        }

        internal class InternalDesktop : Diagram.UI.PureDesktop
        {
            internal InternalDesktop() : this(false)
            {

            }

            internal InternalDesktop(bool begin)
            {
                objects.Add(new InternalDesktop.OblectLabel0("Trading", this));
                objects.Add(new InternalDesktop.OblectLabel1("Current Position", this));
                objects.Add(new InternalDesktop.OblectLabel2("Average Short", this));
                objects.Add(new InternalDesktop.OblectLabel3("Averge Long", this));
                objects.Add(new InternalDesktop.OblectLabel4("Condition 1", this));
                objects.Add(new InternalDesktop.OblectLabel5("Donchian maximum long", this));
                objects.Add(new InternalDesktop.OblectLabel6("Donchian maximum short", this));
                objects.Add(new InternalDesktop.OblectLabel7("Donchian minimum long", this));
                objects.Add(new InternalDesktop.OblectLabel8("Donchian minimum short", this));
                objects.Add(new InternalDesktop.OblectLabel9("Long conditions", this));
                objects.Add(new InternalDesktop.OblectLabel10("Short conditions", this));
                objects.Add(new InternalDesktop.OblectLabel11("Enter Exit Short", this));
                objects.Add(new InternalDesktop.OblectLabel12("Enter Exit Long", this));
                objects.Add(new InternalDesktop.OblectLabel13("Exit Condition", this));
                objects.Add(new InternalDesktop.OblectLabel14("Position", this));
                objects.Add(new InternalDesktop.OblectLabel15("Indicator", this));
                objects.Add(new InternalDesktop.OblectLabel16("Order", this));
                Diagram.UI.Labels.PureArrowLabel currALabel = null;
                currALabel = new InternalDesktop.ArrowLabel0("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)2;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel1("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)3;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel2("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)4;
                currALabel.TargetNumber = (int)3;
                currALabel = new InternalDesktop.ArrowLabel3("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)4;
                currALabel.TargetNumber = (int)2;
                currALabel = new InternalDesktop.ArrowLabel4("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)5;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel5("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)6;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel6("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)7;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel7("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)8;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel8("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)9;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel9("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)9;
                currALabel.TargetNumber = (int)5;
                currALabel = new InternalDesktop.ArrowLabel10("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)9;
                currALabel.TargetNumber = (int)8;
                currALabel = new InternalDesktop.ArrowLabel11("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)10;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel12("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)10;
                currALabel.TargetNumber = (int)5;
                currALabel = new InternalDesktop.ArrowLabel13("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)10;
                currALabel.TargetNumber = (int)7;
                currALabel = new InternalDesktop.ArrowLabel14("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)14;
                currALabel.TargetNumber = (int)1;
                currALabel = new InternalDesktop.ArrowLabel15("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)14;
                currALabel.TargetNumber = (int)4;
                currALabel = new InternalDesktop.ArrowLabel16("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)15;
                currALabel.TargetNumber = (int)14;
                currALabel = new InternalDesktop.ArrowLabel17("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)11;
                currALabel.TargetNumber = (int)4;
                currALabel = new InternalDesktop.ArrowLabel18("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)11;
                currALabel.TargetNumber = (int)10;
                currALabel = new InternalDesktop.ArrowLabel19("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)11;
                currALabel.TargetNumber = (int)1;
                currALabel = new InternalDesktop.ArrowLabel20("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)12;
                currALabel.TargetNumber = (int)4;
                currALabel = new InternalDesktop.ArrowLabel21("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)12;
                currALabel.TargetNumber = (int)1;
                currALabel = new InternalDesktop.ArrowLabel22("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)12;
                currALabel.TargetNumber = (int)9;
                currALabel = new InternalDesktop.ArrowLabel23("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)14;
                currALabel.TargetNumber = (int)11;
                currALabel = new InternalDesktop.ArrowLabel24("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)14;
                currALabel.TargetNumber = (int)12;
                currALabel = new InternalDesktop.ArrowLabel25("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel26("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)14;
                currALabel = new InternalDesktop.ArrowLabel27("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)0;
                currALabel = new InternalDesktop.ArrowLabel28("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)2;
                currALabel = new InternalDesktop.ArrowLabel29("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)3;
                currALabel = new InternalDesktop.ArrowLabel30("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)8;
                currALabel = new InternalDesktop.ArrowLabel31("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)6;
                currALabel = new InternalDesktop.ArrowLabel32("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)15;
                currALabel.TargetNumber = (int)11;
                currALabel = new InternalDesktop.ArrowLabel33("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)4;
                currALabel = new InternalDesktop.ArrowLabel34("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)15;
                currALabel.TargetNumber = (int)9;
                currALabel = new InternalDesktop.ArrowLabel35("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)15;
                currALabel.TargetNumber = (int)12;
                currALabel = new InternalDesktop.ArrowLabel36("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)15;
                currALabel = new InternalDesktop.ArrowLabel37("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)13;
                currALabel.TargetNumber = (int)11;
                currALabel = new InternalDesktop.ArrowLabel38("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)13;
                currALabel.TargetNumber = (int)12;
                currALabel = new InternalDesktop.ArrowLabel39("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)14;
                currALabel.TargetNumber = (int)13;
                currALabel = new InternalDesktop.ArrowLabel40("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)13;
                currALabel = new InternalDesktop.ArrowLabel41("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)9;
                currALabel = new InternalDesktop.ArrowLabel42("", this);
                arrows.Add(currALabel);
                currALabel.SourceNumber = (int)16;
                currALabel.TargetNumber = (int)10;
                if (!begin) { SuccessLoad = Final(); }
                ;
                Name = "Donchian";
            }

            internal class OblectLabel0 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel0(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel0.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : Trading.Library.Objects.DataQuery
                {

                    internal CategoryObject()
                    {
                        Object = new Guid("34f44a39-a8ad-46b7-9c7c-4527ad1ce959");
                        Period = "1 day";
                        Begin = System.DateTime.FromBinary(637769376000000000);
                        End = System.DateTime.FromBinary(638423424000000000);
                    }
                }
            }

            internal class OblectLabel1 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel1(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel1.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Formula.Recursive, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
                {

                    internal CategoryObject()
                    {
                        proxyFactory = this;
                        vars = new Dictionary<object, object>()
                        {
                            {'y', new object[] {(System.Double)(0),"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"t\" S=\"t\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",(System.Double)(0)}}
                            ,{'x', new object[] {(System.Double)(0),"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"y\" S=\"y\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",(System.Double)(0)}}
                        };

                        aliases = new Dictionary<object, object>()
                        {
                            {'t', (System.Double)(0)}
                        };

                        externalAls = new Dictionary<object, object>()
                        {
                        };

                        pars = new Dictionary<object, object>()
                        {
                        };

                    }

                    FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
                    {
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new(this);
                        FormulaEditor.Interfaces.ITreeCollection f = this;
                        FormulaEditor.ObjectFormulaTree[] trees = FormulaEditor.StaticExtensionFormulaEditor.Transform(f.Trees);
                        return new Calculation(trees, checkValue, dataPerformerFormula);
                    }

                    internal class Calculation : FormulaEditor.Interfaces.ITreeCollectionProxy
                    {
                        public bool Success { get => success; }

                        public void Update()
                        {
                            success = true;
                            variable = measurement0.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_0 = (double)variable;
                            variable = aliasName1.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_1 = (double)variable;
                        }

                        internal Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
                        {
                            success = true;
                            this.trees = trees;
                            this.checkValue = checkValue;
                            this.dataPerformerFormula = dataPerformerFormula;
                            measurement0 = dataPerformerFormula.ToMeasurement(trees[0]);
                            aliasName1 = dataPerformerFormula.ToAliasName(trees[1]);
                            dictionary[trees[0]] = Get_0;
                            dictionary[trees[1]] = Get_1;
                        }

                        public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
                        { get { return dictionary[tree]; } }

                        Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>> dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>>();

                        DataPerformer.Interfaces.IMeasurement measurement0;
                        Diagram.UI.Interfaces.IAliasName aliasName1;
                        FormulaEditor.ObjectFormulaTree currentTree = null;
                        object[] currentArray = null;
                        double doubleValue = 0;
                        FormulaEditor.ObjectFormulaTree[] trees = null;
                        double var_0 = 0;
                        double var_1 = 0;

                        object Get_0()
                        {
                            return success ? var_0 : null;
                        }

                        object Get_1()
                        {
                            return success ? var_1 : null;
                        }

                        Func<object, bool> checkValue = (o) => false;
                        object variable;
                        bool success = true;
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;

                    }
                }
            }

            internal class OblectLabel2 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel2(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel2.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Portable.FilterWrapper
                {

                    internal CategoryObject() : base(false)
                    {
                        kind = 0;
                        Input = "Trading.Close";
                        SetFilter();
                        filter.Count = 1;
                    }
                }
            }

            internal class OblectLabel3 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel3(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel3.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Portable.FilterWrapper
                {

                    internal CategoryObject() : base(false)
                    {
                        kind = 0;
                        Input = "Trading.Close";
                        SetFilter();
                        filter.Count = 1;
                    }
                }
            }

            internal class OblectLabel4 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel4(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel4.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Formula.VectorFormulaConsumer, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
                {

                    internal CategoryObject()
                    {
                        proxyFactory = this;
                        feedback = new Dictionary<int, string>()
                        {
                        };

                        formulaString = new string[]
                        {
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&gt;\" S=\"&gt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"y\" S=\"y\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&gt;\" S=\"&gt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"y\" S=\"y\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>"
                        };
                        isSerialized = true;
                        calculateDerivation = false;
                        deriOrder = 0;
                        arguments = new List<string>()
                        {
                            "y = Averge Long.Output",
                            "x = Average Short.Output"
                        };
                        parameters = new Dictionary<string, object>()
                        {
                            {"b", (double)90 },
                            {"a", (double)120 }
                        };
                        operationNames = new Dictionary<System.Int32, System.String>()
                        {
                        };
                        Init();
                    }

                    FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
                    {
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new(this);
                        FormulaEditor.Interfaces.ITreeCollection f = this;
                        var t =
                            FormulaEditor.ObjectFormulaTree.CreateList(f.Trees, new List<FormulaEditor.ObjectFormulaTree>());
                        var tt = t.ToArray();
                        return new Calculation(tt, checkValue, dataPerformerFormula);
                    }

                    internal class Calculation : FormulaEditor.Interfaces.ITreeCollectionProxy
                    {
                        public bool Success { get => success; }

                        public void Update()
                        {
                            success = true;
                            variable = measurement0.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_0 = (double)variable;
                            variable = measurement1.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_1 = (double)variable;
                            var_2 = (var_0) > (var_1);
                            var_3 = (var_0) > (var_1);
                            variable = aliasName4.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_4 = (double)variable;
                            variable = aliasName5.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_5 = (double)variable;
                            var_6 = (var_3) ? (var_4) : (var_5);
                        }

                        internal Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
                        {
                            success = true;
                            this.trees = trees;
                            this.checkValue = checkValue;
                            this.dataPerformerFormula = dataPerformerFormula;
                            measurement0 = dataPerformerFormula.ToMeasurement(trees[0]);
                            measurement1 = dataPerformerFormula.ToMeasurement(trees[1]);
                            aliasName4 = dataPerformerFormula.ToAliasName(trees[4]);
                            aliasName5 = dataPerformerFormula.ToAliasName(trees[5]);
                            dictionary[trees[0]] = Get_0;
                            dictionary[trees[1]] = Get_1;
                            dictionary[trees[2]] = Get_2;
                            dictionary[trees[3]] = Get_3;
                            dictionary[trees[4]] = Get_4;
                            dictionary[trees[5]] = Get_5;
                            dictionary[trees[6]] = Get_6;
                        }

                        public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
                        { get { return dictionary[tree]; } }

                        Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>> dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>>();

                        DataPerformer.Interfaces.IMeasurement measurement0;
                        DataPerformer.Interfaces.IMeasurement measurement1;
                        Diagram.UI.Interfaces.IAliasName aliasName4;
                        Diagram.UI.Interfaces.IAliasName aliasName5;
                        FormulaEditor.ObjectFormulaTree currentTree = null;
                        object[] currentArray = null;
                        double doubleValue = 0;
                        FormulaEditor.ObjectFormulaTree[] trees = null;
                        double var_0 = 0;
                        double var_1 = 0;
                        bool var_2 = false;
                        bool var_3 = false;
                        double var_4 = 0;
                        double var_5 = 0;
                        double var_6 = 0;

                        object Get_0()
                        {
                            return success ? var_0 : null;
                        }

                        object Get_1()
                        {
                            return success ? var_1 : null;
                        }

                        object Get_2()
                        {
                            return success ? var_2 : null;
                        }

                        object Get_3()
                        {
                            return success ? var_3 : null;
                        }

                        object Get_4()
                        {
                            return success ? var_4 : null;
                        }

                        object Get_5()
                        {
                            return success ? var_5 : null;
                        }

                        object Get_6()
                        {
                            return success ? var_6 : null;
                        }

                        Func<object, bool> checkValue = (o) => false;
                        object variable;
                        bool success = true;
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;

                    }
                }
            }

            internal class OblectLabel5 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel5(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel5.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Portable.FilterWrapper
                {

                    internal CategoryObject() : base(false)
                    {
                        kind = 1;
                        Input = "Trading.High";
                        SetFilter();
                        filter.Count = 1;
                    }
                }
            }

            internal class OblectLabel6 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel6(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel6.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Portable.FilterWrapper
                {

                    internal CategoryObject() : base(false)
                    {
                        kind = 1;
                        Input = "Trading.High";
                        SetFilter();
                        filter.Count = 1;
                    }
                }
            }

            internal class OblectLabel7 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel7(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel7.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Portable.FilterWrapper
                {

                    internal CategoryObject() : base(false)
                    {
                        kind = 2;
                        Input = "Trading.Low";
                        SetFilter();
                        filter.Count = 1;
                    }
                }
            }

            internal class OblectLabel8 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel8(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel8.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Portable.FilterWrapper
                {

                    internal CategoryObject() : base(false)
                    {
                        kind = 2;
                        Input = "Trading.Low";
                        SetFilter();
                        filter.Count = 1;
                    }
                }
            }

            internal class OblectLabel9 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel9(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel9.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Formula.VectorFormulaConsumer, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
                {

                    internal CategoryObject()
                    {
                        proxyFactory = this;
                        feedback = new Dictionary<int, string>()
                        {
                        };

                        formulaString = new string[]
                        {
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&lt;\" S=\"&lt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"l\" S=\"l\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&gt;\" S=\"&gt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"h\" S=\"h\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&lt;\" S=\"&lt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"l\" S=\"l\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&gt;\" S=\"&gt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"h\" S=\"h\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>"
                        };
                        isSerialized = true;
                        calculateDerivation = false;
                        deriOrder = 0;
                        arguments = new List<string>()
                        {
                            "x = Trading.Close",
                            "h = Donchian maximum long.Output",
                            "l = Donchian minimum short.Output"
                        };
                        parameters = new Dictionary<string, object>()
                        {
                            {"b", (double)115 },
                            {"a", (double)140 }
                        };
                        operationNames = new Dictionary<System.Int32, System.String>()
                        {
                        };
                        Init();
                    }

                    FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
                    {
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new(this);
                        FormulaEditor.Interfaces.ITreeCollection f = this;
                        var t =
                            FormulaEditor.ObjectFormulaTree.CreateList(f.Trees, new List<FormulaEditor.ObjectFormulaTree>());
                        var tt = t.ToArray();
                        return new Calculation(tt, checkValue, dataPerformerFormula);
                    }

                    internal class Calculation : FormulaEditor.Interfaces.ITreeCollectionProxy
                    {
                        public bool Success { get => success; }

                        public void Update()
                        {
                            success = true;
                            variable = measurement0.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_0 = (double)variable;
                            variable = measurement1.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_1 = (double)variable;
                            var_2 = (var_0) < (var_1);
                            variable = measurement3.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_3 = (double)variable;
                            var_4 = (var_0) > (var_3);
                            var_5 = (var_0) < (var_1);
                            variable = aliasName6.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_6 = (double)variable;
                            variable = aliasName7.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_7 = (double)variable;
                            var_8 = (var_5) ? (var_6) : (var_7);
                            var_9 = (var_0) > (var_3);
                            var_10 = (var_9) ? (var_6) : (var_7);
                        }

                        internal Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
                        {
                            success = true;
                            this.trees = trees;
                            this.checkValue = checkValue;
                            this.dataPerformerFormula = dataPerformerFormula;
                            measurement0 = dataPerformerFormula.ToMeasurement(trees[0]);
                            measurement1 = dataPerformerFormula.ToMeasurement(trees[1]);
                            measurement3 = dataPerformerFormula.ToMeasurement(trees[3]);
                            aliasName6 = dataPerformerFormula.ToAliasName(trees[6]);
                            aliasName7 = dataPerformerFormula.ToAliasName(trees[7]);
                            dictionary[trees[0]] = Get_0;
                            dictionary[trees[1]] = Get_1;
                            dictionary[trees[2]] = Get_2;
                            dictionary[trees[3]] = Get_3;
                            dictionary[trees[4]] = Get_4;
                            dictionary[trees[5]] = Get_5;
                            dictionary[trees[6]] = Get_6;
                            dictionary[trees[7]] = Get_7;
                            dictionary[trees[8]] = Get_8;
                            dictionary[trees[9]] = Get_9;
                            dictionary[trees[10]] = Get_10;
                        }

                        public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
                        { get { return dictionary[tree]; } }

                        Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>> dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>>();

                        DataPerformer.Interfaces.IMeasurement measurement0;
                        DataPerformer.Interfaces.IMeasurement measurement1;
                        DataPerformer.Interfaces.IMeasurement measurement3;
                        Diagram.UI.Interfaces.IAliasName aliasName6;
                        Diagram.UI.Interfaces.IAliasName aliasName7;
                        FormulaEditor.ObjectFormulaTree currentTree = null;
                        object[] currentArray = null;
                        double doubleValue = 0;
                        FormulaEditor.ObjectFormulaTree[] trees = null;
                        double var_0 = 0;
                        double var_1 = 0;
                        bool var_2 = false;
                        double var_3 = 0;
                        bool var_4 = false;
                        bool var_5 = false;
                        double var_6 = 0;
                        double var_7 = 0;
                        double var_8 = 0;
                        bool var_9 = false;
                        double var_10 = 0;

                        object Get_0()
                        {
                            return success ? var_0 : null;
                        }

                        object Get_1()
                        {
                            return success ? var_1 : null;
                        }

                        object Get_2()
                        {
                            return success ? var_2 : null;
                        }

                        object Get_3()
                        {
                            return success ? var_3 : null;
                        }

                        object Get_4()
                        {
                            return success ? var_4 : null;
                        }

                        object Get_5()
                        {
                            return success ? var_5 : null;
                        }

                        object Get_6()
                        {
                            return success ? var_6 : null;
                        }

                        object Get_7()
                        {
                            return success ? var_7 : null;
                        }

                        object Get_8()
                        {
                            return success ? var_8 : null;
                        }

                        object Get_9()
                        {
                            return success ? var_9 : null;
                        }

                        object Get_10()
                        {
                            return success ? var_10 : null;
                        }

                        Func<object, bool> checkValue = (o) => false;
                        object variable;
                        bool success = true;
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;

                    }
                }
            }

            internal class OblectLabel10 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel10(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel10.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Formula.VectorFormulaConsumer, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
                {

                    internal CategoryObject()
                    {
                        proxyFactory = this;
                        feedback = new Dictionary<int, string>()
                        {
                        };

                        formulaString = new string[]
                        {
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&lt;\" S=\"&lt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"l\" S=\"l\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&gt;\" S=\"&gt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"h\" S=\"h\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&lt;\" S=\"&lt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"l\" S=\"l\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"&gt;\" S=\"&gt;\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"h\" S=\"h\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>"
                        };
                        isSerialized = true;
                        calculateDerivation = false;
                        deriOrder = 0;
                        arguments = new List<string>()
                        {
                            "x = Trading.Close",
                            "h = Donchian maximum long.Output",
                            "l = Donchian minimum long.Output"
                        };
                        parameters = new Dictionary<string, object>()
                        {
                            {"b", (double)125 },
                            {"a", (double)145 }
                        };
                        operationNames = new Dictionary<System.Int32, System.String>()
                        {
                        };
                        Init();
                    }

                    FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
                    {
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new(this);
                        FormulaEditor.Interfaces.ITreeCollection f = this;
                        var t =
                            FormulaEditor.ObjectFormulaTree.CreateList(f.Trees, new List<FormulaEditor.ObjectFormulaTree>());
                        var tt = t.ToArray();
                        return new Calculation(tt, checkValue, dataPerformerFormula);
                    }

                    internal class Calculation : FormulaEditor.Interfaces.ITreeCollectionProxy
                    {
                        public bool Success { get => success; }

                        public void Update()
                        {
                            success = true;
                            variable = measurement0.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_0 = (double)variable;
                            variable = measurement1.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_1 = (double)variable;
                            var_2 = (var_0) < (var_1);
                            variable = measurement3.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_3 = (double)variable;
                            var_4 = (var_0) > (var_3);
                            var_5 = (var_0) < (var_1);
                            variable = aliasName6.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_6 = (double)variable;
                            variable = aliasName7.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_7 = (double)variable;
                            var_8 = (var_5) ? (var_6) : (var_7);
                            var_9 = (var_0) > (var_3);
                            var_10 = (var_9) ? (var_6) : (var_7);
                        }

                        internal Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
                        {
                            success = true;
                            this.trees = trees;
                            this.checkValue = checkValue;
                            this.dataPerformerFormula = dataPerformerFormula;
                            measurement0 = dataPerformerFormula.ToMeasurement(trees[0]);
                            measurement1 = dataPerformerFormula.ToMeasurement(trees[1]);
                            measurement3 = dataPerformerFormula.ToMeasurement(trees[3]);
                            aliasName6 = dataPerformerFormula.ToAliasName(trees[6]);
                            aliasName7 = dataPerformerFormula.ToAliasName(trees[7]);
                            dictionary[trees[0]] = Get_0;
                            dictionary[trees[1]] = Get_1;
                            dictionary[trees[2]] = Get_2;
                            dictionary[trees[3]] = Get_3;
                            dictionary[trees[4]] = Get_4;
                            dictionary[trees[5]] = Get_5;
                            dictionary[trees[6]] = Get_6;
                            dictionary[trees[7]] = Get_7;
                            dictionary[trees[8]] = Get_8;
                            dictionary[trees[9]] = Get_9;
                            dictionary[trees[10]] = Get_10;
                        }

                        public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
                        { get { return dictionary[tree]; } }

                        Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>> dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>>();

                        DataPerformer.Interfaces.IMeasurement measurement0;
                        DataPerformer.Interfaces.IMeasurement measurement1;
                        DataPerformer.Interfaces.IMeasurement measurement3;
                        Diagram.UI.Interfaces.IAliasName aliasName6;
                        Diagram.UI.Interfaces.IAliasName aliasName7;
                        FormulaEditor.ObjectFormulaTree currentTree = null;
                        object[] currentArray = null;
                        double doubleValue = 0;
                        FormulaEditor.ObjectFormulaTree[] trees = null;
                        double var_0 = 0;
                        double var_1 = 0;
                        bool var_2 = false;
                        double var_3 = 0;
                        bool var_4 = false;
                        bool var_5 = false;
                        double var_6 = 0;
                        double var_7 = 0;
                        double var_8 = 0;
                        bool var_9 = false;
                        double var_10 = 0;

                        object Get_0()
                        {
                            return success ? var_0 : null;
                        }

                        object Get_1()
                        {
                            return success ? var_1 : null;
                        }

                        object Get_2()
                        {
                            return success ? var_2 : null;
                        }

                        object Get_3()
                        {
                            return success ? var_3 : null;
                        }

                        object Get_4()
                        {
                            return success ? var_4 : null;
                        }

                        object Get_5()
                        {
                            return success ? var_5 : null;
                        }

                        object Get_6()
                        {
                            return success ? var_6 : null;
                        }

                        object Get_7()
                        {
                            return success ? var_7 : null;
                        }

                        object Get_8()
                        {
                            return success ? var_8 : null;
                        }

                        object Get_9()
                        {
                            return success ? var_9 : null;
                        }

                        object Get_10()
                        {
                            return success ? var_10 : null;
                        }

                        Func<object, bool> checkValue = (o) => false;
                        object variable;
                        bool success = true;
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;

                    }
                }
            }

            internal class OblectLabel11 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel11(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel11.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Formula.VectorFormulaConsumer, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
                {

                    internal CategoryObject()
                    {
                        proxyFactory = this;
                        feedback = new Dictionary<int, string>()
                        {
                        };

                        formulaString = new string[]
                        {
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"=\" S=\"=\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"0\" S=\"0\" Type=\"5\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∖\" S=\"AND\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"y\" S=\"y\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∖\" S=\"AND\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"i\" S=\"i\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"=\" S=\"=\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"1\" S=\"1\" Type=\"5\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∖\" S=\"AND\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"¬\" S=\"¬\" Type=\"4\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"y\" S=\"y\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∖\" S=\"AND\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"j\" S=\"j\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>"
                        };
                        isSerialized = true;
                        calculateDerivation = false;
                        deriOrder = 0;
                        arguments = new List<string>()
                        {
                            "y = Condition 1.Formula_1",
                            "i = Short conditions.Formula_1",
                            "j = Short conditions.Formula_2",
                            "x = Current Position.x"
                        };
                        parameters = new Dictionary<string, object>()
                        {
                        };
                        operationNames = new Dictionary<System.Int32, System.String>()
                        {
                        };
                        Init();
                    }

                    FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
                    {
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new(this);
                        FormulaEditor.Interfaces.ITreeCollection f = this;
                        var t =
                            FormulaEditor.ObjectFormulaTree.CreateList(f.Trees, new List<FormulaEditor.ObjectFormulaTree>());
                        var tt = t.ToArray();
                        return new Calculation(tt, checkValue, dataPerformerFormula);
                    }

                    internal class Calculation : FormulaEditor.Interfaces.ITreeCollectionProxy
                    {
                        public bool Success { get => success; }

                        public void Update()
                        {
                            success = true;
                            variable = measurement0.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_0 = (double)variable;
                            var_2 = (var_0).Equals(var_1);
                            variable = measurement3.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_3 = (bool)variable;
                            var_4 = (var_2) & (var_3);
                            variable = measurement5.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_5 = (bool)variable;
                            var_6 = (var_4) & (var_5);
                            var_8 = (var_0).Equals(var_7);
                            var_9 = !var_3;
                            var_10 = (var_8) & (var_9);
                            variable = measurement11.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_11 = (bool)variable;
                            var_12 = (var_10) & (var_11);
                        }

                        internal Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
                        {
                            success = true;
                            this.trees = trees;
                            this.checkValue = checkValue;
                            this.dataPerformerFormula = dataPerformerFormula;
                            measurement0 = dataPerformerFormula.ToMeasurement(trees[0]);
                            measurement3 = dataPerformerFormula.ToMeasurement(trees[3]);
                            measurement5 = dataPerformerFormula.ToMeasurement(trees[5]);
                            measurement11 = dataPerformerFormula.ToMeasurement(trees[11]);
                            dictionary[trees[0]] = Get_0;
                            dictionary[trees[1]] = Get_1;
                            dictionary[trees[2]] = Get_2;
                            dictionary[trees[3]] = Get_3;
                            dictionary[trees[4]] = Get_4;
                            dictionary[trees[5]] = Get_5;
                            dictionary[trees[6]] = Get_6;
                            dictionary[trees[7]] = Get_7;
                            dictionary[trees[8]] = Get_8;
                            dictionary[trees[9]] = Get_9;
                            dictionary[trees[10]] = Get_10;
                            dictionary[trees[11]] = Get_11;
                            dictionary[trees[12]] = Get_12;
                        }

                        public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
                        { get { return dictionary[tree]; } }

                        Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>> dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>>();

                        DataPerformer.Interfaces.IMeasurement measurement0;
                        DataPerformer.Interfaces.IMeasurement measurement3;
                        DataPerformer.Interfaces.IMeasurement measurement5;
                        DataPerformer.Interfaces.IMeasurement measurement11;
                        FormulaEditor.ObjectFormulaTree currentTree = null;
                        object[] currentArray = null;
                        double doubleValue = 0;
                        FormulaEditor.ObjectFormulaTree[] trees = null;
                        double var_0 = 0;
                        double var_1 = 0;
                        bool var_2 = false;
                        bool var_3 = false;
                        bool var_4 = false;
                        bool var_5 = false;
                        bool var_6 = false;
                        double var_7 = 1;
                        bool var_8 = false;
                        bool var_9 = false;
                        bool var_10 = false;
                        bool var_11 = false;
                        bool var_12 = false;

                        object Get_0()
                        {
                            return success ? var_0 : null;
                        }

                        object Get_1()
                        {
                            return success ? var_1 : null;
                        }

                        object Get_2()
                        {
                            return success ? var_2 : null;
                        }

                        object Get_3()
                        {
                            return success ? var_3 : null;
                        }

                        object Get_4()
                        {
                            return success ? var_4 : null;
                        }

                        object Get_5()
                        {
                            return success ? var_5 : null;
                        }

                        object Get_6()
                        {
                            return success ? var_6 : null;
                        }

                        object Get_7()
                        {
                            return success ? var_7 : null;
                        }

                        object Get_8()
                        {
                            return success ? var_8 : null;
                        }

                        object Get_9()
                        {
                            return success ? var_9 : null;
                        }

                        object Get_10()
                        {
                            return success ? var_10 : null;
                        }

                        object Get_11()
                        {
                            return success ? var_11 : null;
                        }

                        object Get_12()
                        {
                            return success ? var_12 : null;
                        }

                        Func<object, bool> checkValue = (o) => false;
                        object variable;
                        bool success = true;
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;

                    }
                }
            }

            internal class OblectLabel12 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel12(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel12.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Formula.VectorFormulaConsumer, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
                {

                    internal CategoryObject()
                    {
                        proxyFactory = this;
                        feedback = new Dictionary<int, string>()
                        {
                        };

                        formulaString = new string[]
                        {
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"=\" S=\"=\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"0\" S=\"0\" Type=\"5\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∖\" S=\"AND\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"¬\" S=\"¬\" Type=\"4\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"y\" S=\"y\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∖\" S=\"AND\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"i\" S=\"i\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"=\" S=\"=\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"2\" S=\"2\" Type=\"5\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∖\" S=\"AND\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"y\" S=\"y\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∖\" S=\"AND\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"j\" S=\"j\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>"
                        };
                        isSerialized = true;
                        calculateDerivation = false;
                        deriOrder = 0;
                        arguments = new List<string>()
                        {
                            "y = Condition 1.Formula_1",
                            "x = Current Position.x",
                            "i = Long conditions.Formula_1",
                            "j = Long conditions.Formula_2"
                        };
                        parameters = new Dictionary<string, object>()
                        {
                        };
                        operationNames = new Dictionary<System.Int32, System.String>()
                        {
                        };
                        Init();
                    }

                    FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
                    {
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new(this);
                        FormulaEditor.Interfaces.ITreeCollection f = this;
                        var t =
                            FormulaEditor.ObjectFormulaTree.CreateList(f.Trees, new List<FormulaEditor.ObjectFormulaTree>());
                        var tt = t.ToArray();
                        return new Calculation(tt, checkValue, dataPerformerFormula);
                    }

                    internal class Calculation : FormulaEditor.Interfaces.ITreeCollectionProxy
                    {
                        public bool Success { get => success; }

                        public void Update()
                        {
                            success = true;
                            variable = measurement0.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_0 = (double)variable;
                            var_2 = (var_0).Equals(var_1);
                            variable = measurement3.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_3 = (bool)variable;
                            var_4 = !var_3;
                            var_5 = (var_2) & (var_4);
                            variable = measurement6.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_6 = (bool)variable;
                            var_7 = (var_5) & (var_6);
                            var_9 = (var_0).Equals(var_8);
                            var_10 = (var_9) & (var_3);
                            variable = measurement11.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_11 = (bool)variable;
                            var_12 = (var_10) & (var_11);
                        }

                        internal Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
                        {
                            success = true;
                            this.trees = trees;
                            this.checkValue = checkValue;
                            this.dataPerformerFormula = dataPerformerFormula;
                            measurement0 = dataPerformerFormula.ToMeasurement(trees[0]);
                            measurement3 = dataPerformerFormula.ToMeasurement(trees[3]);
                            measurement6 = dataPerformerFormula.ToMeasurement(trees[6]);
                            measurement11 = dataPerformerFormula.ToMeasurement(trees[11]);
                            dictionary[trees[0]] = Get_0;
                            dictionary[trees[1]] = Get_1;
                            dictionary[trees[2]] = Get_2;
                            dictionary[trees[3]] = Get_3;
                            dictionary[trees[4]] = Get_4;
                            dictionary[trees[5]] = Get_5;
                            dictionary[trees[6]] = Get_6;
                            dictionary[trees[7]] = Get_7;
                            dictionary[trees[8]] = Get_8;
                            dictionary[trees[9]] = Get_9;
                            dictionary[trees[10]] = Get_10;
                            dictionary[trees[11]] = Get_11;
                            dictionary[trees[12]] = Get_12;
                        }

                        public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
                        { get { return dictionary[tree]; } }

                        Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>> dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>>();

                        DataPerformer.Interfaces.IMeasurement measurement0;
                        DataPerformer.Interfaces.IMeasurement measurement3;
                        DataPerformer.Interfaces.IMeasurement measurement6;
                        DataPerformer.Interfaces.IMeasurement measurement11;
                        FormulaEditor.ObjectFormulaTree currentTree = null;
                        object[] currentArray = null;
                        double doubleValue = 0;
                        FormulaEditor.ObjectFormulaTree[] trees = null;
                        double var_0 = 0;
                        double var_1 = 0;
                        bool var_2 = false;
                        bool var_3 = false;
                        bool var_4 = false;
                        bool var_5 = false;
                        bool var_6 = false;
                        bool var_7 = false;
                        double var_8 = 2;
                        bool var_9 = false;
                        bool var_10 = false;
                        bool var_11 = false;
                        bool var_12 = false;

                        object Get_0()
                        {
                            return success ? var_0 : null;
                        }

                        object Get_1()
                        {
                            return success ? var_1 : null;
                        }

                        object Get_2()
                        {
                            return success ? var_2 : null;
                        }

                        object Get_3()
                        {
                            return success ? var_3 : null;
                        }

                        object Get_4()
                        {
                            return success ? var_4 : null;
                        }

                        object Get_5()
                        {
                            return success ? var_5 : null;
                        }

                        object Get_6()
                        {
                            return success ? var_6 : null;
                        }

                        object Get_7()
                        {
                            return success ? var_7 : null;
                        }

                        object Get_8()
                        {
                            return success ? var_8 : null;
                        }

                        object Get_9()
                        {
                            return success ? var_9 : null;
                        }

                        object Get_10()
                        {
                            return success ? var_10 : null;
                        }

                        object Get_11()
                        {
                            return success ? var_11 : null;
                        }

                        object Get_12()
                        {
                            return success ? var_12 : null;
                        }

                        Func<object, bool> checkValue = (o) => false;
                        object variable;
                        bool success = true;
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;

                    }
                }
            }

            internal class OblectLabel13 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel13(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel13.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Formula.VectorFormulaConsumer, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
                {

                    internal CategoryObject()
                    {
                        proxyFactory = this;
                        feedback = new Dictionary<int, string>()
                        {
                        };

                        formulaString = new string[]
                        {
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∗\" S=\"OR\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"∗\" S=\"OR\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"c\" S=\"c\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"d\" S=\"d\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>"
                        };
                        isSerialized = true;
                        calculateDerivation = false;
                        deriOrder = 0;
                        arguments = new List<string>()
                        {
                            "a = Enter Exit Short.Formula_2",
                            "b = Enter Exit Long.Formula_2"
                        };
                        parameters = new Dictionary<string, object>()
                        {
                            {"c", (double)145 },
                            {"d", (double)135 }
                        };
                        operationNames = new Dictionary<System.Int32, System.String>()
                        {
                        };
                        Init();
                    }

                    FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
                    {
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new(this);
                        FormulaEditor.Interfaces.ITreeCollection f = this;
                        var t =
                            FormulaEditor.ObjectFormulaTree.CreateList(f.Trees, new List<FormulaEditor.ObjectFormulaTree>());
                        var tt = t.ToArray();
                        return new Calculation(tt, checkValue, dataPerformerFormula);
                    }

                    internal class Calculation : FormulaEditor.Interfaces.ITreeCollectionProxy
                    {
                        public bool Success { get => success; }

                        public void Update()
                        {
                            success = true;
                            variable = measurement0.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_0 = (bool)variable;
                            variable = measurement1.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_1 = (bool)variable;
                            var_2 = (var_0) | (var_1);
                            var_3 = (var_0) | (var_1);
                            variable = aliasName4.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_4 = (double)variable;
                            variable = aliasName5.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_5 = (double)variable;
                            var_6 = (var_3) ? (var_4) : (var_5);
                        }

                        internal Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
                        {
                            success = true;
                            this.trees = trees;
                            this.checkValue = checkValue;
                            this.dataPerformerFormula = dataPerformerFormula;
                            measurement0 = dataPerformerFormula.ToMeasurement(trees[0]);
                            measurement1 = dataPerformerFormula.ToMeasurement(trees[1]);
                            aliasName4 = dataPerformerFormula.ToAliasName(trees[4]);
                            aliasName5 = dataPerformerFormula.ToAliasName(trees[5]);
                            dictionary[trees[0]] = Get_0;
                            dictionary[trees[1]] = Get_1;
                            dictionary[trees[2]] = Get_2;
                            dictionary[trees[3]] = Get_3;
                            dictionary[trees[4]] = Get_4;
                            dictionary[trees[5]] = Get_5;
                            dictionary[trees[6]] = Get_6;
                        }

                        public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
                        { get { return dictionary[tree]; } }

                        Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>> dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>>();

                        DataPerformer.Interfaces.IMeasurement measurement0;
                        DataPerformer.Interfaces.IMeasurement measurement1;
                        Diagram.UI.Interfaces.IAliasName aliasName4;
                        Diagram.UI.Interfaces.IAliasName aliasName5;
                        FormulaEditor.ObjectFormulaTree currentTree = null;
                        object[] currentArray = null;
                        double doubleValue = 0;
                        FormulaEditor.ObjectFormulaTree[] trees = null;
                        bool var_0 = false;
                        bool var_1 = false;
                        bool var_2 = false;
                        bool var_3 = false;
                        double var_4 = 0;
                        double var_5 = 0;
                        double var_6 = 0;

                        object Get_0()
                        {
                            return success ? var_0 : null;
                        }

                        object Get_1()
                        {
                            return success ? var_1 : null;
                        }

                        object Get_2()
                        {
                            return success ? var_2 : null;
                        }

                        object Get_3()
                        {
                            return success ? var_3 : null;
                        }

                        object Get_4()
                        {
                            return success ? var_4 : null;
                        }

                        object Get_5()
                        {
                            return success ? var_5 : null;
                        }

                        object Get_6()
                        {
                            return success ? var_6 : null;
                        }

                        Func<object, bool> checkValue = (o) => false;
                        object variable;
                        bool success = true;
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;

                    }
                }
            }

            internal class OblectLabel14 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel14(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel14.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Formula.VectorFormulaConsumer, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
                {

                    internal CategoryObject()
                    {
                        proxyFactory = this;
                        feedback = new Dictionary<int, string>()
                        {
                            { 0,"Current Position.t" }
                        };

                        formulaString = new string[]
                        {
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"0\" S=\"0\" Type=\"5\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"c\" S=\"c\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"2\" S=\"2\" Type=\"5\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">          <F>            <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"d\" S=\"d\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">              <F />            </S>            <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />            <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"1\" S=\"1\" Type=\"5\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\">              <F />            </S>            <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />            <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">              <F />            </S>          </F>          <F />        </S>      </F>      <F />    </S>  </F></Root>"
                        };
                        isSerialized = true;
                        calculateDerivation = false;
                        deriOrder = 0;
                        arguments = new List<string>()
                        {
                            "x = Current Position.y",
                            "d = Enter Exit Short.Formula_1",
                            "c = Enter Exit Long.Formula_1",
                            "a = Exit Condition.Formula_1"
                        };
                        parameters = new Dictionary<string, object>()
                        {
                        };
                        operationNames = new Dictionary<System.Int32, System.String>()
                        {
                        };
                        Init();
                    }

                    FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
                    {
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new(this);
                        FormulaEditor.Interfaces.ITreeCollection f = this;
                        var t =
                            FormulaEditor.ObjectFormulaTree.CreateList(f.Trees, new List<FormulaEditor.ObjectFormulaTree>());
                        var tt = t.ToArray();
                        return new Calculation(tt, checkValue, dataPerformerFormula);
                    }

                    internal class Calculation : FormulaEditor.Interfaces.ITreeCollectionProxy
                    {
                        public bool Success { get => success; }

                        public void Update()
                        {
                            success = true;
                            variable = measurement0.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_0 = (bool)variable;
                            variable = measurement2.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_2 = (bool)variable;
                            variable = measurement4.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_4 = (bool)variable;
                            variable = measurement6.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_6 = (double)variable;
                            var_7 = (var_4) ? (var_5) : (var_6);
                            var_8 = (var_2) ? (var_3) : (var_7);
                            var_9 = (var_0) ? (var_1) : (var_8);
                        }

                        internal Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
                        {
                            success = true;
                            this.trees = trees;
                            this.checkValue = checkValue;
                            this.dataPerformerFormula = dataPerformerFormula;
                            measurement0 = dataPerformerFormula.ToMeasurement(trees[0]);
                            measurement2 = dataPerformerFormula.ToMeasurement(trees[2]);
                            measurement4 = dataPerformerFormula.ToMeasurement(trees[4]);
                            measurement6 = dataPerformerFormula.ToMeasurement(trees[6]);
                            dictionary[trees[0]] = Get_0;
                            dictionary[trees[1]] = Get_1;
                            dictionary[trees[2]] = Get_2;
                            dictionary[trees[3]] = Get_3;
                            dictionary[trees[4]] = Get_4;
                            dictionary[trees[5]] = Get_5;
                            dictionary[trees[6]] = Get_6;
                            dictionary[trees[7]] = Get_7;
                            dictionary[trees[8]] = Get_8;
                            dictionary[trees[9]] = Get_9;
                        }

                        public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
                        { get { return dictionary[tree]; } }

                        Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>> dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>>();

                        DataPerformer.Interfaces.IMeasurement measurement0;
                        DataPerformer.Interfaces.IMeasurement measurement2;
                        DataPerformer.Interfaces.IMeasurement measurement4;
                        DataPerformer.Interfaces.IMeasurement measurement6;
                        FormulaEditor.ObjectFormulaTree currentTree = null;
                        object[] currentArray = null;
                        double doubleValue = 0;
                        FormulaEditor.ObjectFormulaTree[] trees = null;
                        bool var_0 = false;
                        double var_1 = 0;
                        bool var_2 = false;
                        double var_3 = 2;
                        bool var_4 = false;
                        double var_5 = 1;
                        double var_6 = 0;
                        double var_7 = 0;
                        double var_8 = 0;
                        double var_9 = 0;

                        object Get_0()
                        {
                            return success ? var_0 : null;
                        }

                        object Get_1()
                        {
                            return success ? var_1 : null;
                        }

                        object Get_2()
                        {
                            return success ? var_2 : null;
                        }

                        object Get_3()
                        {
                            return success ? var_3 : null;
                        }

                        object Get_4()
                        {
                            return success ? var_4 : null;
                        }

                        object Get_5()
                        {
                            return success ? var_5 : null;
                        }

                        object Get_6()
                        {
                            return success ? var_6 : null;
                        }

                        object Get_7()
                        {
                            return success ? var_7 : null;
                        }

                        object Get_8()
                        {
                            return success ? var_8 : null;
                        }

                        object Get_9()
                        {
                            return success ? var_9 : null;
                        }

                        Func<object, bool> checkValue = (o) => false;
                        object variable;
                        bool success = true;
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;

                    }
                }
            }

            internal class OblectLabel15 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel15(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel15.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : DataPerformer.Formula.VectorFormulaConsumer, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
                {

                    internal CategoryObject()
                    {
                        proxyFactory = this;
                        feedback = new Dictionary<int, string>()
                        {
                        };

                        formulaString = new string[]
                        {
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"+\" S=\"+\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
                            "<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"k\" S=\"k\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"?\" S=\"?\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"c\" S=\"c\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\":\" S=\":\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"d\" S=\"d\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>"
                        };
                        isSerialized = true;
                        calculateDerivation = false;
                        deriOrder = 0;
                        arguments = new List<string>()
                        {
                            "x = Position.Formula_1",
                            "k = Enter Exit Long.Formula_1"
                        };
                        parameters = new Dictionary<string, object>()
                        {
                            {"d", (double)107 },
                            {"c", (double)129 },
                            {"b", (double)105 },
                            {"a", (double)20 }
                        };
                        operationNames = new Dictionary<System.Int32, System.String>()
                        {
                        };
                        Init();
                    }

                    FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
                    {
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new(this);
                        FormulaEditor.Interfaces.ITreeCollection f = this;
                        var t =
                            FormulaEditor.ObjectFormulaTree.CreateList(f.Trees, new List<FormulaEditor.ObjectFormulaTree>());
                        var tt = t.ToArray();
                        return new Calculation(tt, checkValue, dataPerformerFormula);
                    }

                    internal class Calculation : FormulaEditor.Interfaces.ITreeCollectionProxy
                    {
                        public bool Success { get => success; }

                        public void Update()
                        {
                            success = true;
                            variable = aliasName0.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_0 = (double)variable;
                            variable = measurement1.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_1 = (double)variable;
                            var_2 = (var_0) * (var_1);
                            variable = aliasName3.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_3 = (double)variable;
                            var_4 = (var_2) + (var_3);
                            variable = measurement5.Parameter();
                            if (checkValue(variable)) { success = false; return; }
                            var_5 = (bool)variable;
                            variable = aliasName6.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_6 = (double)variable;
                            variable = aliasName7.Value;
                            if (checkValue(variable)) { success = false; return; }
                            var_7 = (double)variable;
                            var_8 = (var_5) ? (var_6) : (var_7);
                        }

                        internal Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
                        {
                            success = true;
                            this.trees = trees;
                            this.checkValue = checkValue;
                            this.dataPerformerFormula = dataPerformerFormula;
                            aliasName0 = dataPerformerFormula.ToAliasName(trees[0]);
                            measurement1 = dataPerformerFormula.ToMeasurement(trees[1]);
                            aliasName3 = dataPerformerFormula.ToAliasName(trees[3]);
                            measurement5 = dataPerformerFormula.ToMeasurement(trees[5]);
                            aliasName6 = dataPerformerFormula.ToAliasName(trees[6]);
                            aliasName7 = dataPerformerFormula.ToAliasName(trees[7]);
                            dictionary[trees[0]] = Get_0;
                            dictionary[trees[1]] = Get_1;
                            dictionary[trees[2]] = Get_2;
                            dictionary[trees[3]] = Get_3;
                            dictionary[trees[4]] = Get_4;
                            dictionary[trees[5]] = Get_5;
                            dictionary[trees[6]] = Get_6;
                            dictionary[trees[7]] = Get_7;
                            dictionary[trees[8]] = Get_8;
                        }

                        public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
                        { get { return dictionary[tree]; } }

                        Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>> dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object>>();

                        Diagram.UI.Interfaces.IAliasName aliasName0;
                        DataPerformer.Interfaces.IMeasurement measurement1;
                        Diagram.UI.Interfaces.IAliasName aliasName3;
                        DataPerformer.Interfaces.IMeasurement measurement5;
                        Diagram.UI.Interfaces.IAliasName aliasName6;
                        Diagram.UI.Interfaces.IAliasName aliasName7;
                        FormulaEditor.ObjectFormulaTree currentTree = null;
                        object[] currentArray = null;
                        double doubleValue = 0;
                        FormulaEditor.ObjectFormulaTree[] trees = null;
                        double var_0 = 0;
                        double var_1 = 0;
                        double var_2 = 0;
                        double var_3 = 0;
                        double var_4 = 0;
                        bool var_5 = false;
                        double var_6 = 0;
                        double var_7 = 0;
                        double var_8 = 0;

                        object Get_0()
                        {
                            return success ? var_0 : null;
                        }

                        object Get_1()
                        {
                            return success ? var_1 : null;
                        }

                        object Get_2()
                        {
                            return success ? var_2 : null;
                        }

                        object Get_3()
                        {
                            return success ? var_3 : null;
                        }

                        object Get_4()
                        {
                            return success ? var_4 : null;
                        }

                        object Get_5()
                        {
                            return success ? var_5 : null;
                        }

                        object Get_6()
                        {
                            return success ? var_6 : null;
                        }

                        object Get_7()
                        {
                            return success ? var_7 : null;
                        }

                        object Get_8()
                        {
                            return success ? var_8 : null;
                        }

                        Func<object, bool> checkValue = (o) => false;
                        object variable;
                        bool success = true;
                        DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;

                    }
                }
            }

            internal class OblectLabel16 : Diagram.UI.Labels.PureObjectLabel
            {
                internal OblectLabel16(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    obj = new OblectLabel16.CategoryObject();
                    obj.Object = this;
                }

                internal class CategoryObject : Trading.Library.Objects.Order
                {

                    internal CategoryObject()
                    {
                        buyPrice = "Trading.Close";
                        sellPrice = "Trading.Close";
                        position = "Position.Formula_1";
                        date = "Trading.RealTime";
                    }
                }
            }

            internal class ArrowLabel0 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel0(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel0.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel1 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel1(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel1.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel2 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel2(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel2.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel3 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel3(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel3.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel4 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel4(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel4.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel5 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel5(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel5.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel6 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel6(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel6.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel7 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel7(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel7.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel8 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel8(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel8.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel9 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel9(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel9.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel10 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel10(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel10.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel11 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel11(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel11.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel12 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel12(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel12.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel13 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel13(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel13.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel14 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel14(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel14.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel15 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel15(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel15.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel16 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel16(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel16.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel17 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel17(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel17.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel18 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel18(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel18.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel19 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel19(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel19.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel20 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel20(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel20.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel21 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel21(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel21.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel22 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel22(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel22.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel23 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel23(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel23.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel24 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel24(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel24.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel25 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel25(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel25.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel26 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel26(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel26.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel27 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel27(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel27.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.IteratorConsumerLink
                {
                }
            }

            internal class ArrowLabel28 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel28(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel28.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel29 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel29(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel29.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel30 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel30(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel30.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel31 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel31(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel31.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel32 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel32(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel32.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel33 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel33(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel33.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel34 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel34(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel34.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel35 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel35(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel35.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel36 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel36(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel36.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel37 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel37(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel37.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel38 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel38(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel38.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel39 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel39(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel39.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel40 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel40(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel40.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel41 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel41(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel41.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

            internal class ArrowLabel42 : Diagram.UI.Labels.PureArrowLabel
            {
                internal ArrowLabel42(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
                {
                    this.desktop = desktop;
                    arrow = new ArrowLabel42.CategoryArrow();
                }

                internal class CategoryArrow : DataPerformer.DataLink
                {
                }
            }

        }

    }
}
