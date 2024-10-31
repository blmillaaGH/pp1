package main.backEnd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.backEnd.dto.MenuRequest;
import main.backEnd.entities.Comida;
import main.backEnd.entities.Menu;
import main.backEnd.repository.MenuRepository;

@Service
public class MenuService {

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    private ComidaService comidaService;

    public List<Menu> getMenusBySemanaAndDia(int semana, int dia) {
        return menuRepository.findBySemanaAndDia(semana,dia); // devolvemos la lista de menus disponibles para X dia y semana
    }

    // busca el menu que se le paso por PedidoController en base al día y el comida ID para agregarlo al pedido
    public Optional<Menu> findByDiaAndComidaId(int dia, Long comidaId) {
        return menuRepository.findByDiaAndComidaId(dia, comidaId);
    }

    public void guardarMenu(MenuRequest menuRequest) {
        for (String nombreComida : menuRequest.getComidas()) {
            Menu menu = new Menu();
            menu.setDia(menuRequest.getDia());
            menu.setSemana(menuRequest.getSemana());

            // Busca la comida por nombre o crea una nueva
            Comida comida = comidaService.findByNombre(nombreComida)
                    .orElseGet(() -> comidaService.crearComida(nombreComida));
            menu.setComida(comida);

            menuRepository.save(menu);
        }
    }
}
