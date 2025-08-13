package conversion.category_theory;

import conversion.category_theory.interfaces.ICategoryArrow;
import conversion.category_theory.interfaces.ICategoryObject;
import conversion.category_theory.interfaces.IDesktop;

import java.util.*;

public class Desktop  implements IDesktop
{
    protected List<ICategoryObject> objects = new ArrayList<>();
    protected List<ICategoryArrow> arrows = new ArrayList<>();

    protected Map<String, ICategoryObject> objectMap = new TreeMap<>();
    protected Map<String, ICategoryArrow> arrowMap = new TreeMap<>();


    /**
     * @return
     */
    @Override
    public List<ICategoryObject> getCategoryObjects() {
        return objects;
    }

    /**
     * @return
     */
    @Override
    public List<ICategoryArrow> getCategoryArrows() {
        return arrows;
    }

    /**
     * @param obj
     */
    @Override
    public void addCategoryObject(ICategoryObject obj) {
objects.add(obj);
objectMap.put(obj.getCategoryObjectName(), obj);

    }

    /**
     * @param arrow
     */
    @Override
    public void addCategoryArrow(ICategoryArrow arrow) {
arrows.add(arrow);
arrowMap.put(arrow.getArrowName(), arrow);
    }

    /**
     * @param name
     * @return
     */
    @Override
    public ICategoryObject getCategoryObject(String name) {
        ICategoryObject o = objectMap.get(name);
        return  o;
    }

    /**
     * @param name
     * @return
     */
    @Override
    public ICategoryArrow getCategoryArrow(String name) {
       ICategoryArrow a = arrowMap.get(name);
       return a;
    }
}

