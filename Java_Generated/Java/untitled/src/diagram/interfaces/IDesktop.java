package diagram.interfaces;

import category_theory.interfaces.ICategoryArrow;
import category_theory.interfaces.ICategoryObject;

import java.util.List;

public interface IDesktop
{
    List<ICategoryObject> getCategoryObjects();

    List<ICategoryArrow> getCategoryArrows();

    void addCategoryObject(ICategoryObject obj);

    void addCategoryArrow(ICategoryArrow arrow);

    ICategoryObject getCategoryObject(String name);

    ICategoryArrow getCategoryArrow(String name);



}
