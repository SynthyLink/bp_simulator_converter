package diagram;

import category_theory.interfaces.ICategoryArrow;
import category_theory.interfaces.ICategoryObject;
import diagram.interfaces.IDesktop;
import error_handler.interfaces.ICheck;
import error_handler.interfaces.IErrorHandler;
import general_service.interfaces.IPostSetArrow;


import java.util.*;

public class Desktop  implements IDesktop, ICheck, IErrorHandler
{
    protected List<ICategoryObject> objects = new ArrayList<>();

    protected List<ICategoryArrow> arrows = new ArrayList<>();

    protected Map<String, ICategoryObject> objectMap = new TreeMap<>();
    protected Map<String, ICategoryArrow> arrowMap = new TreeMap<>();

    public Desktop(ICheck check, IErrorHandler errorHandler)
    {
        this.check = check;
        this.errorHandler = errorHandler;
        init();
    }

    public  Desktop()
    {
        this.check = this;
        this.errorHandler = this;
        init();
    }


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

    @Override
    public void setCheck(ICheck check) {
        this.check = check;

    }

    @Override
    public ICheck getCheck() {
        return check;
    }

    @Override
    public void setErrorHandler(IErrorHandler errorHandler) {
        this.errorHandler = errorHandler;
    }

    @Override
    public IErrorHandler getErrorHandler() {
        return errorHandler;
    }

    @Override
    public void init() {

    }

    protected void postSet()
    {
        for (int i = 0; i < arrows.size(); i++)
        {
            var a = arrows.get(i);
            if (a instanceof IPostSetArrow postSetArrow)
            {
                postSetArrow.postSetArrow();
            }
        }

        for (int i = 0; i < objects.size(); i++)
        {
            var o = objects.get(i);
            if (o instanceof IPostSetArrow postSetArrow)
            {
                postSetArrow.postSetArrow();
            }
        }

    }


    @Override
    public boolean check(Object obj) {
        return false;
    }

    @Override
    public void handle(Throwable exception) {

    }

    @Override
    public void show(String message) {

    }

    ICheck check;

    IErrorHandler errorHandler;
}

