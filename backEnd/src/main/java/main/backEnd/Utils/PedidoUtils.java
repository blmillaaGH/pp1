package main.backEnd.Utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class PedidoUtils {
    public static String generarNumeroPedido() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return LocalDateTime.now().format(formatter);
    }
}
