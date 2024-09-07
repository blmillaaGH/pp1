document.addEventListener('DOMContentLoaded', function() {
    const modales = document.querySelectorAll('.miModal');
    const botones = document.querySelectorAll('.abrirModal');

    // Mostrar modal correspondiente al botón presionado
    botones.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            if (modales[index]) {
                modales[index].style.display = 'block';
                mostrarContenido(modales[index]);

                // Seleccionar el botón de cierre después de cargar el contenido
                const cerrarBtn = modales[index].querySelector('.cerrarModal');
                cerrarBtn.addEventListener('click', () => {
                    modales[index].style.display = 'none';
                });
            }
        });
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('miModal')) {
            event.target.style.display = 'none';
        }
    });

    // Función para mostrar el contenido del modal
    function mostrarContenido(modal) {
        const contenidoModal = modal.querySelector('.modalContenido');
        contenidoModal.innerHTML = `
            <span class="cerrarModal">&times;</span>
            <table class="tablaPedidos">
                <thead>
                    <tr>
                        <th>MENU DEL DÍA</th>
                        <th>ACCIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    ${generarFilasMenu(5)} <!-- Aquí puedes ajustar el número de filas -->
                </tbody>
            </table>
            <div style="margin-top: 20px; text-align: right;">
                <button class="confirmarPedido">Confirmar pedido del día</button>
            </div>
        `;
    }

    // Función para generar filas del menú
    function generarFilasMenu(cantidad) {
        let filas = '';
        for (let i = 0; i < cantidad; i++) {
            filas += `
                <tr>
                    <td>(menú ejemplo del día disponible)</td>
                    <td>
                        <button class="agregar">AGREGAR</button>
                        <button class="eliminar">ELIMINAR</button>
                    </td>
                </tr>
            `;
        }
        return filas;
    }
});
