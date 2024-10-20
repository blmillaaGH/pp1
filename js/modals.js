document.addEventListener('DOMContentLoaded', function () {
    const botonesIrMenu = document.querySelectorAll('.btn-ir-menu');
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

   
    botonesIrMenu.forEach((boton) => {
        boton.addEventListener('click', function() {
            window.location.href = 'menus.html';
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
        const botonesAgregar = document.querySelectorAll('.estado');
        botonesAgregar.forEach((btn) => {
            btn.style.color = '';
            btn.style.backgroundColor = '';
            btn.disabled = true;
            btn.textContent = 'AGREGADO';
        })   
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
        fetch(`http://localhost:8080/api/menus/dia/${diaIndex}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
                return response.json();
            })
            .then(menus => {
                if (menus.length === 0) {
                    filas = '<tr><td colspan="2">No hay menús disponibles para este día.</td></tr>';
                } else {
                    menus.forEach(menu => {
                        filas += `
                            <tr>
                                <td>${menu.nombre}</td>
                                <td>
                                    <button class="agregar">AGREGAR</button>
                                    <button class="eliminar">ELIMINAR</button>
                                </td>
                            </tr>
                        `;
                    });
                }
                document.querySelector('.tablaPedidos tbody').innerHTML = filas;
            })
            .catch(error => {
                console.error('Error al obtener los menús:', error);
                filas = '<tr><td colspan="2">Error al cargar los menús.</td></tr>';
                document.querySelector('.tablaPedidos tbody').innerHTML = filas;
            });
    }
});
