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

}
