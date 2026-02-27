using Abstract2DConverters.Interfaces;

using NamedTree;

namespace Abstract2DConverters.Nodes
{
    public class AbstractNode2DUI : INode2DUI
    {


        protected AbstractNode2DUI(bool b)
        {
            Nodes = List;
        }

        protected event Action<INode2DUI> onAdd;

        protected event Action<INode2DUI> onRemove;

        protected virtual INode2DUI Value => this;

        protected virtual string Name { get; set; }
        protected virtual INode<INode2DUI> Parent { get; set; }

        protected virtual List<INode<INode2DUI>> List
        {
            get;

        } = new List<INode<INode2DUI>>();

        protected virtual IEnumerable<INode<INode2DUI>> Nodes { get => Nodes; set { } }

        protected virtual void Add(INode<INode2DUI> node)
        {
            List.Add(node);
            onAdd(node as INode2DUI);
        }

        protected virtual void Remove(INode<INode2DUI> node)
        {
            List.Remove(node);
            onRemove(node as INode2DUI);
        }

        protected virtual string Description { get; set; }



            #region INode2D Implemetation

            INode<INode2DUI> INode<INode2DUI>.Parent { get => Parent; set => Parent = value; }
        IEnumerable<INode<INode2DUI>> INode<INode2DUI>.Nodes { get => Nodes; set { } }

        INode2DUI INode<INode2DUI>.Value => Value;

        string INamed.Name { get => Name; set => Name = value; }
        string IDescription.Description { get => Description; set => Description = value; }

        event Action<INode2DUI> INode<INode2DUI>.OnAdd
        {
            add
            {
                onAdd += value;
            }

            remove
            {
                onAdd -= value;
            }
        }

        event Action<INode2DUI> INode<INode2DUI>.OnRemove
        {
            add
            {
                onRemove += value;
            }

            remove
            {
                onRemove -= value;
            }
        }

        void INode<INode2DUI>.Add(INode<INode2DUI> node)
        {
            Add(node);
        }

        void INode<INode2DUI>.Remove(INode<INode2DUI> node)
        {
            Remove(node);
        }

        #endregion
    }
}
