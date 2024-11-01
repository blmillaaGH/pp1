package main.backEnd.controller;

import main.backEnd.repository.ComidaRepository;
import main.backEnd.service.ComidaService;
import org.springframework.beans.factory.annotation.Autowired;

public class ComidaController {

    @Autowired
    ComidaService comidaService;
    @Autowired
    ComidaRepository comidaRepository;

//        @PostMapping("/admin/nuevaComida")
//        public Comida nuevaComida(@RequestParam ) {
//        }
}
