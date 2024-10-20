package main.backEnd.entities;

import jakarta.persistence.*;

@Entity
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    private String diaSemana;

    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "comida_id")
    private Comida comida;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Pedido getPedido() {
        return pedido;
    }
    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }
    public String getDiaSemana() {
        return diaSemana;
    }
    public void setDiaSemana(String diaSemana) {
        this.diaSemana = diaSemana;
    }
    public Comida getComida() {
        return comida;
    }
    public void setComida(Comida comida) {
        this.comida = comida;
    }
}
