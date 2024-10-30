package main.backEnd.repository;

import main.backEnd.entities.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MenuRepository extends JpaRepository<Menu,Long> {

    // hay que buscar los menus por dia, para mostrarlos en el menu principal y devolver la lista de menus (por index)
    List<Menu> findBySemanaAndDia(int semana, int dia);

    Optional<Menu> findByDiaAndComidaId(int dia, Long comidaId);
}
