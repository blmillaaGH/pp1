document.addEventListener('DOMContentLoaded', function() {
    const modales = document.querySelectorAll('.miModalHistorial');
    const botones = document.querySelectorAll('.abriModalHistorial');

    // Mostrar modal correspondiente al botón presionado
    botones.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            if (modales[index]) {
                modales[index].style.display = 'block';
                mostrarContenido(modales[index]);

                // Seleccionar el botón de cierre después de cargar el contenido
                const cerrarBtn = modales[index].querySelector('.cerrarModalHistorial');
                cerrarBtn.addEventListener('click', () => {
                    modales[index].style.display = 'none';
                });
            }
        });
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('miModalHistorial')) {
            event.target.style.display = 'none';
        }
    });

    // Función para mostrar el contenido del modal
    function mostrarContenido(modal) {
        const contenidoModal = modal.querySelector('.modalContenidoHistorial');
        contenidoModal.innerHTML = `
            <span class="cerrarModal">&times;</span>
            <table class="tablaPedidos">
                <thead>
                    <tr>
                        <th>DIA</th>
                        <th>MENU</th>
                    </tr>
                </thead>
                <tbody>
                    ${generarFilasMenu(5)} <!-- Aquí puedes ajustar el número de filas -->
                </tbody>
            </table>
            <div style="margin-top: 20px; text-align: right;">
                <button class="confirmarPedido">Agregar pedido a la semana actual</button>
            </div>
        `;
    }

    // Función para generar filas del menú
    function generarFilasMenu(cantidad) {
        let filas = '';
        let dias = 0;
        for (let i = 0; i < cantidad; i++) {
            dias++;
            filas += `
                <tr>
                    <td>${dias}</td>
                    <td>Menu del dia</td>
                   
                </tr>
            `;
        }
        return filas;
    }
});