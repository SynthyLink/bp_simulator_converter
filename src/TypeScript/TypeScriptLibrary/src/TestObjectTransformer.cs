using System;
using System.Collections.Generic;
using System.Linq;



namespace GeneratedProject
{
	public  class TestObjectTransformer : Diagram.UI.PureDesktop
	{
		public TestObjectTransformer()
		{
			objects.Add(new TestObjectTransformer.OblectLabel0("Vector", this));
			objects.Add(new TestObjectTransformer.OblectLabel1("Source", this));
			objects.Add(new TestObjectTransformer.OblectLabel2("Transformer", this));
			objects.Add(new TestObjectTransformer.OblectLabel3("Recursive", this));
			objects.Add(new TestObjectTransformer.OblectLabel4("Chart", this));
			Diagram.UI.Labels.PureArrowLabel currALabel = null;
			currALabel  = new TestObjectTransformer.ArrowLabel0("", this);
			arrows.Add(currALabel);
			currALabel.SourceNumber = (int)2;
			currALabel.TargetNumber = (int)1;
			currALabel  = new TestObjectTransformer.ArrowLabel1("", this);
			arrows.Add(currALabel);
			currALabel.SourceNumber = (int)2;
			currALabel.TargetNumber = (int)0;
			currALabel  = new TestObjectTransformer.ArrowLabel2("", this);
			arrows.Add(currALabel);
			currALabel.SourceNumber = (int)3;
			currALabel.TargetNumber = (int)2;
			currALabel  = new TestObjectTransformer.ArrowLabel3("", this);
			arrows.Add(currALabel);
			currALabel.SourceNumber = (int)3;
			currALabel.TargetNumber = (int)0;
			currALabel  = new TestObjectTransformer.ArrowLabel4("", this);
			arrows.Add(currALabel);
			currALabel.SourceNumber = (int)4;
			currALabel.TargetNumber = (int)3;
			currALabel  = new TestObjectTransformer.ArrowLabel5("", this);
			arrows.Add(currALabel);
			currALabel.SourceNumber = (int)4;
			currALabel.TargetNumber = (int)2;
			bool pl = PostLoad();
			bool pd = PostDeserialize();
			 				PostLoad(this);
				Name = "TestObjectTransformer"; 
		}
	
		internal class OblectLabel0 : Diagram.UI.Labels.PureObjectLabel
		{
			internal OblectLabel0(string name, Diagram.UI.Interfaces.IDesktop desktop) : base(name, "", "", 0, 0)
			{
				this.desktop = desktop;
				obj = new OblectLabel0.CategoryObject();
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
						"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
						"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
						"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"c\" S=\"c\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",
						"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"d\" S=\"d\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>"
					};
					isSerialized = true;
					calculateDerivation = false;
					deriOrder = 0;
					arguments =  new List<string>()
					{
					};
					parameters =new Dictionary<string, object>()
					{
						{"b", (double)0.0021041577613234159 },
						{"a", (double)0.19290093047446638 },
						{"c", (double)0.52807761014574284 },
						{"d", (double)9 }
					};
					operationNames = new Dictionary<System.Int32,System.String>()
					{
					};
					Init();
				}
			
				FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
				{
					DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new (this);
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
						variable = aliasName1.Value;
						if (checkValue(variable)) { success = false; return; }
						var_1 = (double)variable;
						variable = aliasName2.Value;
						if (checkValue(variable)) { success = false; return; }
						var_2 = (double)variable;
						variable = aliasName3.Value;
						if (checkValue(variable)) { success = false; return; }
						var_3 = (double)variable;
					}
					
					internal  Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
					{
						success = true;
						this.trees = trees;
						this.checkValue = checkValue;
						this.dataPerformerFormula = dataPerformerFormula;
						aliasName0 = dataPerformerFormula.ToAliasName(trees[0]);
						aliasName1 = dataPerformerFormula.ToAliasName(trees[1]);
						aliasName2 = dataPerformerFormula.ToAliasName(trees[2]);
						aliasName3 = dataPerformerFormula.ToAliasName(trees[3]);
						dictionary[trees[0]] = Get_0;
						dictionary[trees[1]] = Get_1;
						dictionary[trees[2]] = Get_2;
						dictionary[trees[3]] = Get_3;
					}
					
					public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
					{ get { return dictionary[tree]; }}
					
					Dictionary<FormulaEditor.ObjectFormulaTree, Func<object> > dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object> >();
					
