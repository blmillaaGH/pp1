package main.backEnd.entities;

import jakarta.persistence.*;

import java.awt.*;
import java.util.List;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    private int numeroPedido;
    private int semana;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<Menu> menusPedido;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public int getNumeroPedido() {
        return numeroPedido;
    }
    public void setNumeroPedido(int numeroPedido) {
        this.numeroPedido = numeroPedido;
    }
    public int getSemana() {
        return semana;
    }
    public void setSemana(int semana) {
        this.semana = semana;
    }
}
