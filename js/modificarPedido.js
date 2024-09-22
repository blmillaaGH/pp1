document.addEventListener('DOMContentLoaded', function() {
    const modales = document.querySelectorAll('.miModalModificar');
    const botones = document.querySelectorAll('.abriModalModificar');
    const estadosPedidos = document.querySelectorAll('.estadoPedido .estado');
    let estadoMenus = {}; // Para almacenar los elementos agregados para cada fila (por índice)

    // Mostrar modal correspondiente al botón presionado
    botones.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            if (modales[index]) {
                modales[index].style.display = 'block';
                mostrarContenido(modales[index], index); // Pasamos el índice del modal y el pedido

                // Seleccionar el botón de cierre después de cargar el contenido
                const cerrarBtn = modales[index].querySelector('.cerrarModalModificar');
                if (cerrarBtn) {
                    cerrarBtn.addEventListener('click', () => {
                        modales[index].style.display = 'none';
                    });
                } else {
                    console.error('Botón de cierre no encontrado');
                }
            }
        });
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('miModalModificar')) {
            event.target.style.display = 'none';
        }
    });

    // Función para mostrar el contenido del modal con las opciones ya marcadas
    function mostrarContenido(modal, indexPedido) {
        const contenidoModal = modal.querySelector('.modalContenidoModificar');

        // Comprobamos que el contenedor del modal existe antes de modificarlo
        if (!contenidoModal) {
            console.error('Contenido del modal no encontrado');
            return;
        }

        // Obtener estado actual del pedido (confirmado o no)
        const estadoActual = estadosPedidos[indexPedido].textContent === 'CONFIRMADO';
        const estadoMenu = estadoMenus[indexPedido] || []; // Obtener el estado del menú (vacío si no existe)

        contenidoModal.innerHTML = `
            <span class="cerrarModalModificar">&times;</span>
            <table class="tablaPedidos">
                <thead>
                    <tr>
                        <th>MENU DEL DÍA</th>
                        <th>ACCIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    ${generarFilasMenu(5, estadoMenu)} <!-- Mostrar filas con el estado actual -->
                </tbody>
            </table>
            <div style="margin-top: 20px; text-align: right;">
                <button class="confirmarPedido">Confirmar pedido del día</button>
            </div>
        `;

        // Comprobar si existe el botón de "Confirmar pedido"
        const confirmarBtn = contenidoModal.querySelector('.confirmarPedido');
        if (confirmarBtn) {
            confirmarBtn.addEventListener('click', () => {
                estadosPedidos[indexPedido].textContent = 'CONFIRMADO';
                estadosPedidos[indexPedido].style.color = 'green';
                modal.style.display = 'none';
            });
        }

        // Funcionalidad para botones "Agregar" y "Eliminar" dentro del modal
        const botonesAgregar = contenidoModal.querySelectorAll('.agregar');
        const botonesEliminar = contenidoModal.querySelectorAll('.eliminar');

        botonesAgregar.forEach((btn, i) => {
            if (estadoMenu.includes(i)) {
                btn.style.backgroundColor = 'green'; // Si está agregado, marcar en verde
            }
            btn.addEventListener('click', () => {
                btn.style.backgroundColor = 'green'; // Cambiar a verde cuando se agrega
                if (!estadoMenus[indexPedido]) {
                    estadoMenus[indexPedido] = [];
                }
                if (!estadoMenus[indexPedido].includes(i)) {
                    estadoMenus[indexPedido].push(i); // Guardar el estado del ítem agregado
                }
            });
        });

        botonesEliminar.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                botonesAgregar[i].style.backgroundColor = ''; // Restaurar color original al eliminar
                const indexToRemove = estadoMenus[indexPedido].indexOf(i);
                if (indexToRemove !== -1) {
                    estadoMenus[indexPedido].splice(indexToRemove, 1); // Eliminar del estado agregado
                }
            });
        });
    }

    // Función para generar filas del menú, con el estado actual marcado
    function generarFilasMenu(cantidad, estadoMenu) {
        let filas = '';
        for (let i = 0; i < cantidad; i++) {
            const colorBoton = estadoMenu.includes(i) ? 'green' : ''; // Marcar si ya está agregado
            filas += `
                <tr>
                    <td>(menú ejemplo del día disponible)</td>
                    <td>
                        <button class="agregar" style="background-color: ${colorBoton};">AGREGAR</button>
                        <button class="eliminar">ELIMINAR</button>
                    </td>
                </tr>
            `;
        }
        return filas;
    }
});
