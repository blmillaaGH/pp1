package main.backEnd.controller;

import main.backEnd.Utils.PedidoUtils;
import main.backEnd.entities.Menu;
import main.backEnd.entities.Pedido;
import main.backEnd.entities.PedidoDto;
import main.backEnd.service.MenuService;
import main.backEnd.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    // traer los menus persistidos y asociados a cada pedido.

    @Autowired
    private PedidoService pedidoService;
    @Autowired
    private MenuService menuService;

    @PostMapping
    public ResponseEntity<Pedido> createPedido(@RequestBody PedidoDto pedidoDto) {
        try {
            Pedido nuevoPedido = new Pedido();
            nuevoPedido.setNumeroPedido(PedidoUtils.generarNumeroPedido());
            nuevoPedido.setSemana(pedidoDto.getSemana());

            List<Menu> menus = pedidoDto.getMenus().stream().map(menuDto -> {
                Menu menu = menuService.findByDiaAndComidaId(menuDto.getDia(), menuDto.getComidaId())
                        .orElseThrow(() -> new NoSuchElementException("Menu no encontrado"));
                return menu;
            }).collect(Collectors.toList());

            nuevoPedido.setMenusPedido(menus);
            Pedido savedPedido = pedidoService.savePedido(nuevoPedido);
            return new ResponseEntity<>(savedPedido, HttpStatus.CREATED);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping
    public ResponseEntity<List<Pedido>> getAllPedidos() {
        List<Pedido> pedidos = pedidoService.obtenerTodosLosPedidos();
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }
}
