package main.backEnd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.backEnd.entities.Menu;
import main.backEnd.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    MenuRepository repository;

    public List<Menu> obtenerMenusPorDia(int dia) {
        return repository.findByDia(dia+1); // devolvemos la lista de menus disponibles
    }
}
