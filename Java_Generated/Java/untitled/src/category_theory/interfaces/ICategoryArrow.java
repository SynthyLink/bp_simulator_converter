package category_theory.interfaces;


public interface ICategoryArrow
{
    ICategoryObject getSource();

    ICategoryObject getTarget();

    void setSource(ICategoryObject source);

    void setTarget(ICategoryObject target);

    String getArrowName();

    IDesktop getDesktop();

}
