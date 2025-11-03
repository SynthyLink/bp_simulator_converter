package communication;

import java.nio.charset.StandardCharsets;

public class ConsoleByteReceiver implements IByteReceiver

{
    @Override
    public void Receive(byte[] bytes, int length) {
      var  str = new String(bytes, StandardCharsets.UTF_8);
      System.out.println(str);
    }
}
