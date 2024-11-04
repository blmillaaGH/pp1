document.addEventListener('DOMContentLoaded', function() {
    const modales = document.querySelectorAll('.miModalModificar');
    const botones = document.querySelectorAll('.abriModalModificar');

    // Mostrar modal correspondiente al botón presionado
    botones.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            if (modales[index]) {
                modales[index].style.display = 'block';
                mostrarContenido(modales[index]);

                // Seleccionar el botón de cierre después de cargar el contenido
                const cerrarBtn = modales[index].querySelector('.cerrarModalModificar');
                cerrarBtn.addEventListener('click', () => {
                    modales[index].style.display = 'none';
                });
            }
        });
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('miModalModificar')) {
            event.target.style.display = 'none';
        }
    });

    // Función para mostrar el contenido del modal
    function mostrarContenido(modal) {
        const contenidoModal = modal.querySelector('.modalContenidoModificar');
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

       
        const agregarBtns = contenidoModal.querySelectorAll('.agregar');
        const eliminarBtns = contenidoModal.querySelectorAll('.eliminar');

        agregarBtns.forEach((btn, i) => {
            const eliminarBtn = eliminarBtns[i];
            eliminarBtn.disabled = true; 

            btn.addEventListener('click', () => {
                btn.textContent = 'CONFIRMADO';
                btn.style.backgroundColor = 'green';
                btn.classList.add('confirmado');
                eliminarBtn.disabled = false; 
            });
        });

        eliminarBtns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                const agregarBtn = agregarBtns[i];
                agregarBtn.textContent = 'AGREGAR';
                agregarBtn.style.backgroundColor = '';
                agregarBtn.classList.remove('confirmado');
                btn.disabled = true;
            });
        });
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
                        <button class="eliminar" disabled>ELIMINAR</button> <!-- Botón "Eliminar" inicialmente deshabilitado -->
                    </td>
                </tr>
            `;
        }
        return filas;
    }
});
