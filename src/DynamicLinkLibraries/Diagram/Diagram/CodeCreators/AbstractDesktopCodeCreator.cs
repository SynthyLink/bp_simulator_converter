using System;
using System.Collections.Generic;

using CategoryTheory;
using Diagram.Interfaces;
using Diagram.UI.CodeCreators.Interfaces;
using Diagram.UI.Interfaces;

namespace Diagram.CodeCreators
{
    public abstract class AbstractDesktopCodeCreator : IDesktopCodeCreator, IAdditionalFiles
    {
        protected AbstractDesktopCodeCreator(bool b)
        {

        }

        protected UI.Performer performer = new UI.Performer();


        IComponentCollection collection;

        protected List<ICategoryObject> categoryObjects = new List<ICategoryObject>();
        protected List<ICategoryArrow> categoryArrows = new();
        protected Dictionary<ICategoryObject, int> objects = new();
        protected Dictionary<ICategoryArrow, int> arrows = new();

        protected virtual Dictionary<string, byte[]> Files
        {
            get;
        } = new();

        protected IClassCodeCreator classCodeCreator;


        Tuple<Dictionary<ICategoryObject, int>, Dictionary<ICategoryArrow, int>> dictionary;

        IComponentCollection IDesktopCodeCreator.ComponentCollection => collection;

        #region  IDesktopCodeCreator implemtation

        Tuple<Dictionary<ICategoryObject, int>, Dictionary<ICategoryArrow, int>> IDesktopCodeCreator.Enumeration => dictionary;

     
        Dictionary<string, byte[]> IAdditionalFiles.Files => Files;

        List<string> IDesktopCodeCreator.CreateCode(IComponentCollection collection, string namespacE, string className, bool staticClass)
        {
            Files.Clear();
            return CreateCode(collection, namespacE, className, staticClass);
        }

        #endregion
        protected virtual List<string> CreateCode(IComponentCollection collection, string namespacE, string className, bool staticClass)
        {
            this.collection = collection;
            dictionary = performer.Enumerate(collection);
            performer.Get(collection, out categoryObjects, out categoryArrows, out objects, out arrows);
            return new List<string>();

        }

        protected abstract List<string> CreateClasses(IComponentCollection collection, string namespacE, string className, bool staticClass);

        protected abstract List<string> CreateObjects(IComponentCollection collection, string namespacE, string className, bool staticClass);

        protected abstract List<string> CreateLinks(IComponentCollection collection, string namespacE, string className, bool staticClass);
    }
}
