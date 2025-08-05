using System;

namespace Diagram.UI.Attributes
{
    /// <summary>
    /// Attributes of code creation
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class CodeCreatorAttribute : Attribute
    {
        /// <summary>
        /// Allows initial alias state
        /// </summary>
        public bool AliasInitialState
        {
            get;
            set;
        } = false;

    }
}
