package generated;

import diagram.Desktop;

import diagram.interfaces.IDesktop;

import error_handler.interfaces.ICheck;

public class Two extends Desktop
{

	protected class CategoryObject0 extends measurements.DataConsumerMeasurements
	{
		public CategoryObject0(String name, IDesktop desktop) {
			super(name,  desktop);
			}
	}
	

	protected class CategoryObject1 extends measurements.DataConsumerMeasurements
	{
		public CategoryObject1(String name, IDesktop desktop) {
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

	public Two(ICheck check) {
		super(check);
	}


	@Override
	public void init()
	{
		new Two.CategoryObject0("input", this);
		new Two.CategoryObject1("Output", this);
		new Two.CategoryArrow0("22", this);
		arrows.get(0).setSource(objects.get(1));
		arrows.get(0).setTarget(objects.get(0));
		postSet();
	}


}
