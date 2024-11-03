package main.backEnd.controller;

import main.backEnd.entities.Comida;
import main.backEnd.repository.ComidaRepository;
import main.backEnd.service.ComidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comidas")
@CrossOrigin
public class ComidaController {

    @Autowired
    ComidaService comidaService;

    // getMapping que devuelve un response de la lista de comidas que solicito al service.
    @GetMapping
    public ResponseEntity<List<Comida>> findAllComidas() {
        List<Comida> comidas = comidaService.findAllComidas();
        // devuelvo el response
        return ResponseEntity.ok(comidas);
    }

    @PostMapping
    public ResponseEntity<Comida> insertNewComida(@RequestBody Comida comida) {
        // falta validacion para no sobreescribir comidas.
        Comida nuevaComida = comidaService.saveComida(comida);
        return ResponseEntity.ok(nuevaComida);
    }

}
