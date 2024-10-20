package main.backEnd.service;

import main.backEnd.entities.Menu;
import main.backEnd.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    MenuRepository repository;

    public List<Menu> obtenerMenusPorDia(int dia) {
        return repository.findByDia(dia); // devolvemos la lista de menus disponibles
    }
}
