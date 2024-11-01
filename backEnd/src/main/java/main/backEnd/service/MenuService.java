package main.backEnd.service;

import java.util.List;
import java.util.Optional;

import main.backEnd.entities.Comida;
import main.backEnd.repository.ComidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import main.backEnd.entities.Menu;
import main.backEnd.repository.MenuRepository;

@Service
public class MenuService {
    //      > (1) PUSH COMIDA (pushea una o más comida/s en bd)
    //      reutilizar modal actual con el textField nombreComida (modificar "menu" por "comida")
    //      (feature futura: control de stock)

    //      > 2(+) PUT MENU (meustra las comidas en bd)
    //      Toma el diaIdex del contenedor en el cual se utilizó el select y el semanaIndex
    //      para persistir el nuevo menu disponible para el usuario Ó eliminarlo bajo los mismos indices.

    // TIENE QUE MODIFICAR LA COMIDA SELECCIONADA Y NO TODA UNA LISTA DE LAS COMIDAS

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    private ComidaService comidaService;
    @Autowired
    private ComidaRepository comidaRepository;

    public List<Menu> getMenusBySemanaAndDia(int semana, int dia) {
        return menuRepository.findBySemanaAndDia(semana,dia); // devolvemos la lista de menus disponibles para X dia y semana
    }

    // busca el menu que se le paso por PedidoController en base al día y el comida ID para agregarlo al pedido
    public Optional<Menu> findByDiaAndComidaId(int dia, Long comidaId) {
        return menuRepository.findByDiaAndComidaId(dia, comidaId);
    }

    public Menu saveMenu(int dia, int semana,List<Long> comidaIds) {
            Menu nuevoMenu = new Menu();
            nuevoMenu.setDia(dia);
            nuevoMenu.setSemana(semana);

            List<Comida> listaComidas =  comidaRepository.findAllById(comidaIds);

            for (int i = 0; i < listaComidas.size(); i++) {
                Comida ActualIndex = listaComidas.get(i);
                nuevoMenu.setComida(ActualIndex);
            }

            return menuRepository.save(nuevoMenu);
        }
}
