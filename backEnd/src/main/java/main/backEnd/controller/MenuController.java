package main.backEnd.controller;

import main.backEnd.entities.Menu;
import main.backEnd.service.ComidaService;
import main.backEnd.service.MenuService;
import main.backEnd.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
@CrossOrigin
public class MenuController {

    @Autowired
    private MenuService menuService;
    @Autowired
    private PedidoService pedidoService;
    @Autowired
    private ComidaService comidaService;

    // generar los menus correspondientes para cada dia y semana y devolverlos en la seccion menu.
    @GetMapping("/dia/{dia}")
    public ResponseEntity<List<Menu>> obtenerMenusPorDia(@PathVariable int dia) {
        List<Menu> menus = menuService.obtenerMenusPorDia(dia);
        if (menus.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(menus,HttpStatus.OK);
    }
}

