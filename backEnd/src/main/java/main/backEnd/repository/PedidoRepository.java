package main.backEnd.repository;

import main.backEnd.entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    // tiene que hacer el save del pedido (lista de menus)
    // tiene que devolver la lista de menus para mostrarlos en ver pedidos y en el historial (ultimos 4 y ultimos 4 sin los ultimos 4)
}
