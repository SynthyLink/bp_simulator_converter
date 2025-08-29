package generated;

import diagram.Desktop;

import diagram.interfaces.IDesktop;

import error_handler.interfaces.ICheck;

import error_handler.interfaces.IErrorHandler;

public class Condition extends Desktop
{

	protected class CategoryObject0 extends measurements.VectorFormulaConsumer
	{
		public CategoryObject0(String name, IDesktop desktop) {
			super(name,  desktop);
			java.util.Map< String, general_service.Entry<Object, Object >> map = new java.util.HashMap<>();
			setMap(map);
					Object o;
					o = new double[0];
					addVariableValue("Formula_1", o);
				}
			
					@Override
					protected void calculateTree()
					{
						success = true;
						var_0[0] = this.getInternalTime();
						var_1[0] = (Math.sin(var_0[0]));
						if (check(var_1)) { success = false; return; } 
					}
				
				@Override
				protected void init()
				{
					var all = this.getAllMeasurements();
				}
				
				double[]  var_0 = new double[]{0};
				double[]  var_1 = new double[]{0};
				
				Object get_0()
				{
					return success ? this.var_0 : null;
				}
				
				Object get_1()
				{
					return success ? this.var_1 : null;
				}
				@Override
				protected void save(){
					var v = variables;
					var x0 = v.get("Formula_1");
					x0.setIValue(this.get_1());
				}
				
			}
	

	protected class CategoryObject1 extends measurements.VectorFormulaConsumer
	{
		public CategoryObject1(String name, IDesktop desktop) {
			super(name,  desktop);
			java.util.Map< String, general_service.Entry<Object, Object >> map = new java.util.HashMap<>();
			map.put("a", new general_service.Entry<Object, Object>(new double[0], new double[]{0.80000000000000004}));
			setMap(map);
					Object o;
					o = new boolean[0];
					addVariableValue("Formula_1", o);
				}
			
					@Override
					protected void calculateTree()
					{
						success = true;
						var_0[0] = ((double[])measurement0.getMeasurementValue())[0];
						if (check(var_0)) { success = false; return; } 
						var_1[0] = ((double[])aliasName1.getAliasNameValue())[0];
						if (check(var_1)) { success = false; return; }
						var_2[0] = ((var_0[0]) > (var_1[0]));
						if (check(var_2)) { success = false; return; } 
					}
				
				@Override
				protected void init()
				{
					var all = this.getAllMeasurements();
					measurement0 = all[0].getMeasurement(0);
					aliasName1 = new general_service.AliasName(this, "a");
				}
				
				measurements.interfaces.IMeasurement measurement0;
				general_service.interfaces.IAliasName aliasName1;
				double[]  var_0 = new double[]{0};
				double[]  var_1 = new double[]{0};
				boolean[]  var_2 = new boolean[]{true};
				
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
				@Override
				protected void save(){
					var v = variables;
					var x0 = v.get("Formula_1");
					x0.setIValue(this.get_2());
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
	

	protected class CategoryArrow2 extends measurements.arrows.DataLink
	{
		public CategoryArrow2(String name, IDesktop desktop) {
			super(name,  desktop);
			}
			}
	

	public Condition() {
		super();
	}

	public Condition(ICheck check, IErrorHandler errorHandler) {
		super(check, errorHandler);
	}


	@Override
	public void init()
	{
		new Condition.CategoryObject0("Input", this);
		new Condition.CategoryObject1("Condition", this);
		new Condition.CategoryObject2("Chart", this);
		new Condition.CategoryArrow0("", this);
		new Condition.CategoryArrow1("", this);
		new Condition.CategoryArrow2("", this);
		arrows.get(0).setSource(objects.get(1));
		arrows.get(0).setTarget(objects.get(0));
		arrows.get(1).setSource(objects.get(2));
		arrows.get(1).setTarget(objects.get(1));
		arrows.get(2).setSource(objects.get(2));
		arrows.get(2).setTarget(objects.get(0));
		postSet();
	}


}
