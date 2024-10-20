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
                <tbody></tbody>
            </table>
            <div style="margin-top: 20px; text-align: right;">
                <button class="confirmarPedido">Confirmar pedido del día</button>
            </div>
        `;

        // Llamada a la función para generar filas del menú dinámicamente
        generarFilasMenu(index, esModificacion, contenidoModal.querySelector('tbody'));

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

    // Función para generar las filas del menú dinámicamente
    function generarFilasMenu(diaIndex, esModificacion, tbody) {
        fetch(`http://localhost:8080/api/menus/dia/${diaIndex + 1}`)  // Corrección: Index + 1 para que coincida con el día
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
                return response.text(); // Parsear como texto primero para verificar si está vacío
            })
            .then(data => {
                if (!data || data.trim() === "") {
                    throw new Error('Respuesta vacía del servidor');
                }
    
                try {
                    let menus = JSON.parse(data); // Intentar parsear el JSON
                    let filas = '';
    
                    if (menus.length === 0) {
                        filas = '<tr><td colspan="2">No hay menús disponibles para este día.</td></tr>';
                    } else {
                        menus.forEach((menu, menuIndex) => {
                            filas += `
                                <tr>
                                    <td>${menu.nombre}</td>
                                    <td>
                                        <button class="agregar" data-index="${menuIndex}">AGREGAR</button>
                                        <button class="eliminar" data-index="${menuIndex}">ELIMINAR</button>
                                    </td>
                                </tr>
                            `;
                        });
                    }
                    tbody.innerHTML = filas;
    
                    // Asignar eventos a los botones después de generar las filas
                    const botonesAgregar = tbody.querySelectorAll('.agregar');
                    const botonesEliminar = tbody.querySelectorAll('.eliminar');
    
                    botonesAgregar.forEach((btn, btnIndex) => {
                        if (esModificacion && pedidos[diaIndex].menus.includes(btnIndex)) {
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
                            pedidos[diaIndex].menus.push(btnIndex);
                        });
                    });
    
                    botonesEliminar.forEach((btn, btnIndex) => {
                        btn.addEventListener('click', () => {
                            const menuIndex = pedidos[diaIndex].menus.indexOf(btnIndex);
                            if (menuIndex > -1) {
                                pedidos[diaIndex].menus.splice(menuIndex, 1);
                            }
    
                            const agregarBtn = botonesAgregar[btnIndex];
                            agregarBtn.style.backgroundColor = '#28a745';
                            agregarBtn.style.color = 'white';
                            agregarBtn.textContent = 'AGREGAR';
                            agregarBtn.disabled = false;
                        });
                    });
                } catch (error) {
                    console.error('Error al analizar el JSON:', error);
                    tbody.innerHTML = '<tr><td colspan="2">Error al cargar los menús.</td></tr>';
                }
            })
            .catch(error => {
                console.error('Error al obtener los menús:', error);
                tbody.innerHTML = '<tr><td colspan="2">Error al cargar los menús.</td></tr>';
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
        });
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
});
