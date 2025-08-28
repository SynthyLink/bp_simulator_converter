package generated;

import diagram.Desktop;

import diagram.interfaces.IDesktop;

import error_handler.interfaces.ICheck;

import error_handler.interfaces.IErrorHandler;

public class ODE_Feed extends Desktop
{

	protected class CategoryObject0 extends measurements.VectorFormulaConsumer
	{
		public CategoryObject0(String name, IDesktop desktop) {
			super(name,  desktop);
			java.util.Map< String, general_service.Entry<Object, Object >> map = new java.util.HashMap<>();
			map.put("b", new general_service.Entry<Object, Object>(new double[0], new double[]{1}));
			map.put("c", new general_service.Entry<Object, Object>(new double[0], new double[]{0.31314560830292659}));
			map.put("k", new general_service.Entry<Object, Object>(new double[0], new double[]{2}));
			map.put("a", new general_service.Entry<Object, Object>(new double[0], new double[]{1}));
			map.put("d", new general_service.Entry<Object, Object>(new double[0], new double[]{-0.17015052092374328}));
			setMap(map);
				}
			
					@Override
					protected void calculateTree()
					{
						success = true;
						var_0[0] = ((double[])aliasName0.getAliasNameValue())[0];
						if (check(var_0)) { success = false; return; }
						var_1[0] = ((double[])aliasName1.getAliasNameValue())[0];
						if (check(var_1)) { success = false; return; }
						var_2[0] = this.getInternalTime();
						var_3[0] = ((var_1[0]) * (var_2[0]));
						if (check(var_3)) { success = false; return; } 
						var_4[0] = (Math.sin(var_3[0]));
						if (check(var_4)) { success = false; return; } 
						var_5[0] = ((var_0[0]) * (var_4[0]));
						if (check(var_5)) { success = false; return; } 
						var_6[0] = ((double[])aliasName6.getAliasNameValue())[0];
						if (check(var_6)) { success = false; return; }
						var_7[0] = ((double[])aliasName7.getAliasNameValue())[0];
						if (check(var_7)) { success = false; return; }
						var_8[0] = ((double[])aliasName8.getAliasNameValue())[0];
						if (check(var_8)) { success = false; return; }
						var_9[0] = ((var_7[0]) - (var_8[0]));
						if (check(var_9)) { success = false; return; } 
						var_10[0] = ((var_6[0]) * (var_9[0]));
						if (check(var_10)) { success = false; return; } 
						var_11[0] = ((var_5[0]) + (var_10[0]));
						if (check(var_11)) { success = false; return; } 
					}
				
				@Override
				protected void init()
				{
					var all = this.getAllMeasurements();
					aliasName0 = new general_service.AliasName(this, "a");
					aliasName1 = new general_service.AliasName(this, "b");
					aliasName6 = new general_service.AliasName(this, "k");
					aliasName7 = new general_service.AliasName(this, "c");
					aliasName8 = new general_service.AliasName(this, "d");
				}
				
				general_service.interfaces.IAliasName aliasName0;
				general_service.interfaces.IAliasName aliasName1;
				general_service.interfaces.IAliasName aliasName6;
				general_service.interfaces.IAliasName aliasName7;
				general_service.interfaces.IAliasName aliasName8;
				double[]  var_0 = new double[]{0};
				double[]  var_1 = new double[]{0};
				double[]  var_2 = new double[]{0};
				double[]  var_3 = new double[]{0};
				double[]  var_4 = new double[]{0};
				double[]  var_5 = new double[]{0};
				double[]  var_6 = new double[]{0};
				double[]  var_7 = new double[]{0};
				double[]  var_8 = new double[]{0};
				double[]  var_9 = new double[]{0};
				double[]  var_10 = new double[]{0};
				double[]  var_11 = new double[]{0};
				
				Object get_0()
				{
					return success ? this.var_0 : null;
				}
				
				Object get_1()
				{
					return success ? this.var_1 : null;
				}
				
				Object get_2()
				{
					return success ? this.var_2 : null;
				}
				
				Object get_3()
				{
					return success ? this.var_3 : null;
				}
				
				Object get_4()
				{
					return success ? this.var_4 : null;
				}
				
				Object get_5()
				{
					return success ? this.var_5 : null;
				}
				
				Object get_6()
				{
					return success ? this.var_6 : null;
				}
				
				Object get_7()
				{
					return success ? this.var_7 : null;
				}
				
				Object get_8()
				{
					return success ? this.var_8 : null;
				}
				
				Object get_9()
				{
					return success ? this.var_9 : null;
				}
				
				Object get_10()
				{
					return success ? this.var_10 : null;
				}
				
				Object get_11()
				{
					return success ? this.var_11 : null;
				}
			}
	

