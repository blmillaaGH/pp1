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
                const cerrarBtn = modales[index].querySelector('.cerrarModal'); // Cambié a '.cerrarModal'
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
            <span class="cerrarModal">&times;</span> <!-- Cambié a .cerrarModal -->
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

                <div id="mensajeConfirmacion2" class="mensaje-confirmacion" style="display:none;">
                    <p>¡Su pedido ha sido confirmado!</p>
                </div>
            </div>
        `;

        // Asignar evento al botón confirmarPedido después de que se genere el contenido
        const confirmarPedido = modal.querySelector('.confirmarPedido');
        const mensajeConfirmacion2 = modal.querySelector('#mensajeConfirmacion2');

        confirmarPedido.addEventListener('click', () => {
            mostrarMensajeConfirmacion(mensajeConfirmacion2);
            setTimeout(() => {
                modal.style.display = 'none';
             }, 3000);
        });

        // Asignar el evento de cierre al botón generado dinámicamente
        const cerrarBtn = modal.querySelector('.cerrarModal'); // Asegurarse de que el botón está seleccionado tras crear el contenido
        cerrarBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    function mostrarMensajeConfirmacion(mensajeConfirmacion2){
         // Mostrar el mensaje de confirmación
         mensajeConfirmacion2.style.opacity = 1;
         mensajeConfirmacion2.style.visibility = 'visible';
         mensajeConfirmacion2.style.display = 'block';

         // Ocultar el mensaje después de 3 segundos
         setTimeout(() => {
            mensajeConfirmacion2.style.opacity = 0;
            mensajeConfirmacion2.style.visibility = 'none';
            mensajeConfirmacion2.style.display = 'none';
         }, 3000);
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
