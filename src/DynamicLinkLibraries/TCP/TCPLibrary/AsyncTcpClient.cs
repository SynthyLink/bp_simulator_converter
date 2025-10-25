namespace TCPLibrary
{
    using System;
    using System.Net;
    using System.Net.Sockets;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    public class AsyncTcpClient : IDisposable
    {
        private Socket _socket;
        private byte[] _buffer;
        private SocketAsyncEventArgs _receiveEventArgs;
        private readonly string _host;
        private readonly int _port;
        private readonly int _bufferSize;
        private bool _isConnected = false;
        private readonly object _connectLock = new object();
        private readonly object _receiveLock = new object(); // To ensure only one receive is pending

        // Event to notify when data is received and processed
        public event EventHandler<byte[]> DataReceived;
        // Event to notify of connection status changes
        public event EventHandler<bool> ConnectionStatusChanged;
        // Event to notify of errors
        public event EventHandler<Exception> ErrorOccurred;

        public bool IsConnected => _isConnected;

        public AsyncTcpClient(string host, int port, int bufferSize = 4096)
        {
            _host = host ?? throw new ArgumentNullException(nameof(host));
            _port = port;
            _bufferSize = bufferSize > 0 ? bufferSize : 4096; // Default buffer size

            // Initialize SocketAsyncEventArgs for receiving
            _receiveEventArgs = new SocketAsyncEventArgs();
            _receiveEventArgs.Completed += OnReceiveCompleted;
        }

        public void Connect()
        {
            lock (_connectLock)
            {
                if (_isConnected) return;

                try
                {
                    _socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                    var endpoint = new IPEndPoint(IPAddress.Parse(_host), _port);

                    // Initialize SocketAsyncEventArgs for connecting
                    var connectEventArgs = new SocketAsyncEventArgs();
                    connectEventArgs.RemoteEndPoint = endpoint;
                    connectEventArgs.Completed += OnConnectCompleted;

                    // Start asynchronous connection
                    if (!_socket.ConnectAsync(connectEventArgs))
                    {
                        // If connection is synchronous (rare but possible), process the completion immediately
                        ProcessConnectCompletion(connectEventArgs);
                    }
                }
                catch (Exception ex)
                {
                    OnError(ex);
                    CloseConnection(); // Ensure cleanup if connect fails early
                }
            }
        }

        private void OnConnectCompleted(object sender, SocketAsyncEventArgs e)
        {
            ProcessConnectCompletion(e);
        }

        private void ProcessConnectCompletion(SocketAsyncEventArgs e)
        {
            if (e.SocketError == SocketError.Success)
            {
                _isConnected = true;
                OnConnectionStatusChanged(true);

                // Allocate buffer and start the first receive operation
                _buffer = new byte[_bufferSize];
                _receiveEventArgs.SetBuffer(_buffer, 0, _bufferSize);

                // Start the first receive operation
                if (!_socket.ReceiveAsync(_receiveEventArgs))
                {
                    // If receive is synchronous, process it immediately
                    ProcessReceiveCompletion(_receiveEventArgs);
                }
            }
            else
            {
                OnError(new SocketException((int)e.SocketError));
                CloseConnection();
            }
            e.Dispose(); // Dispose the connect EventArgs
        }

        private void OnReceiveCompleted(object sender, SocketAsyncEventArgs e)
        {
            ProcessReceiveCompletion(e);
        }

        private void ProcessReceiveCompletion(SocketAsyncEventArgs e)
        {
            if (e.SocketError == SocketError.Success && e.BytesTransferred > 0)
            {
                // Data received successfully
                byte[] receivedData = new byte[e.BytesTransferred];
                Array.Copy(e.Buffer, e.Offset, receivedData, 0, e.BytesTransferred);

                // Process the received data (raise event for consumers)
                OnDataReceived(receivedData);

                // Immediately initiate the next receive operation
                // Use a lock to ensure only one receive is pending at a time
                lock (_receiveLock)
                {
                    // Re-set the buffer if it's been modified or if we need to reuse the same EventArgs
                    // For simplicity here, we'll always re-set. In performance-critical scenarios,
                    // you might reuse the same EventArgs.
                    e.SetBuffer(_buffer, 0, _bufferSize);

                    if (!_socket.ReceiveAsync(e))
                    {
                        // If receive is synchronous, process it immediately
                        ProcessReceiveCompletion(e);
                    }
                }
            }
            else if (e.SocketError == SocketError.Success && e.BytesTransferred == 0)
            {
                // Connection closed gracefully by the server
                Console.WriteLine("Server closed the connection gracefully.");
                CloseConnection();
            }
            else
            {
                // An error occurred or connection was lost
                OnError(new SocketException((int)e.SocketError));
                CloseConnection();
            }
        }

        public void CloseConnection()
        {
            lock (_connectLock) // Use connectLock as it also guards the socket state
            {
                if (!_isConnected) return;

                _isConnected = false;
                OnConnectionStatusChanged(false);

                try
                {
                    // Remove event handlers to prevent memory leaks
                    if (_receiveEventArgs != null)
                    {
                        _receiveEventArgs.Completed -= OnReceiveCompleted;
                    }

                    // Close the socket
                    _socket?.Shutdown(SocketShutdown.Both);
                    _socket?.Close();
                    _socket = null;

                    // Dispose the event args
                    _receiveEventArgs?.Dispose();
                    _receiveEventArgs = null;

                    // Clear buffer
                    _buffer = null;
                }
                catch (Exception ex)
                {
                    OnError(ex);
                }
            }
        }

        protected virtual void OnDataReceived(byte[] data)
        {
            DataReceived?.Invoke(this, data);
        }

        protected virtual void OnConnectionStatusChanged(bool isConnected)
        {
            ConnectionStatusChanged?.Invoke(this, isConnected);
        }

        protected virtual void OnError(Exception ex)
        {
            ErrorOccurred?.Invoke(this, ex);
        }

        public void Dispose()
        {
            CloseConnection();
            // No need to dispose _receiveEventArgs here again if CloseConnection was called
        }
    }

    // Example Usage
    public class Program
    {
        private static bool _clientRunning = true;
        private static int _totalBytesReceived = 0;

        public static async Task Main(string[] args)
        {
            // --- Configuration ---
            string serverHost = "127.0.0.1"; // Replace with your server's IP/hostname
            int serverPort = 8888;           // Replace with your server's port
            int bufferSize = 8192;           // Size of the receive buffer

            // --- Create and Configure the Client ---
            using (var client = new AsyncTcpClient(serverHost, serverPort, bufferSize))
            {
                // --- Subscribe to Events ---
                client.DataReceived += Client_DataReceived;
                client.ConnectionStatusChanged += Client_ConnectionStatusChanged;
                client.ErrorOccurred += Client_ErrorOccurred;

                Console.WriteLine($"Attempting to connect to {serverHost}:{serverPort}...");
                client.Connect();

                // Keep the application running until user presses Enter
                Console.WriteLine("Press Enter to stop the client...");
                Console.ReadLine();

                _clientRunning = false; // Signal to stop processing
                client.CloseConnection(); // Explicitly close if not already closed
            }
            Console.WriteLine("Client stopped.");
        }

        private static void Client_DataReceived(object sender, byte[] data)
        {
            // Process the received data chunk
            int receivedCount = data.Length;
            Interlocked.Add(ref _totalBytesReceived, receivedCount); // Thread-safe increment

            // In a real application, you'd parse or process 'data' here.
            // For demonstration, we'll just print a snippet and the count.
            Console.WriteLine($"Received {receivedCount} bytes. Total: {_totalBytesReceived}. First 50 bytes: {(data.Length > 50 ? Encoding.ASCII.GetString(data, 0, 50) : Encoding.ASCII.GetString(data)).Replace("\r", "\\r").Replace("\n", "\\n")}...");

            // Simulate some processing time. This is important to see how the
            // asynchronous nature works. If processing takes longer than the
            // network receives, the data will queue up in the received buffer or
            // potentially cause backpressure if the server implements it.
            //
            // If you have very long processing, consider using a separate
            // thread pool or task queue for the actual processing to avoid
            // blocking the event loop handler.
            //
            // Task.Run(async () => await ProcessDataAsync(data)); // Example of offloading processing
        }

        private static void Client_ConnectionStatusChanged(object sender, bool isConnected)
        {
            Console.WriteLine($"Connection status: {(isConnected ? "Connected" : "Disconnected")}");
        }

        private static void Client_ErrorOccurred(object sender, Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Error: {ex.Message}");
            Console.ResetColor();
            // If an error occurs, the client's CloseConnection() will likely be called,
            // but you might want to decide if you want to attempt reconnection.
        }

        // Example of processing data off the main event loop thread
        // private static async Task ProcessDataAsync(byte[] data)
        // {
        //     Console.WriteLine($"Processing data chunk of size {data.Length} on background thread...");
        //     await Task.Delay(50); // Simulate work
        //     Console.WriteLine($"Finished processing chunk.");
        // }
    }
}