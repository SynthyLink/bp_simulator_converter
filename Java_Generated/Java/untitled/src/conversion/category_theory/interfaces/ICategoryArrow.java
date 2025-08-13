package conversion.category_theory.interfaces;


public interface ICategoryArrow
{
    ICategoryObject getSource();

    ICategoryObject getTagret();

    void setSource(ICategoryObject source);

    void setTarget(ICategoryObject target);

    String getArrowName();

    IDesktop getDesktop();

}
