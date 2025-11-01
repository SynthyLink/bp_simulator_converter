package communication;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

public class AsyncTcpClient {

    private Selector selector;
    private SocketChannel clientChannel;
    private ByteBuffer readBuffer;

    public AsyncTcpClient(String host, int port) throws IOException {
        // 1. Create a Selector
        this.selector = Selector.open();

        // 2. Create a SocketChannel and configure it for non-blocking
        this.clientChannel = SocketChannel.open();
        this.clientChannel.configureBlocking(false);

        // 3. Initiate connection
        if (clientChannel.connect(new InetSocketAddress(host, port))) {
            // Connection established immediately (rare for remote servers)
            System.out.println("Connected immediately.");
            // If connected immediately, we need to register for read operations
            registerForRead();
        } else {
            // Connection is in progress, register for OP_CONNECT
            this.clientChannel.register(selector, SelectionKey.OP_CONNECT);
            System.out.println("Connection initiated, waiting for completion...");
        }

        this.readBuffer = ByteBuffer.allocate(1024); // Allocate a buffer for reading
    }

    private void registerForRead() throws IOException {
        // Register for read operations
        this.clientChannel.register(selector, SelectionKey.OP_READ);
        System.out.println("Registered for read operations.");
    }

    public void start() throws IOException {
        while (true) {
            // 4. Wait for events (blocks until at least one channel is ready)
            int readyChannels = selector.select();

            if (readyChannels == 0) {
                // No channels are ready, continue or do other work
                continue;
            }

            // 5. Get the set of ready keys
            Set<SelectionKey> selectedKeys = selector.selectedKeys();
            Iterator<SelectionKey> keyIterator = selectedKeys.iterator();

            // 6. Process ready channels
            while (keyIterator.hasNext()) {
                SelectionKey key = keyIterator.next();
                keyIterator.remove(); // Remove the key from the selected set

                try {
                    if (key.isConnectable()) {
                        // Connection complete
                        if (clientChannel.finishConnect()) {
                            System.out.println("Connection successful!");
                            // Now that we're connected, register for read operations
                            registerForRead();
                            // You can also write something to the server here if needed
                            sendMessage("Hello from async client!");
                        } else {
                            // Connection failed (shouldn't happen if finishConnect returns false after isConnectable is true)
                            System.err.println("Connection failed.");
                            clientChannel.close();
                            return;
                        }
                    } else if (key.isReadable()) {
                        // Data available for reading
                        handleRead(key);
                    }
                    // You could also handle OP_WRITE if needed for sending data
                    // else if (key.isWritable()) {
                    //     handleWrite(key);
                    // }

                } catch (IOException e) {
                    System.err.println("Error processing key: " + e.getMessage());
                    key.cancel(); // Cancel the key
                    try {
                        key.channel().close(); // Close the channel
                    } catch (IOException ex) {
                        ex.printStackTrace();
                    }
                }
            }
        }
    }

    private void handleRead(SelectionKey key) throws IOException {
        SocketChannel channel = (SocketChannel) key.channel();
        readBuffer.clear(); // Clear the buffer for new data

        int bytesRead = channel.read(readBuffer);

        if (bytesRead == -1) {
            // Connection closed by server
            System.out.println("Connection closed by server.");
            key.cancel();
            channel.close();
            return;
        }

        if (bytesRead > 0) {
            readBuffer.flip(); // Prepare buffer for reading
            byte[] data = new byte[bytesRead];
            readBuffer.get(data);
            String message = new String(data);
            System.out.println("Received: " + message);
        }
    }

    public void sendMessage(String message) throws IOException {
        if (clientChannel != null && clientChannel.isConnected()) {
            ByteBuffer writeBuffer = ByteBuffer.wrap(message.getBytes());
            clientChannel.write(writeBuffer);
            System.out.println("Sent: " + message);
        } else {
            System.err.println("Cannot send message: Client not connected.");
        }
    }

    public void close() throws IOException {
        if (clientChannel != null) {
            clientChannel.close();
        }
        if (selector != null) {
            selector.close();
        }
    }

    public static void main(String[] args) {
        // Replace with your server's host and port
        String serverHost = "localhost";
        int serverPort = 12345;

        try {
            AsyncTcpClient client = new AsyncTcpClient(serverHost, serverPort);
            // Run the client in a separate thread to avoid blocking the main thread
            new Thread(() -> {
                try {
                    client.start();
                } catch (IOException e) {
                    e.printStackTrace();
                    System.err.println("Client encountered an error.");
                }
            }).start();

            // Example of sending a message after a delay
            Thread.sleep(2000); // Give the connection time to establish
            client.sendMessage("Hello World!");

            // Keep the main thread alive for a while to observe the client
            Thread.sleep(10000);
            client.close();
            System.out.println("Client closed.");

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}