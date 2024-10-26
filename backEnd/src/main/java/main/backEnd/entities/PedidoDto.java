package main.backEnd.entities;

import java.util.List;

public class PedidoDto {
    private int numeroPedido;
    private int semana;
    private List<MenuDto> menus;

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

    public List<MenuDto> getMenus() {
        return menus;
    }

    public void setMenus(List<MenuDto> menus) {
        this.menus = menus;
    }

    // menu dto dentro del mismo pedido, ya uq está relacionado en cascada.
    public static class MenuDto {
        private int dia;
        private Long comidaId;

        public int getDia() {
            return dia;
        }

        public void setDia(int dia) {
            this.dia = dia;
        }

        public Long getComidaId() {
            return comidaId;
        }

        public void setComidaId(Long comidaId) {
            this.comidaId = comidaId;
        }
    }
}
