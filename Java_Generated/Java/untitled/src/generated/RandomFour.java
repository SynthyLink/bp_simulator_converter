package generated;

import diagram.Desktop;

import diagram.interfaces.IDesktop;

import error_handler.interfaces.ICheck;

import error_handler.interfaces.IErrorHandler;

public class RandomFour extends Desktop
{

	public RandomFour() {
		super();
	}

	public RandomFour(ICheck check, IErrorHandler errorHandler) {
		super(check, errorHandler);
	}


	@Override
	public void init()
	{
		postSet();
	}


}
