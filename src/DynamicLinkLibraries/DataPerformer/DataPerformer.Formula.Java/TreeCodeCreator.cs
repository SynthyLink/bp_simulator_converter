using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
using Diagram.Interfaces;
using Diagram.UI.Interfaces;
using ErrorHandler;
using FormulaEditor;
using FormulaEditor.CodeCreators;
using FormulaEditor.CodeCreators.Interfaces;
using FormulaEditor.Interfaces;

namespace DataPerformer.Formula.Java
{
    [Language("Java")]
    internal class TreeCodeCreator : BaseTreeCodeCreator
    {
        internal TreeCodeCreator()
            : base()
        {
            this.AddTreeCodeCreator();
        }
    }

    internal class BaseTreeCodeCreator : AbstractCodeCreator, IOperationSeparatorCreator
    {
        object current;

        string language = "Java";
        IClassCodeCreator classCodeCreator;
        ITypeCreator typeCreator;

        Performer performer = new Performer();

  
        protected BaseTreeCodeCreator()
        {
            typeCreator = performer.GetLaguageObject<ITypeCreator>(language);
            classCodeCreator = performer.GetLaguageObject<IClassCodeCreator>(language);
        }


        string[] IOperationSeparatorCreator.this[ObjectFormulaTree tree] => throw new OwnNotImplemented();

        protected override ITypeCreator TypeCreator => typeCreator;

        public override ITreeCodeCreator Create(object obj, ObjectFormulaTree[] trees)
        {
            if (classCodeCreator is ICurrentObject currentObject)
            {
                var co = currentObject.CurrentObject;
                if (current != co)
                {
                    current = co;
                    if (co is ITreeCollection tc)
                    {
                        Set(tc.Trees);
                    }
                }
            }
            throw new OwnNotImplemented();
        }

        public override string GetConstValue(ObjectFormulaTree tree)
        {
            throw new OwnNotImplemented();
        }
    }
}
