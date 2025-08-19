package generated;

import diagram.Desktop;

import diagram.interfaces.IDesktop;

public class TWO extends Desktop
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
	

	public TWO() {

		new TWO.CategoryObject0("input", this);
		new TWO.CategoryObject1("Output", this);
		new TWO.CategoryArrow0("22", this);
		arrows.get(0).setSource(objects.get(1));
		arrows.get(0).setTarget(objects.get(0));
		postSet();
	}


}
