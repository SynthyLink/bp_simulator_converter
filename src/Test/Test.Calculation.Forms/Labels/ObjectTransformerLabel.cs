using CategoryTheory;

using Diagram.UI.Labels;

using System.Runtime.Serialization;

using Test.Calculation.Forms.UserControls;

namespace Test.Calculation.Forms.Labels
{
    [Serializable]
    public class ObjectTransformerLabel : UserControlBaseLabel
    {
        #region Fields

        UserControlObjectTransformer uc;

        ObjectTransformer transformer;

        Form form = null;

        #endregion

        #region Ctor

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="type">Type</param>
        /// <param name="kind">Kind</param>
        /// <param name="icon">Icon</param>
        public ObjectTransformerLabel(Type type, string kind, Image icon)
            : base(type, kind, icon)
        {
            BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
        }


        /// <summary>
        /// Deserialization constructor
        /// </summary>
        /// <param name="info">Serialization info</param>
        /// <param name="context">Streaming context</param>
        private ObjectTransformerLabel(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
        }


        #endregion

        #region Overriden

        /// <summary>
        /// Internal control
        /// </summary>
        protected override UserControl Control
        {
            get
            {
                uc = new UserControlObjectTransformer();
                return uc;
            }
        }

        /// <summary>
        /// Object
        /// </summary>
        protected override ICategoryObject Object
        {
            get
            {
                return transformer as ICategoryObject;
            }
            set
            {
                transformer = value.GetObject<ObjectTransformer>();
                if (uc != null)
                {
                    uc.Transformer = transformer;
                }
            }
        }

        /// <summary>
        /// Associated form
        /// </summary>
        public override object Form
        {
            get
            {
                return null;
            }
        }

        /// <summary>
        /// Creates Form
        /// </summary>
        public override void CreateForm()
        {

        }

        #endregion
    }
}

