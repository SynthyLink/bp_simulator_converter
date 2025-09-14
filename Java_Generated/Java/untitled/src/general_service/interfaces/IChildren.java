package general_service.interfaces;

import java.util.List;

public interface IChildren<T> {
    /// <summary>
    /// Children
    /// </summary>
    T[] getChildren();

    /// <summary>
    /// Adds child
    /// </summary>
    /// <param name="child">The child to add</param>
    void AddChild(T child);

    /// <summary>
    /// Remove child
    /// </summary>
    /// <param name="child"></param>
    void RemoveChild(T child);

}
