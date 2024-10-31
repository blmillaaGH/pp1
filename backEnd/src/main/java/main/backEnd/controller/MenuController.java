package main.backEnd.controller;

import main.backEnd.dto.MenuRequest;
import main.backEnd.entities.Menu;
import main.backEnd.service.ComidaService;
import main.backEnd.service.MenuService;
import main.backEnd.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;
    @Autowired
    private PedidoService pedidoService;
    @Autowired
    private ComidaService comidaService;

    // generar los menus correspondientes para cada dia y semana y devolverlos en la seccion menu.
    @GetMapping("/semana/{semana}/dia/{dia}")
    public ResponseEntity<List<Menu>> getMenusBySemanaAndDia(@PathVariable int semana, @PathVariable int dia) {
        List<Menu> menus = menuService.getMenusBySemanaAndDia(semana, dia);
        if (menus.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(menus,HttpStatus.OK);
    }

      @PostMapping("/guardar")
    public ResponseEntity<String> guardarMenu(@RequestBody MenuRequest menuRequest) {
        menuService.guardarMenu(menuRequest);
        return ResponseEntity.ok("Menú guardado exitosamente");
    }
}

