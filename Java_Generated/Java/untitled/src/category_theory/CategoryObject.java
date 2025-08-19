package category_theory;

import category_theory.interfaces.ICategoryObject;
import diagram.interfaces.IDesktop;

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
}
