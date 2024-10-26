package main.backEnd.service;

import main.backEnd.repository.ComidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComidaService {
    @Autowired
    private ComidaRepository comidaRepository;
}
