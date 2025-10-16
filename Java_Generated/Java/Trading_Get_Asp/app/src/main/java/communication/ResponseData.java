package communication;


import com.google.gson.annotations.SerializedName;

public class ResponseData {

    @SerializedName("body")
    private String body;


    public ResponseData(String body) {
        this.body = body;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }



}