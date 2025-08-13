package conversion.category_theory;

import conversion.category_theory.interfaces.ICategoryObject;
import conversion.category_theory.interfaces.IDesktop;

import java.util.HashMap;
import java.util.Objects;

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
