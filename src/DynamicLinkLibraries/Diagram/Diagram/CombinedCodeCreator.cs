using System.Collections.Generic;
using Diagram.Interfaces;
using Diagram.UI.CodeCreators.Interfaces;
using Diagram.UI.Interfaces;
using ErrorHandler;

namespace Diagram.UI
{
    /// <summary>
    /// Combined class code creator
    /// </summary>
    public class CombinedCodeCreator : IClassCodeCreator, ICurrentObject, IAdditionalFiles
    {

        object current;
        public CombinedCodeCreator(string language)
        {
            Language = language;   
        }

    
        protected virtual string Language { get; set; }

        protected  IDesktopCodeCreator DesktopCodeCreator
        { get; set; }

        object ICurrentObject.CurrentObject => current;

        Dictionary<string, byte[]> IAdditionalFiles.Files => Files;

        protected virtual Dictionary<string, byte[]> Files { get; } = new();

        #region Fields

        List<IClassCodeCreator> list = new List<IClassCodeCreator>();

        #endregion

        #region IClassCodeCreator Members

        List<string> IClassCodeCreator.CreateCode(string preffix, object obj, string volume)
        {
            current = obj;
            Files.Clear();
            foreach (IClassCodeCreator creator in list)
            {
                if (creator is IAdditionalFiles additionalFiles)
                {
                    additionalFiles.Files.Clear();
                }
                List<string> l = creator.CreateCode(preffix, obj, volume);
                if (l != null)
                {
                    if (creator is IAdditionalFiles af)
                    {
                        foreach (var item in af.Files)
                        {
                            Files[item.Key] = item.Value;
                        }
                        af.Files.Clear();
                    }
                    return l;
                }
            }
            throw new IncludedException("Type \"" + obj.GetType() + "\" is not supported ", obj);
        }

        #endregion

        #region Public Members

        public void Add(IClassCodeCreator creator)
        {
            list.Add(creator);
        }

        #endregion
    }
}
