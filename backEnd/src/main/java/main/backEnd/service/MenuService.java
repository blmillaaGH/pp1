package main.backEnd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.backEnd.entities.Menu;
import main.backEnd.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    MenuRepository menuRepository;

    public List<Menu> getMenusBySemanaAndDia(int semana, int dia) {
        return menuRepository.findBySemanaAndDia(semana,dia); // devolvemos la lista de menus disponibles para X dia y semana
    }

    // busca el menu que se le paso por PedidoController en base al día y el comida ID para agregarlo al pedido
    public Optional<Menu> findByDiaAndComidaId(int dia, Long comidaId) {
        return menuRepository.findByDiaAndComidaId(dia, comidaId);
    }
}
