package communication;

import android.os.AsyncTask;

public class FetchDataTask extends AsyncTask<String, Void, String> {
    @Override
    protected String doInBackground(String... strings) {
        try {
            var client = new AsyncTcpClient("31.10.82.229", 7168, null);
            client.start();
            client.sendMessage("TTT");
        }
        catch (Exception e)
        {
var x = e.getMessage();
        }
        return "";
    }

    @Override
    protected void onPostExecute(String result) {
        // Update your UI elements here with the 'result'
        // This method runs on the main thread
        System.out.println(result);
    }
}
