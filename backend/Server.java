java
import com.sun.net.httpserver.*;
import java.io.*;
import java.net.*;

public class Server {
 public static void main(String[] args) throws Exception {
  HttpServer server = HttpServer.create(new InetSocketAddress(8080),0);

  server.createContext("/cadastro", e -> {
    responder(e, "Usuário cadastrado OK");
  });

  server.createContext("/login", e -> {
    responder(e, "Login OK");
  });

  server.createContext("/pix", e -> {
    responder(e, "Pagamento PIX gerado (simulado)");
  });

  server.start();
  System.out.println("Rodando...");
 }

 static void responder(HttpExchange e, String r) throws IOException{
  e.sendResponseHeaders(200, r.length());
  OutputStream os = e.getResponseBody();
  os.write(r.getBytes());
  os.close();
 }
}