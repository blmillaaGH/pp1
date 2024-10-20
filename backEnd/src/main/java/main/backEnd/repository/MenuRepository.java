package main.backEnd.repository;

import main.backEnd.entities.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu,Long> {
    // find by dia extends jpa
    List<Menu> findByDia(int dia);
}
