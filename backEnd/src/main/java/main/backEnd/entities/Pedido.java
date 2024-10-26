package main.backEnd.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    private String numeroPedido;
    private int semana;

    // un pedido
    @ManyToMany
    @JoinTable(
            name = "Pedido_Menu",
            joinColumns = @JoinColumn(name = "pedido_id"),
            inverseJoinColumns = @JoinColumn(name = "menu_id"))
    @JsonIgnoreProperties("pedidos")
    private List<Menu> menusPedido;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public List<Menu> getMenusPedido() {
        return menusPedido;
    }
    public void setMenusPedido(List<Menu> menusPedido) {
        this.menusPedido = menusPedido;
    }
    public String getNumeroPedido() {
        return numeroPedido;
    }
    public void setNumeroPedido(String numeroPedido) {
        this.numeroPedido = numeroPedido;
    }
    public int getSemana() {
        return semana;
    }
    public void setSemana(int semana) {
        this.semana = semana;
    }
}
