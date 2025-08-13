package conversion.category_theory;

import conversion.category_theory.interfaces.ICategoryArrow;
import conversion.category_theory.interfaces.ICategoryObject;
import conversion.category_theory.interfaces.IDesktop;

public class CategoryArrow implements ICategoryArrow {

    protected  ICategoryObject source;

    protected  ICategoryObject target;

    protected String name;

    protected  IDesktop desktop;

    public CategoryArrow(String name, IDesktop desktop)
    {
        this.name = name;
        this.desktop = desktop;
        if (desktop != null)
        {
            desktop.addCategoryArrow(this);
        }

    }

    /**
     * @return
     */
    @Override
    public ICategoryObject getSource() {
        return source;
    }

    /**
     * @return
     */
    @Override
    public ICategoryObject getTagret() {
        return target;
    }

    /**
     * @param source
     */
    @Override
    public void setSource(ICategoryObject source) {
this.source = source;
    }

    /**
     * @param target
     */
    @Override
    public void setTarget(ICategoryObject target) {

    }

    /**
     * @return
     */
    @Override
    public String getArrowName() {
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

