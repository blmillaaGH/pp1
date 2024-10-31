package main.backEnd.service;

import main.backEnd.entities.Comida;
import main.backEnd.repository.ComidaRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComidaService {
    @Autowired
    private ComidaRepository comidaRepository;

    public Optional<Comida> findByNombre(String nombre) {
        return comidaRepository.findByNombre(nombre);
    }

    public Comida crearComida(String nombre) {
        Comida comida = new Comida();
        comida.setNombre(nombre);
        return comidaRepository.save(comida);
    }
}
