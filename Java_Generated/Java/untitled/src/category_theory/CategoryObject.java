package category_theory;

import category_theory.interfaces.ICategoryObject;
import diagram.interfaces.IDesktop;
import error_handler.interfaces.ICheck;

/**
 *
 */
public class CategoryObject implements ICategoryObject {

    protected  String name;

    public IDesktop desktop;



    public CategoryObject(String name, IDesktop desktop)
    {
        this.name = name;
        this.desktop = desktop;
        if (desktop != null)
        {
            desktop.addCategoryObject(this);
            checker = desktop.getCheck();
        }

    }

    /**
     * @return
     */
    @Override
    public String getCategoryObjectName() {
        return name;
    }

    /**
     * @return
     */
    @Override
    public IDesktop getDesktop() {
        return desktop;
    }

    protected boolean check(Object o)
    {
        if (checker == null)
        {
            return true;
        }
        return checker.check(o);
    }

    protected ICheck checker;

}
