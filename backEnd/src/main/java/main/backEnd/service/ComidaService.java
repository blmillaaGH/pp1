package main.backEnd.service;

import main.backEnd.entities.Comida;
import main.backEnd.repository.ComidaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComidaService {
    @Autowired
    private ComidaRepository comidaRepository;

    public List<Comida> findAllComidas() {
        return comidaRepository.findAll();
    }

    public Comida saveComida(Comida comida) {
        return comidaRepository.save(comida);
    }

    public Comida modifyComida(Long id, Comida comida) {
        // verificacion si es existente o no, si no, return null, y no pasa por controller.
        Optional<Comida> comidaEsExistente = comidaRepository.findById(id);
        if (comidaEsExistente.isPresent()) {
            Comida nuevaComida = comidaEsExistente.get();
            nuevaComida.setNombre(comida.getNombre());
            return comidaRepository.save(nuevaComida);
        } else{
            return null;
        }
    }

    public boolean deleteComida(Long id) {
        if (comidaRepository.existsById(id)) {
            comidaRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
