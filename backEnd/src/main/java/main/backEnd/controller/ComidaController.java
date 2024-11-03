package main.backEnd.controller;

import main.backEnd.entities.Comida;
import main.backEnd.repository.ComidaRepository;
import main.backEnd.service.ComidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        try {
            Comida nuevaComida = comidaService.saveComida(comida);
            return ResponseEntity.ok(nuevaComida);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Comida> modifyComida(@PathVariable Long id, @RequestBody Comida comida) {
        Comida nuevaComida = comidaService.modifyComida(id, comida);
        // verificacion si existe la comida, y modificacion dentro del servicio.
        if (nuevaComida != null) {
            // si es distinto a null, entonces tiro el ok.
            return ResponseEntity.ok(nuevaComida);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // busco la comida por id y si está devuelvo true, si no, false y no hago nada.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComida(@PathVariable Long id) {
        boolean isRemoved = comidaService.deleteComida(id);
        // si es true y se removió entonces buildeo, si no, no.
        if (isRemoved) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
