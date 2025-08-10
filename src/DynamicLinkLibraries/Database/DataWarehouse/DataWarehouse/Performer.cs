using DataWarehouse.Classes;
using DataWarehouse.Interfaces;
using DataWarehouse.Interfaces.Async;
using ErrorHandler;
using NamedTree;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Xml.Linq;


namespace DataWarehouse
{
    /// <summary>
    /// Pefrormer of operations
    /// </summary>
    public class Performer
    {

        #region Ctor

        public Performer()
        {

        }

        #endregion

        #region Fields

        /// <summary>
        /// Type of error
        /// </summary>
        /// <param name="o">Error object</param>
        /// <returns>Type of error</returns>
        public ErrorType GetErrorType(object o)
        {
            var issue = o as Issue;
            return issue.ErrorType;
        }

        /// <summary>
        /// Saves node
        /// </summary>
        public ISaveNode Saver
        {
            get;
            set;
        }


        /// <summary>
        /// Remove node action
        /// </summary>
        private event Action<INode> removeNode;

        /// <summary>
        /// Add node action
        /// </summary>
        private event Action<IDirectory, INode> addNode;

        /// <summary>
        /// Change node
        /// </summary>
        private Action<INode> changeNode = (INode node) => { };

        /// <summary>
        /// Exception event
        /// </summary>
        Action<Exception> onError = (Exception exception) => { };

        /// <summary>
        /// Message event
        /// </summary>
        Action<string> onMessage = (string message) => { };


        #endregion

        #region Public Members

        #region Copy

        public async Task Copy(IDirectory dir, DirectoryInfo directoryInfo, List<Task> l)
        {
            if (dir is IDirectoryAsync async)
            {
                var t = async.LoadLeaves();
                l.Add(t);
                await t;
                IChildren<ILeaf> leaves = dir;
                var children = leaves.Children;
                foreach (var item in children)
                {
                    var name = item.Name;
                    var descrpition = item.Description;
                    var fn = Path.Combine(directoryInfo.FullName, name);
                    using var writer = new StreamWriter(fn + ".txt");
                    writer.WriteLine(descrpition);
                    if (item is IDataAsync datasync)
                    {
                        var tad = datasync.GetDataAsync();
                        l.Add(tad);
                        await tad;
                        var bt = tad.Result;
                        using var stream = File.OpenWrite(fn);
                        stream.Write(bt);
                    }
                 }
                var td = async.LoadChildren();
                l.Add(td);
                await td;
                IChildren<IDirectory> dirs  = dir;
                var dchildren = dirs.Children;
                foreach (var dr in dchildren)
                {
                    var name = dr.Name;
                    var descrpition = dr.Description;
                    var fn = Path.Combine(directoryInfo.FullName, name);
                    using var writer = new StreamWriter(fn + ".description.txt");
                    writer.WriteLine(descrpition);
                    var di = directoryInfo.CreateSubdirectory(name);
                    var tcc = Copy(dr, di, l);
                }
            }
        }

        /// <summary>
        /// Copy
        /// </summary>
        /// <param name="from">From</param>
        /// <param name="to">To</param>
        public void Copy(IDatabaseInterface from, IDatabaseInterface to)
        {
            var f = from.GetRoots();
            var t = to.GetRoots();
            if (f.Length != t.Length)
            {
                return;
            }
            for (var i = 0; i < f.Length; i++)
            {
                Copy(f[i], t[i]);
            }
        }

        /// <summary>
        /// Copy
        /// </summary>
        /// <param name="from">from</param>
        /// <param name="to">to</param>
        public void Copy(IDirectory from, IDirectory to)
        {
            if (to == null)
            {
                throw new OwnException();
            }
            to.Post();
            IChildren<IDirectory> children = from;
            foreach (var child in children.Children)
            {
                if (child.Name != null)
                {
                    var d = to.Add(child);
                    Copy(child, d);
                }
                else
                {

                }
            }
            IChildren<ILeaf> leaves = from;
            foreach (var leave in leaves.Children)
            {
                if (leave.Name != null)
                {
                    to.AddChild(leave);
                }
                else
                {

                }
            }

        }

        #endregion



        /// <summary>
        /// Message event
        /// </summary>
        public event Action<string> OnMessage
        {
            add
            {
                if (value != null)
                {
                    onMessage += value;
                }
            }
            remove
            {
                if (value != null)
                {
                    onMessage -= value;
                }
            }
        }

        /// <summary>
        /// Exception event
        /// </summary>
        public  event Action<Exception> OnError
        {
            add
            {
                if (value != null)
                {
                    onError += value;
                }
            }
            remove
            {
                if (value != null)
                {
                    onError -= value;
                }
            }
        }

        /// <summary>
        /// Adds node to a directory
        /// </summary>
        /// <param name="directory">Parent directory</param>
        /// <param name="node">The node</param>
        public void AddNode(IDirectory directory, INode node)
        {
            addNode?.Invoke(directory, node);
        }

        /// <summary>
        /// Removes node
        /// </summary>
        /// <param name="node">Node to remove</param>
        public void Remove(INode node)
        {
            removeNode?.Invoke(node);
        }

        /// <summary>
        /// Change node
        /// </summary>
        /// <param name="node">Node to change</param>
        public void Change(INode node)
        {
            changeNode(node);
        }

        /// <summary>
        /// Add node event
        /// </summary>
        public event Action<IDirectory, INode> OnAddNode
        {
            add { addNode += value; }
            remove { addNode -= value; }
        }

        /// <summary>
        /// Remove node event
        /// </summary>
        public event Action<INode> OnRemoveNode
        {
            add { removeNode += value; }
            remove { removeNode -= value; }
        }

        /// <summary>
        /// Change node event
        /// </summary>
        public event Action<INode> OnChangeNode
        {
            add { changeNode += value; }
            remove { changeNode -= value; }
        }

        /// <summary>
        /// Finder of database
        /// </summary>
        public IDatabaseCoordinator Coordinator
        { 
            get; 
            set; 
        }

        /// <summary>
        /// Saves node
        /// </summary>
        /// <param name="node">Node to save</param>
        public  void Save(INode node)
        {
            Saver.Save(node);
        }

        /// <summary>
        /// Shows error message
        /// </summary>
        /// <param name="message">Message</param>
        public void ShowError(string message)
        {
            onMessage(message);
        }

        /// <summary>
        /// Shows error
        /// </summary>
        /// <param name="exception">Exception</param>
        public void ShowError(Exception exception)
        {
            onError(exception);
        }


        #endregion
    }
}
