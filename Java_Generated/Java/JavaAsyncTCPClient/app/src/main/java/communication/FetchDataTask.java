package communication;

import android.os.AsyncTask;

public class FetchDataTask extends AsyncTask<byte[], Void, byte[]> {

    String server;


    int port;

    IByteReceiver receiver;
    public  FetchDataTask(String  server, int port, IByteReceiver receiver)
    {
        this.server = server;
        this.port = port;
        this.receiver = receiver;
    }

    @Override
    protected byte[] doInBackground(byte[]... bytes) {
        try {
         //   var client = new AsyncTcpClient("31.10.82.229", 7168, null);
            var client = new AsyncTcpClient(server, port, receiver, true);
   //         client.sendBytes(bytes[0]);
            client.start(bytes[0]);

        }
        catch (Exception e)
        {
var x = e.getMessage();
        }
        return new  byte[0];
    }

    @Override
    protected void onPostExecute(byte[] result) {
        // Update your UI elements here with the 'result'
        // This method runs on the main thread
        System.out.println(result);
    }
}
