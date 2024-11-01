package main.backEnd.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Comida {
    // las comidas, almacenan solo datos cargados para la muestra, una comida está asociada a muchos menus.
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String nombre;

    // una comida UNICA para muchos menus UNICOS
    @OneToMany(mappedBy = "comida")
    private List<Menu> menus;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombre() {
        return this.nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

 

    public List<Menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Menu> menus) {
        this.menus = menus;
    }
}