					Diagram.UI.Interfaces.IAliasName aliasName0;
					Diagram.UI.Interfaces.IAliasName aliasName1;
					Diagram.UI.Interfaces.IAliasName aliasName2;
					Diagram.UI.Interfaces.IAliasName aliasName3;
					FormulaEditor.ObjectFormulaTree currentTree = null;
					object[] currentArray = null;
					double doubleValue = 0;
					FormulaEditor.ObjectFormulaTree[] trees = null;
					double var_0 = 0;
					double var_1 = 0;
					double var_2 = 0;
					double var_3 = 0;
					
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
					
					Func<object, bool> checkValue = (o) => false;
					object variable;
					bool success = true;
					DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;
				
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
	
			internal class CategoryObject : Test.Calculation.Forms.ObjectTransformer
			{
			
				internal CategoryObject()
				{
					Coefficient = 0.24);
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
	
			internal class CategoryObject : DataPerformer.Portable.ObjectTransformer
			{
			internal CategoryObject()
			{
				links = new Dictionary<string, string>()
				{
					{ "a","Vector.Formula_1"},
					{ "b","Vector.Formula_2"},
					{ "c","Vector.Formula_3"},
					{ "d","Vector.Formula_4"}
				};
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
	
			internal class CategoryObject : DataPerformer.Formula.Recursive, FormulaEditor.Interfaces.ITreeCollectionProxyFactory
			{
			
				internal CategoryObject()
				{
					proxyFactory = this;
					vars = new Dictionary<object, object>()
					{
						{'d', new object[] {(System.Double)(0),"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"k\" S=\"k\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",(System.Double)(4)}}
						,{'f', new object[] {(System.Double)(0),"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"l\" S=\"l\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"t\" S=\"t\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>  </F></Root>",(System.Double)(1)}}
						,{'a', new object[] {(System.Double)(0),"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"k\" S=\"k\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"x\" S=\"x\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"+\" S=\"+\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"a\" S=\"a\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>  </F></Root>",(System.Double)(1)}}
						,{'c', new object[] {(System.Double)(0),"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"k\" S=\"k\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"z\" S=\"z\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"+\" S=\"+\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"c\" S=\"c\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>  </F></Root>",(System.Double)(5)}}
						,{'b', new object[] {(System.Double)(0),"<Root>  <F>    <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"k\" S=\"k\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">      <F />    </S>    <S type=\"FormulaEditor.Symbols.BracketsSymbol\" symbol=\"P\" S=\"( )\" Type=\"2\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"P\">      <F>        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"y\" S=\"y\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>        <S type=\"FormulaEditor.Symbols.BinarySymbol\" symbol=\"+\" S=\"+\" Type=\"3\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"0\" Bold=\"1\" Sb=\"\" />        <S type=\"FormulaEditor.Symbols.SimpleSymbol\" symbol=\"b\" S=\"b\" Type=\"1\" Index=\"1\" Level=\"0\" DoubleValue=\"0\" UlongValue=\"0\" BoolValue=\"False\" Italic=\"1\" Bold=\"1\" Sb=\"\">          <F />        </S>      </F>      <F />    </S>  </F></Root>",(System.Double)(3)}}
					};
			
					aliases = new Dictionary<object, object>()
					{
						{'k', (System.Double)(0.69999999999999996)}
						,{'l', (System.Double)(0.01)}
					};
			
					externalAls = new Dictionary<object, object>()
					{
						{'a', "Vector.a"}
						,{'c', "Vector.c"}
						,{'b', "Vector.b"}
					};
			
					pars = new Dictionary<object, object>()
					{
						{'y', "Transformer.y"}
						,{'t', "Time"}
						,{'x', "Transformer.x"}
						,{'z', "Transformer.z"}
					};
			
				}
			
				FormulaEditor.Interfaces.ITreeCollectionProxy FormulaEditor.Interfaces.ITreeCollectionProxyFactory.CreateProxy(FormulaEditor.Interfaces.ITreeCollection collection, Func<object, bool> checkValue)
				{
					DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = new (this);
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
						variable = aliasName0.Value;
						if (checkValue(variable)) { success = false; return; }
						var_0 = (double)variable;
						variable = measurement1.Parameter();
						if (checkValue(variable)) { success = false; return; }
						var_1 = (double)variable;
						variable = measurement2.Parameter();
						if (checkValue(variable)) { success = false; return; }
						var_2 = (double)variable;
						var_3 = (var_1) + (var_2);
						var_4 = (var_0) * (var_3);
						variable = measurement5.Parameter();
						if (checkValue(variable)) { success = false; return; }
						var_5 = (double)variable;
						variable = measurement6.Parameter();
						if (checkValue(variable)) { success = false; return; }
						var_6 = (double)variable;
						var_7 = (var_5) + (var_6);
						var_8 = (var_0) * (var_7);
						variable = measurement9.Parameter();
						if (checkValue(variable)) { success = false; return; }
						var_9 = (double)variable;
						variable = measurement10.Parameter();
						if (checkValue(variable)) { success = false; return; }
						var_10 = (double)variable;
						var_11 = (var_9) + (var_10);
						var_12 = (var_0) * (var_11);
						var_13 = (var_0) * (var_1);
						variable = aliasName14.Value;
						if (checkValue(variable)) { success = false; return; }
						var_14 = (double)variable;
						variable = measurement15.Parameter();
						if (checkValue(variable)) { success = false; return; }
						var_15 = (double)variable;
						var_16 = (var_14) * (var_15);
					}
					
					internal  Calculation(FormulaEditor.ObjectFormulaTree[] trees, Func<object, bool> checkValue, DataPerformer.Formula.DataPerformerFormula dataPerformerFormula)
					{
						success = true;
						this.trees = trees;
						this.checkValue = checkValue;
						this.dataPerformerFormula = dataPerformerFormula;
						aliasName0 = dataPerformerFormula.ToAliasName(trees[0]);
						measurement1 = dataPerformerFormula.ToMeasurement(trees[1]);
						measurement2 = dataPerformerFormula.ToMeasurement(trees[2]);
						measurement5 = dataPerformerFormula.ToMeasurement(trees[5]);
						measurement6 = dataPerformerFormula.ToMeasurement(trees[6]);
						measurement9 = dataPerformerFormula.ToMeasurement(trees[9]);
						measurement10 = dataPerformerFormula.ToMeasurement(trees[10]);
						aliasName14 = dataPerformerFormula.ToAliasName(trees[14]);
						measurement15 = dataPerformerFormula.ToMeasurement(trees[15]);
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
						dictionary[trees[13]] = Get_13;
						dictionary[trees[14]] = Get_14;
						dictionary[trees[15]] = Get_15;
						dictionary[trees[16]] = Get_16;
					}
					
					public Func<object> this[FormulaEditor.ObjectFormulaTree tree]
					{ get { return dictionary[tree]; }}
					
					Dictionary<FormulaEditor.ObjectFormulaTree, Func<object> > dictionary = new Dictionary<FormulaEditor.ObjectFormulaTree, Func<object> >();
					
					Diagram.UI.Interfaces.IAliasName aliasName0;
					DataPerformer.Interfaces.IMeasurement measurement1;
					DataPerformer.Interfaces.IMeasurement measurement2;
					DataPerformer.Interfaces.IMeasurement measurement5;
					DataPerformer.Interfaces.IMeasurement measurement6;
					DataPerformer.Interfaces.IMeasurement measurement9;
					DataPerformer.Interfaces.IMeasurement measurement10;
					Diagram.UI.Interfaces.IAliasName aliasName14;
					DataPerformer.Interfaces.IMeasurement measurement15;
					FormulaEditor.ObjectFormulaTree currentTree = null;
					object[] currentArray = null;
					double doubleValue = 0;
					FormulaEditor.ObjectFormulaTree[] trees = null;
					double var_0 = 0;
					double var_1 = 0;
					double var_2 = 0;
					double var_3 = 0;
					double var_4 = 0;
					double var_5 = 0;
					double var_6 = 0;
					double var_7 = 0;
					double var_8 = 0;
					double var_9 = 0;
					double var_10 = 0;
					double var_11 = 0;
					double var_12 = 0;
					double var_13 = 0;
					double var_14 = 0;
					double var_15 = 0;
					double var_16 = 0;
					
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
					
					object Get_13()
					{
						return success ? var_13 : null;
					}
					
					object Get_14()
					{
						return success ? var_14 : null;
					}
					
					object Get_15()
					{
						return success ? var_15 : null;
					}
					
					object Get_16()
					{
						return success ? var_16 : null;
					}
					
					Func<object, bool> checkValue = (o) => false;
					object variable;
					bool success = true;
					DataPerformer.Formula.DataPerformerFormula dataPerformerFormula = null;
				
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
	
			internal class CategoryObject : DataPerformer.Portable.DataConsumer
			{
			internal CategoryObject() : base(0)
			{
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
	
			internal class CategoryArrow : DataPerformer.Portable.ObjectTransformerLink
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
	
			internal class CategoryArrow : DataPerformer.Portable.DataLink
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
	
			internal class CategoryArrow : DataPerformer.Portable.DataLink
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
	
			internal class CategoryArrow : DataPerformer.Portable.DataLink
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
	
			internal class CategoryArrow : DataPerformer.Portable.DataLink
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
	
			internal class CategoryArrow : DataPerformer.Portable.DataLink
			{
			}
		}
	
	}
	
}
