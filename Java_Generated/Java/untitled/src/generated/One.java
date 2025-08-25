package generated;

import diagram.Desktop;

import diagram.interfaces.IDesktop;

import error_handler.interfaces.ICheck;

import error_handler.interfaces.IErrorHandler;

public class One extends Desktop
{

	protected class CategoryObject0 extends measurements.RandomGenerator
	{
		public CategoryObject0(String name, IDesktop desktop) {
			super(name,  desktop);
			}
	}
	

	public One() {
		super();
	}

	public One(ICheck check, IErrorHandler errorHandler) {
		super(check, errorHandler);
	}


	@Override
	public void init()
	{
		new One.CategoryObject0("Random", this);
		postSet();
	}


}
