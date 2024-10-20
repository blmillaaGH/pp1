package main.backEnd.controller;

import main.backEnd.entities.Menu;
import main.backEnd.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/menus")
public class MenuController {

    @Autowired
    MenuService service;

    @GetMapping("/dia/{dia}")
    public ResponseEntity<List<Menu>> getMenusPorDia(@PathVariable int dia) {
        List<Menu> menus = service.obtenerMenusPorDia(dia);
        if (menus.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(menus,HttpStatus.OK);
    }
}
