using System;
using System.Collections.Generic;
using System.Text;

using NamedTree.Interfaces;

namespace NamedTree
{
    /// <summary>
    /// Universal factory implemebtation
    /// </summary>
    public class UniversalFactory : IFactory
    {

        Dictionary<string, object> dict = new Dictionary<string, object>();

        /// <summary>
        /// Gets a facrory
        /// </summary>
        /// <typeparam name="T">The type</typeparam>
        /// <param name="name">The name</param>
        /// <returns>The factory</returns>
        protected virtual T Get<T>(string name) where T : class
        {
            return dict[name] as T;
        }

        /// <summary>
        /// Sets the factory
        /// </summary>
        /// <typeparam name="T">The type</typeparam>
        /// <param name="name">The name</param>
        /// <param name="t">The factory</param>
        protected virtual void Set<T>(string name, T t)
        {
            dict[name] = t;
        }


        /// <summary>
        /// Gets a facrory
        /// </summary>
        /// <typeparam name="T">The type</typeparam>
        /// <param name="name">The name</param>
        /// <returns>The factory</returns>
        T IFactory.Get<T>(string name)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Sets the factory
        /// </summary>
        /// <typeparam name="T">The type</typeparam>
        /// <param name="name">The name</param>
        /// <param name="t">The factory</param>
        void IFactory.Set<T>(string name, T t)
        {
            throw new NotImplementedException();
        }
    }
}
