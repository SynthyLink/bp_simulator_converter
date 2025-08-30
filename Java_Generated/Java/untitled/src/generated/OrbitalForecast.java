package generated;

import diagram.Desktop;

import diagram.interfaces.IDesktop;

import error_handler.interfaces.ICheck;

import error_handler.interfaces.IErrorHandler;

public class OrbitalForecast extends Desktop
{

	protected class CategoryObject0 extends external.atmosphere.DynamicalAtmosphereTransformer
	{
		public CategoryObject0(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryObject1 extends external.gravity.Gravity36x36Transformer
	{
		public CategoryObject1(String name, IDesktop desktop) {
			super(name,  desktop);
				setN0(36);
				setNK(36);
			}
			}
	

	protected class CategoryObject2 extends measurements.VectorFormulaConsumer
	{
		public CategoryObject2(String name, IDesktop desktop) {
			super(name,  desktop);
			java.util.Map< String, general_service.Entry<Object, Object >> map = new java.util.HashMap<>();
			map.put("x", new general_service.Entry<Object, Object>(new double[0], new double[]{-5110.5458047301981}));
			map.put("w", new general_service.Entry<Object, Object>(new double[0], new double[]{6.9300634873392948}));
			map.put("z", new general_service.Entry<Object, Object>(new double[0], new double[]{2555.3253638965743}));
			map.put("y", new general_service.Entry<Object, Object>(new double[0], new double[]{4112.9884575937604}));
			map.put("u", new general_service.Entry<Object, Object>(new double[0], new double[]{-0.44668389543569337}));
			map.put("v", new general_service.Entry<Object, Object>(new double[0], new double[]{1.7737490756446463}));
			setMap(map);
					Object o;
					o = new double[0];
					addVariableValue("Formula_1", o);
					o = new double[0];
					addVariableValue("Formula_2", o);
					o = new double[0];
					addVariableValue("Formula_3", o);
					o = new double[0];
					addVariableValue("Formula_4", o);
					o = new double[0];
					addVariableValue("Formula_5", o);
					o = new double[0];
					addVariableValue("Formula_6", o);
					o = new double[0];
					addVariableValue("Formula_7", o);
					o = new double[0];
					addVariableValue("Formula_8", o);
				}
			
					@Override
					protected void calculateTree()
					{
						success = true;
						var_0[0] = ((double[])aliasName0.getAliasNameValue())[0];
						if (check(var_0)) { success = false; return; }
						var_2[0] = ((double[])aliasName2.getAliasNameValue())[0];
						if (check(var_2)) { success = false; return; }
						var_3[0] = ((double[])aliasName3.getAliasNameValue())[0];
						if (check(var_3)) { success = false; return; }
						var_4[0] = ((double[])aliasName4.getAliasNameValue())[0];
						if (check(var_4)) { success = false; return; }
						var_5[0] = ((double[])aliasName5.getAliasNameValue())[0];
						if (check(var_5)) { success = false; return; }
						var_6[0] = ((double[])aliasName6.getAliasNameValue())[0];
						if (check(var_6)) { success = false; return; }
						var_7[0] = ((double[])aliasName7.getAliasNameValue())[0];
						if (check(var_7)) { success = false; return; }
						var_9[0] = (Math.pow(var_7[0], var_8[0]));
						if (check(var_9)) { success = false; return; } 
						var_10[0] = ((double[])aliasName10.getAliasNameValue())[0];
						if (check(var_10)) { success = false; return; }
						var_12[0] = (Math.pow(var_10[0], var_11[0]));
						if (check(var_12)) { success = false; return; } 
						var_13[0] = ((var_9[0]) + (var_12[0]));
						if (check(var_13)) { success = false; return; } 
						var_14[0] = ((double[])aliasName14.getAliasNameValue())[0];
						if (check(var_14)) { success = false; return; }
						var_16[0] = (Math.pow(var_14[0], var_15[0]));
						if (check(var_16)) { success = false; return; } 
						var_17[0] = ((var_13[0]) + (var_16[0]));
						if (check(var_17)) { success = false; return; } 
						var_18[0] = (Math.sqrt(var_17[0]));
						if (check(var_18)) { success = false; return; } 
						var_20[0] = ((var_19[0]) * (var_1[0]));
						if (check(var_20)) { success = false; return; } 
						var_21[0] = ((var_20[0]) / (var_18[0]));
						if (check(var_21)) { success = false; return; } 
						var_22[0] = this.getInternalTime();
						var_23[0] = ((double[])measurement23.getMeasurementValue())[0];
						if (check(var_23)) { success = false; return; } 
					}
				
				@Override
				protected void init()
				{
					var all = this.getAllMeasurements();
					aliasName0 = new general_service.AliasName(this, "x");
					aliasName2 = new general_service.AliasName(this, "y");
					aliasName3 = new general_service.AliasName(this, "z");
					aliasName4 = new general_service.AliasName(this, "u");
					aliasName5 = new general_service.AliasName(this, "v");
					aliasName6 = new general_service.AliasName(this, "w");
					aliasName7 = new general_service.AliasName(this, "u");
					aliasName10 = new general_service.AliasName(this, "v");
					aliasName14 = new general_service.AliasName(this, "w");
				}
				
				general_service.interfaces.IAliasName aliasName0;
				general_service.interfaces.IAliasName aliasName2;
				general_service.interfaces.IAliasName aliasName3;
				general_service.interfaces.IAliasName aliasName4;
				general_service.interfaces.IAliasName aliasName5;
				general_service.interfaces.IAliasName aliasName6;
				general_service.interfaces.IAliasName aliasName7;
				general_service.interfaces.IAliasName aliasName10;
				general_service.interfaces.IAliasName aliasName14;
				double[]  var_0 = new double[]{0};
				double[]  var_1 =  new double[] { 0 };
				double[]  var_2 = new double[]{0};
				double[]  var_3 = new double[]{0};
				double[]  var_4 = new double[]{0};
				double[]  var_5 = new double[]{0};
				double[]  var_6 = new double[]{0};
				double[]  var_7 = new double[]{0};
				double[]  var_8 =  new double[] { 2 };
				double[]  var_9 = new double[]{0};
				double[]  var_10 = new double[]{0};
				double[]  var_11 =  new double[] { 2 };
				double[]  var_12 = new double[]{0};
				double[]  var_13 = new double[]{0};
				double[]  var_14 = new double[]{0};
				double[]  var_15 =  new double[] { 2 };
				double[]  var_16 = new double[]{0};
				double[]  var_17 = new double[]{0};
				double[]  var_18 = new double[]{0};
				double[]  var_19 =  new double[] { 0.5 };
				double[]  var_20 = new double[]{0};
				double[]  var_21 = new double[]{0};
				double[]  var_22 = new double[]{0};
				double[]  var_23 = new double[]{0};
				
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
				
				Object get_12()
				{
					return success ? this.var_12 : null;
				}
				
				Object get_13()
				{
					return success ? this.var_13 : null;
				}
				
				Object get_14()
				{
					return success ? this.var_14 : null;
				}
				
				Object get_15()
				{
					return success ? this.var_15 : null;
				}
				
				Object get_16()
				{
					return success ? this.var_16 : null;
				}
				
				Object get_17()
				{
					return success ? this.var_17 : null;
				}
				
				Object get_18()
				{
					return success ? this.var_18 : null;
				}
				
				Object get_19()
				{
					return success ? this.var_19 : null;
				}
				
				Object get_20()
				{
					return success ? this.var_20 : null;
				}
				
				Object get_21()
				{
					return success ? this.var_21 : null;
				}
				
				Object get_22()
				{
					return success ? this.var_22 : null;
				}
				
				Object get_23()
				{
					return success ? this.var_23 : null;
				}
				@Override
				protected void save(){
					var v = variables;
					var x0 = v.get("Formula_1");
					x0.setIValue(this.get_0());
					var x1 = v.get("Formula_2");
					x1.setIValue(this.get_2());
					var x2 = v.get("Formula_3");
					x2.setIValue(this.get_3());
					var x3 = v.get("Formula_4");
					x3.setIValue(this.get_4());
					var x4 = v.get("Formula_5");
					x4.setIValue(this.get_5());
					var x5 = v.get("Formula_6");
					x5.setIValue(this.get_6());
					var x6 = v.get("Formula_7");
					x6.setIValue(this.get_18());
					var x7 = v.get("Formula_8");
					x7.setIValue(this.get_22());
				}
				
			}
	

	protected class CategoryObject3 extends measurements.ObjectTransformer
	{
		public CategoryObject3(String name, IDesktop desktop) {
			super(name,  desktop);
			int[] x = null;
			java.util.ArrayList<int[]> array = new java.util.ArrayList<>();
			x = new int[]{
			0,
			0
			};
			array.add(x);
			x = new int[]{
			0,
			1
			};
			array.add(x);
			x = new int[]{
			0,
			2
			};
			array.add(x);
			this.array = array;
			}
			}
	

	protected class CategoryObject4 extends measurements.ObjectTransformer
	{
		public CategoryObject4(String name, IDesktop desktop) {
			super(name,  desktop);
			int[] x = null;
			java.util.ArrayList<int[]> array = new java.util.ArrayList<>();
			x = new int[]{
			0,
			7
			};
			array.add(x);
			x = new int[]{
			0,
			0
			};
			array.add(x);
			x = new int[]{
			0,
			1
			};
			array.add(x);
			x = new int[]{
			0,
			2
			};
			array.add(x);
			this.array = array;
			}
			}
	

	protected class CategoryObject5 extends measurements.differential_equations.DifferentialEquationSolverFormula
	{
		public CategoryObject5(String name, IDesktop desktop) {
			super(name,  desktop);
			java.util.Map< String, general_service.Entry<Object, Object >> map = new java.util.HashMap<>();
			map.put("q", new general_service.Entry<Object, Object>(new double[0], new double[]{5.3174953569821228E-09}));
			map.put("o", new general_service.Entry<Object, Object>(new double[0], new double[]{0.00014584231700000001}));
			map.put("w", new general_service.Entry<Object, Object>(new double[0], new double[]{7.45047785592}));
			map.put("z", new general_service.Entry<Object, Object>(new double[0], new double[]{0}));
			map.put("u", new general_service.Entry<Object, Object>(new double[0], new double[]{-0.98539477743199999}));
			map.put("v", new general_service.Entry<Object, Object>(new double[0], new double[]{1.2168189383400001}));
			map.put("s", new general_service.Entry<Object, Object>(new double[0], new double[]{1.6189340462770081E-13}));
			map.put("x", new general_service.Entry<Object, Object>(new double[0], new double[]{-5448.3481532400001}));
			map.put("y", new general_service.Entry<Object, Object>(new double[0], new double[]{-4463.9369842100004}));
			setMap(map);
					Object o;
					o = new double[0];
					addVariableValue("u", o);
					o = new double[0];
					addVariableValue("v", o);
					o = new double[0];
					addVariableValue("w", o);
					o = new double[0];
					addVariableValue("x", o);
					o = new double[0];
					addVariableValue("y", o);
					o = new double[0];
					addVariableValue("z", o);
				}
			
					@Override
					protected void calculateTree()
					{
						success = true;
						var_0[0] = ((double[])measurement0.getMeasurementValue())[0];
						if (check(var_0)) { success = false; return; } 
						var_1[0] = ((double[])aliasName1.getAliasNameValue())[0];
						if (check(var_1)) { success = false; return; }
						variable = value2.getIValue();
						if (check(variable)) { success = false; return; }
						var_2[0] = ((double[])variable)[0];
						var_3[0] = ((var_1[0]) * (var_2[0]));
						if (check(var_3)) { success = false; return; } 
						var_4[0] = ((double[])aliasName4.getAliasNameValue())[0];
						if (check(var_4)) { success = false; return; }
						var_5[0] = ((double[])measurement5.getMeasurementValue())[0];
						if (check(var_5)) { success = false; return; } 
						var_6[0] = ((var_4[0]) * (var_5[0]));
						if (check(var_6)) { success = false; return; } 
						var_7[0] = ((double[])measurement7.getMeasurementValue())[0];
						if (check(var_7)) { success = false; return; } 
						var_8[0] = ((var_6[0]) * (var_7[0]));
						if (check(var_8)) { success = false; return; } 
						variable = value9.getIValue();
						if (check(variable)) { success = false; return; }
						var_9[0] = ((double[])variable)[0];
						var_10[0] = ((var_8[0]) * (var_9[0]));
						if (check(var_10)) { success = false; return; } 
						var_11[0] = ((var_3[0]) - (var_10[0]));
						if (check(var_11)) { success = false; return; } 
						var_12[0] = ((var_0[0]) + (var_11[0]));
						if (check(var_12)) { success = false; return; } 
						var_13[0] = ((double[])aliasName13.getAliasNameValue())[0];
						if (check(var_13)) { success = false; return; }
						variable = value14.getIValue();
						if (check(variable)) { success = false; return; }
						var_14[0] = ((double[])variable)[0];
						var_15[0] = ((var_13[0]) * (var_14[0]));
						if (check(var_15)) { success = false; return; } 
						var_16[0] = ((var_12[0]) + (var_15[0]));
						if (check(var_16)) { success = false; return; } 
						var_17[0] = ((double[])measurement17.getMeasurementValue())[0];
						if (check(var_17)) { success = false; return; } 
						variable = value18.getIValue();
						if (check(variable)) { success = false; return; }
						var_18[0] = ((double[])variable)[0];
						var_19[0] = ((var_1[0]) * (var_18[0]));
						if (check(var_19)) { success = false; return; } 
						var_20[0] = ((var_4[0]) * (var_5[0]));
						if (check(var_20)) { success = false; return; } 
						var_21[0] = ((var_20[0]) * (var_7[0]));
						if (check(var_21)) { success = false; return; } 
						var_22[0] = ((var_21[0]) * (var_14[0]));
						if (check(var_22)) { success = false; return; } 
						var_23[0] = ((var_19[0]) - (var_22[0]));
						if (check(var_23)) { success = false; return; } 
						var_24[0] = ((var_13[0]) * (var_9[0]));
						if (check(var_24)) { success = false; return; } 
						var_25[0] = ((var_23[0]) - (var_24[0]));
						if (check(var_25)) { success = false; return; } 
						var_26[0] = ((var_17[0]) + (var_25[0]));
						if (check(var_26)) { success = false; return; } 
						var_27[0] = ((double[])measurement27.getMeasurementValue())[0];
						if (check(var_27)) { success = false; return; } 
						var_28[0] = ((var_4[0]) * (var_5[0]));
						if (check(var_28)) { success = false; return; } 
						var_29[0] = ((var_28[0]) * (var_7[0]));
						if (check(var_29)) { success = false; return; } 
						variable = value30.getIValue();
						if (check(variable)) { success = false; return; }
						var_30[0] = ((double[])variable)[0];
						var_31[0] = ((var_29[0]) * (var_30[0]));
						if (check(var_31)) { success = false; return; } 
						var_32[0] = ((var_27[0]) - (var_31[0]));
						if (check(var_32)) { success = false; return; } 
					}
				
				@Override
				protected void init()
				{
					var all = this.getAllMeasurements();
					measurement0 = all[0].getMeasurement(0);
					value2 = this.output[3];
					measurement5 = all[1].getMeasurement(0);
					measurement7 = all[2].getMeasurement(6);
					value9 = this.output[0];
					value14 = this.output[1];
					measurement17 = all[0].getMeasurement(1);
					value18 = this.output[4];
					measurement27 = all[0].getMeasurement(2);
					value30 = this.output[2];
					aliasName1 = new general_service.AliasName(this, "q");
					aliasName4 = new general_service.AliasName(this, "s");
					aliasName13 = new general_service.AliasName(this, "o");
				}
				
				measurements.interfaces.IMeasurement measurement0;
				general_service.interfaces.IValue  value2;
				measurements.interfaces.IMeasurement measurement5;
				measurements.interfaces.IMeasurement measurement7;
				general_service.interfaces.IValue  value9;
				general_service.interfaces.IValue  value14;
				measurements.interfaces.IMeasurement measurement17;
				general_service.interfaces.IValue  value18;
				measurements.interfaces.IMeasurement measurement27;
				general_service.interfaces.IValue  value30;
				general_service.interfaces.IAliasName aliasName1;
				general_service.interfaces.IAliasName aliasName4;
				general_service.interfaces.IAliasName aliasName13;
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
				double[]  var_12 = new double[]{0};
				double[]  var_13 = new double[]{0};
				double[]  var_14 = new double[]{0};
				double[]  var_15 = new double[]{0};
				double[]  var_16 = new double[]{0};
				double[]  var_17 = new double[]{0};
				double[]  var_18 = new double[]{0};
				double[]  var_19 = new double[]{0};
				double[]  var_20 = new double[]{0};
				double[]  var_21 = new double[]{0};
				double[]  var_22 = new double[]{0};
				double[]  var_23 = new double[]{0};
				double[]  var_24 = new double[]{0};
				double[]  var_25 = new double[]{0};
				double[]  var_26 = new double[]{0};
				double[]  var_27 = new double[]{0};
				double[]  var_28 = new double[]{0};
				double[]  var_29 = new double[]{0};
				double[]  var_30 = new double[]{0};
				double[]  var_31 = new double[]{0};
				double[]  var_32 = new double[]{0};
				
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
				
				Object get_12()
				{
					return success ? this.var_12 : null;
				}
				
				Object get_13()
				{
					return success ? this.var_13 : null;
				}
				
				Object get_14()
				{
					return success ? this.var_14 : null;
				}
				
				Object get_15()
				{
					return success ? this.var_15 : null;
				}
				
				Object get_16()
				{
					return success ? this.var_16 : null;
				}
				
				Object get_17()
				{
					return success ? this.var_17 : null;
				}
				
				Object get_18()
				{
					return success ? this.var_18 : null;
				}
				
				Object get_19()
				{
					return success ? this.var_19 : null;
				}
				
				Object get_20()
				{
					return success ? this.var_20 : null;
				}
				
				Object get_21()
				{
					return success ? this.var_21 : null;
				}
				
				Object get_22()
				{
					return success ? this.var_22 : null;
				}
				
				Object get_23()
				{
					return success ? this.var_23 : null;
				}
				
				Object get_24()
				{
					return success ? this.var_24 : null;
				}
				
				Object get_25()
				{
					return success ? this.var_25 : null;
				}
				
				Object get_26()
				{
					return success ? this.var_26 : null;
				}
				
				Object get_27()
				{
					return success ? this.var_27 : null;
				}
				
				Object get_28()
				{
					return success ? this.var_28 : null;
				}
				
				Object get_29()
				{
					return success ? this.var_29 : null;
				}
				
				Object get_30()
				{
					return success ? this.var_30 : null;
				}
				
				Object get_31()
				{
					return success ? this.var_31 : null;
				}
				
				Object get_32()
				{
					return success ? this.var_32 : null;
				}
				@Override
				protected void save(){
					var v = derivations;
					var x0 = v.get("v");
					x0.setIValue(this.get_26());
					var x1 = v.get("u");
					x1.setIValue(this.get_16());
					var x2 = v.get("z");
					x2.setIValue(this.get_30());
					var x3 = v.get("y");
					x3.setIValue(this.get_14());
					var x4 = v.get("x");
					x4.setIValue(this.get_9());
					var x5 = v.get("w");
					x5.setIValue(this.get_32());
				}
				
				@Override
				protected void createFeedback() {
					java.util.List<general_service.Entry<int[], String>> list = new java.util.ArrayList<>();
					list.add(new general_service.Entry(new int[] {2, 0}, "u" ));
					list.add(new general_service.Entry(new int[] {2, 1}, "u" ));
					list.add(new general_service.Entry(new int[] {2, 2}, "w" ));
					list.add(new general_service.Entry(new int[] {2, 3}, "x" ));
					list.add(new general_service.Entry(new int[] {2, 4}, "y" ));
					list.add(new general_service.Entry(new int[] {2, 5}, "z" ));
					setFeedback(list);
				}
			}
	

	protected class CategoryObject6 extends measurements.RecursiveFormula
	{
		public CategoryObject6(String name, IDesktop desktop) {
			super(name,  desktop);
			java.util.Map< String, general_service.Entry<Object, Object >> map = new java.util.HashMap<>();
			map.put("x", new general_service.Entry<Object, Object>(new double[0], new double[]{0}));
			map.put("y", new general_service.Entry<Object, Object>(new boolean[0], new boolean[]{False}));
			setMap(map);
					Object o;
					o = new double[0];
					addVariableValue("x", o);
					o = new boolean[0];
					addVariableValue("y", o);
				}
			
					@Override
					protected void calculateTree()
					{
						success = true;
						var_0[0] = ((double[])measurement0.getMeasurementValue())[0];
						if (check(var_0)) { success = false; return; } 
						var_2[0] = ((var_0[0]) > (var_1[0]));
						if (check(var_2)) { success = false; return; } 
						variable = value3.getIValue();
						if (check(variable)) { success = false; return; }
						var_3[0] = ((double[])variable)[0];
						var_5[0] = ((var_3[0]) < (var_4[0]));
						if (check(var_5)) { success = false; return; } 
						var_6[0] = ((var_2[0]) & (var_5[0]);
						if (check(var_6)) { success = false; return; } 
					}
				
				@Override
				protected void init()
				{
					var all = this.getAllMeasurements();
					measurement0 = all[0].getMeasurement(5);
					this.value3 = this.output[0];
				}
				
				measurements.interfaces.IMeasurement measurement0;
				general_service.interfaces.IValue value3;
				double[]  var_0 = new double[]{0};
				double[]  var_1 =  new double[] { 0 };
				boolean[]  var_2 = new boolean[]{true};
				double[]  var_3 = new double[]{0};
				double[]  var_4 =  new double[] { 0 };
				boolean[]  var_5 = new boolean[]{true};
				boolean[]  var_6 = new boolean[]{true};
				
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
				@Override
				protected void save(){
					var v = variables;
					var x0 = v.get("x");
					x0.setIValue(this.get_0());
					var x1 = v.get("y");
					x1.setIValue(this.get_6());
				}
				
			}
	

	protected class CategoryObject7 extends measurements.DataConsumer
	{
		public CategoryObject7(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow0 extends measurements.arrows.ObjectTransformerLink
	{
		public CategoryArrow0(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow1 extends measurements.arrows.ObjectTransformerLink
	{
		public CategoryArrow1(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow2 extends measurements.arrows.DataLink
	{
		public CategoryArrow2(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow3 extends measurements.arrows.DataLink
	{
		public CategoryArrow3(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow4 extends measurements.arrows.DataLink
	{
		public CategoryArrow4(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow5 extends measurements.arrows.DataLink
	{
		public CategoryArrow5(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow6 extends measurements.arrows.DataLink
	{
		public CategoryArrow6(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow7 extends measurements.arrows.DataLink
	{
		public CategoryArrow7(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow8 extends measurements.arrows.DataLink
	{
		public CategoryArrow8(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow9 extends measurements.arrows.DataLink
	{
		public CategoryArrow9(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	protected class CategoryArrow10 extends measurements.arrows.DataLink
	{
		public CategoryArrow10(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	public OrbitalForecast() {
		super();
	}

	public OrbitalForecast(ICheck check, IErrorHandler errorHandler) {
		super(check, errorHandler);
	}


	@Override
	public void init()
	{
		new OrbitalForecast.CategoryObject0("Atmosphere", this);
		new OrbitalForecast.CategoryObject1("Gravity", this);
		new OrbitalForecast.CategoryObject2("Vector", this);
		new OrbitalForecast.CategoryObject3("G-transformation", this);
		new OrbitalForecast.CategoryObject4("A-transformation", this);
		new OrbitalForecast.CategoryObject5("Motion equations", this);
		new OrbitalForecast.CategoryObject6("Recursive", this);
		new OrbitalForecast.CategoryObject7("Chart", this);
		new OrbitalForecast.CategoryArrow0("", this);
		new OrbitalForecast.CategoryArrow1("", this);
		new OrbitalForecast.CategoryArrow2("", this);
		new OrbitalForecast.CategoryArrow3("", this);
		new OrbitalForecast.CategoryArrow4("", this);
		new OrbitalForecast.CategoryArrow5("", this);
		new OrbitalForecast.CategoryArrow6("", this);
		new OrbitalForecast.CategoryArrow7("", this);
		new OrbitalForecast.CategoryArrow8("", this);
		new OrbitalForecast.CategoryArrow9("", this);
		new OrbitalForecast.CategoryArrow10("", this);
		arrows.get(0).setSource(objects.get(3));
		arrows.get(0).setTarget(objects.get(1));
		arrows.get(1).setSource(objects.get(4));
		arrows.get(1).setTarget(objects.get(0));
		arrows.get(2).setSource(objects.get(3));
		arrows.get(2).setTarget(objects.get(2));
		arrows.get(3).setSource(objects.get(4));
		arrows.get(3).setTarget(objects.get(2));
		arrows.get(4).setSource(objects.get(5));
		arrows.get(4).setTarget(objects.get(3));
		arrows.get(5).setSource(objects.get(5));
		arrows.get(5).setTarget(objects.get(4));
		arrows.get(6).setSource(objects.get(5));
		arrows.get(6).setTarget(objects.get(2));
		arrows.get(7).setSource(objects.get(6));
		arrows.get(7).setTarget(objects.get(5));
		arrows.get(8).setSource(objects.get(7));
		arrows.get(8).setTarget(objects.get(6));
		arrows.get(9).setSource(objects.get(7));
		arrows.get(9).setTarget(objects.get(2));
		arrows.get(10).setSource(objects.get(7));
		arrows.get(10).setTarget(objects.get(5));
		postSet();
	}


}
