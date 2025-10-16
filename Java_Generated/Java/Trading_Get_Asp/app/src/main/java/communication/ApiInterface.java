package communication;
import retrofit2.Call;
import retrofit2.http.GET;

public interface ApiInterface {
    @GET("todos")
    Call<ResponseData> getData();
}