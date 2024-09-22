document.addEventListener('DOMContentLoaded', function () {
    const modales = document.querySelectorAll('.miModal');
    const botones = document.querySelectorAll('.abrirModal');
    const botonesModificar = document.querySelectorAll('.modificar');
    const estadosPedidos = document.querySelectorAll('.estadoPedido .estado');
    const botonesEliminar = document.querySelectorAll('.eliminar');
    const confirmarPedidoBtn = document.querySelector('.confirmar-pedido');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

    let pedidos = Array.from({ length: 5 }, () => ({
        menus: [],
        confirmado: false
    }));

    // Mostrar modal para agregar el menú del día
    botones.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            mostrarModal(index);
        });
    });

    // Mostrar modal para modificar el menú del día
    botonesModificar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            mostrarModal(index, true);
        });
    });

    // Función para mostrar el modal
    function mostrarModal(index, esModificacion = false) {
        if (modales[index]) {
            modales[index].style.display = 'block';
            mostrarContenido(modales[index], index, esModificacion);

            const cerrarBtn = modales[index].querySelector('.cerrarModal');
            cerrarBtn.addEventListener('click', () => {
                modales[index].style.display = 'none';
            });
        }
    }

    // Función para mostrar el contenido del modal
    function mostrarContenido(modal, index, esModificacion) {
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
                    ${generarFilasMenu(5, index, esModificacion)}
                </tbody>
            </table>
            <div style="margin-top: 20px; text-align: right;">
                <button class="confirmarPedido">Confirmar pedido del día</button>
            </div>
        `;

        const botonesAgregar = modal.querySelectorAll('.agregar');
        const botonesEliminar = modal.querySelectorAll('.eliminar');

        botonesAgregar.forEach((btn, btnIndex) => {
            if (esModificacion && pedidos[index].menus.includes(btnIndex)) {
                btn.style.backgroundColor = 'grey';
                btn.style.color = 'white';
                btn.textContent = 'AGREGADO';
                btn.disabled = true;
            }

            btn.addEventListener('click', () => {
                btn.style.backgroundColor = 'grey';
                btn.style.color = 'white';
                btn.textContent = 'AGREGADO';
                btn.disabled = true;
                pedidos[index].menus.push(btnIndex);
            });
        });

        botonesEliminar.forEach((btn, btnIndex) => {
            btn.addEventListener('click', () => {
                const menuIndex = pedidos[index].menus.indexOf(btnIndex);
                if (menuIndex > -1) {
                    pedidos[index].menus.splice(menuIndex, 1);
                }

                const agregarBtn = botonesAgregar[btnIndex];
                agregarBtn.style.backgroundColor = '#28a745';
                agregarBtn.style.color = 'white';
                agregarBtn.textContent = 'AGREGAR';
                agregarBtn.disabled = false;
            });
        });

        const confirmarBtn = modal.querySelector('.confirmarPedido');
        confirmarBtn.addEventListener('click', () => {
            if (estadosPedidos[index]) {
                estadosPedidos[index].textContent = 'CONFIRMADO';
                estadosPedidos[index].style.backgroundColor = 'green';
                estadosPedidos[index].style.color = 'white';
                pedidos[index].confirmado = true;
            }
            modal.style.display = 'none';
        });
    }

    // Función para eliminar pedido desde la pantalla principal
    botonesEliminar.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            pedidos[index].menus = []; // Limpiar los menús
            pedidos[index].confirmado = false; // Desconfirmar el pedido
            estadosPedidos[index].textContent = 'AGREGADO';
            estadosPedidos[index].style.backgroundColor = '';
            estadosPedidos[index].style.color = '';
        });
    });

    // Mostrar mensaje de confirmación al presionar el botón "CONFIRMAR PEDIDO" en la pantalla principal
    confirmarPedidoBtn.addEventListener('click', function () {
        mostrarMensajeConfirmacion();
    });

    function mostrarMensajeConfirmacion() {
        // Mostrar el mensaje de confirmación
        mensajeConfirmacion.style.opacity = 1;
        mensajeConfirmacion.style.visibility = 'visible';
        mensajeConfirmacion.style.display = 'block';

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeConfirmacion.style.opacity = 0;
            mensajeConfirmacion.style.visibility = 'none';
            mensajeConfirmacion.style.display = 'none';
        }, 3000);
    }

    function generarFilasMenu(cantidad, diaIndex, esModificacion) {
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
