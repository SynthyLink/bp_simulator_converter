using BaseTypes.Attributes;
using BaseTypes.CodeCreator.Interfaces;
using Diagram.Interfaces;
using Diagram.UI.Interfaces;
using ErrorHandler;
using FormulaEditor;
using FormulaEditor.CodeCreators;
using FormulaEditor.CodeCreators.Interfaces;
using FormulaEditor.Interfaces;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataPerformer.Formula.Java
{
    [Language("Java")]
    internal class TreeCodeCreator : AbstractCodeCreator, IOperationSeparatorCreator
    {
        object current;

        Performer performer = new Performer();

        ITypeCreator typeCreator;


        internal TreeCodeCreator()
        {
            this.AddTreeCodeCreator();
            typeCreator = performer.GetLaguageObject<ITypeCreator>(this);
        }


        string[] IOperationSeparatorCreator.this[ObjectFormulaTree tree] => throw new OwnNotImplemented();

        protected override ITypeCreator TypeCreator => typeCreator;

        public override ITreeCodeCreator Create(object obj, ObjectFormulaTree[] trees)
        {
            var classCodeCreator = performer.GetLaguageObject<IClassCodeCreator>(this);
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
