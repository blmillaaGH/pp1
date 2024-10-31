package main.backEnd.repository;

import main.backEnd.entities.Comida;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ComidaRepository extends JpaRepository<Comida, Long> {
    Optional<Comida> findByNombre(String nombre);
}
