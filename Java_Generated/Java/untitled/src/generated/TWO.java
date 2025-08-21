package generated;

import diagram.Desktop;

import diagram.interfaces.IDesktop;

import error_handler.interfaces.ICheck;

import error_handler.interfaces.IErrorHandler;

public class Two extends Desktop
{

	protected class CategoryObject0 extends external.test.TestObjectTransformer
	{
		public CategoryObject0(String name, IDesktop desktop) {
			super(name,  desktop);
				coefficient = 666;
			}
	}
	

	protected class CategoryObject1 extends measurements.DataConsumerMeasurements
	{
		public CategoryObject1(String name, IDesktop desktop) {
			super(name,  desktop);
			}
	}
	

	protected class CategoryObject2 extends measurements.DataConsumerMeasurements
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
	

	public Two() {
		super();
	}

	public Two(ICheck check, IErrorHandler errorHandler) {
		super(check, errorHandler);
	}


	@Override
	public void init()
	{
		new Two.CategoryObject0("TTT", this);
		new Two.CategoryObject1("input", this);
		new Two.CategoryObject2("Output", this);
		new Two.CategoryArrow0("22", this);
		arrows.get(0).setSource(objects.get(2));
		arrows.get(0).setTarget(objects.get(1));
		postSet();
	}


}