	protected class CategoryObject1 extends measurements.differential_equations.DifferentialEquationSolverFormula
	{
		public CategoryObject1(String name, IDesktop desktop) {
			super(name,  desktop);
			java.util.Map< String, general_service.Entry<Object, Object >> map = new java.util.HashMap<>();
			map.put("x", new general_service.Entry<Object, Object>(new double[0], new double[]{0}));
			map.put("y", new general_service.Entry<Object, Object>(new double[0], new double[]{1}));
			map.put("a", new general_service.Entry<Object, Object>(new double[0], new double[]{1}));
			setMap(map);
				}
			
					@Override
					protected void calculateTree()
					{
						success = true;
						var_0[0] = ((double[])aliasName0.getAliasNameValue())[0];
						if (check(var_0)) { success = false; return; }
						var_1[0] = ( -(var_0[0]));
						if (check(var_1)) { success = false; return; } 
						variable = value2.getIValue();
						if (check(variable)) { success = false; return; }
						var_2[0] = ((double[])variable)[0];
						var_3[0] = ((var_1[0]) * (var_2[0]));
						if (check(var_3)) { success = false; return; } 
						variable = value4.getIValue();
						if (check(variable)) { success = false; return; }
						var_4[0] = ((double[])variable)[0];
						var_5[0] = ((var_0[0]) * (var_4[0]));
						if (check(var_5)) { success = false; return; } 
						var_6[0] = ((double[])measurement6.getMeasurementValue())[0];
						if (check(var_6)) { success = false; return; } 
						var_7[0] = ((var_5[0]) + (var_6[0]));
						if (check(var_7)) { success = false; return; } 
					}
				
				@Override
				protected void init()
				{
					var all = this.getAllMeasurements();
					value2 = this.output[1];
					value4 = this.output[0];
					measurement6 = all[0].getMeasurement(0);
					aliasName0 = new general_service.AliasName(this, "a");
				}
				
				general_service.interfaces.IValue  value2;
				general_service.interfaces.IValue  value4;
				measurements.interfaces.IMeasurement measurement6;
				general_service.interfaces.IAliasName aliasName0;
				double[]  var_0 = new double[]{0};
				double[]  var_1 = new double[]{0};
				double[]  var_2 = new double[]{0};
				double[]  var_3 = new double[]{0};
				double[]  var_4 = new double[]{0};
				double[]  var_5 = new double[]{0};
				double[]  var_6 = new double[]{0};
				double[]  var_7 = new double[]{0};
				
				Object get_0()
				{
					return success ? this.var_0 : null;
				}
				
				Object get_1()
				{
					return success ? this.var_1 : null;
				}
				
				Object get_2()
				{
					return success ? this.var_2 : null;
				}
				
				Object get_3()
				{
					return success ? this.var_3 : null;
				}
				
				Object get_4()
				{
					return success ? this.var_4 : null;
				}
				
				Object get_5()
				{
					return success ? this.var_5 : null;
				}
				
				Object get_6()
				{
					return success ? this.var_6 : null;
				}
				
				Object get_7()
				{
					return success ? this.var_7 : null;
				}
				@Override
				protected void save(){
					var v = derivations;
					var x0 = v.get("y");
					x0.setIValue(this.get_7());
					var x1 = v.get("x");
					x1.setIValue(this.get_3());
				}
				
				@Override
				protected void createFeedback() {
					java.util.List<general_service.Entry<int[], String>> list = new java.util.ArrayList<>();
					list.add(new general_service.Entry(new int[] {0, 0}, "c" ));
					list.add(new general_service.Entry(new int[] {0, 1}, "d" ));
					setFeedback(list);
				}
			}
	

	protected class CategoryObject2 extends measurements.DataConsumer
	{
		public CategoryObject2(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow0 extends measurements.arrows.DataLink
	{
		public CategoryArrow0(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow1 extends measurements.arrows.DataLink
	{
		public CategoryArrow1(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	public ODE_Feed() {
		super();
	}

	public ODE_Feed(ICheck check, IErrorHandler errorHandler) {
		super(check, errorHandler);
	}


	@Override
	public void init()
	{
		new ODE_Feed.CategoryObject0("Init", this);
		new ODE_Feed.CategoryObject1("ODE", this);
		new ODE_Feed.CategoryObject2("Chart", this);
		new ODE_Feed.CategoryArrow0("1", this);
		new ODE_Feed.CategoryArrow1("", this);
		arrows.get(0).setSource(objects.get(1));
		arrows.get(0).setTarget(objects.get(0));
		arrows.get(1).setSource(objects.get(2));
		arrows.get(1).setTarget(objects.get(1));
		postSet();
	}


}
