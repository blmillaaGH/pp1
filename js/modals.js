document.addEventListener('DOMContentLoaded', function () {
    const botonesIrMenu = document.querySelectorAll('.btn-ir-menu');
    const modales = document.querySelectorAll('.miModal');
    const botones = document.querySelectorAll('.abrirModal');
    const botonesModificar = document.querySelectorAll('.modificar');
    const estadosPedidos = document.querySelectorAll('.estadoPedido .estado');
    const botonesEliminar = document.querySelectorAll('.eliminar');
    const confirmarPedidoBtn = document.querySelector('.confirmar-pedido');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');

    // Cargar pedidos del localStorage al inicio
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || Array.from({ length: 5 }, () => ({
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

                // Almacenar en localStorage
                localStorage.setItem('pedidos', JSON.stringify(pedidos));
            }
            modal.style.display = 'none';
        });
    }

    // Función para generar las filas del menú dinámicamente
    function generarFilasMenu(diaIndex, esModificacion, tbody) {
        fetch(`http://localhost:8080/api/menus/dia/${diaIndex + 1}`)
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
                    let menus = JSON.parse(data);
                    let filas = '';

                    if (menus.length === 0) {
                        filas = '<tr><td colspan="2">No hay menús disponibles para este día.</td></tr>';
                    } else {
                        menus.forEach((menu) => { // Modificado para usar ID en lugar de índice
                            filas += `
                                <tr>
                                    <td>${menu.nombre}</td>
                                    <td>
                                        <button class="agregar" data-id="${menu.id}">AGREGAR</button>
                                        <button class="eliminar" data-id="${menu.id}">ELIMINAR</button>
                                    </td>
                                </tr>
                            `;
                        });
                    }
                    tbody.innerHTML = filas;

                    // Asignar eventos a los botones después de generar las filas
                    const botonesAgregar = tbody.querySelectorAll('.agregar');
                    const botonesEliminar = tbody.querySelectorAll('.eliminar');

                    botonesAgregar.forEach((btn) => {
                        if (esModificacion && pedidos[diaIndex].menus.includes(btn.getAttribute('data-id'))) {
                            btn.style.backgroundColor = 'grey';
                            btn.style.color = 'white';
                            btn.textContent = 'AGREGADO';
                            btn.disabled = true;
                        }

                        btn.addEventListener('click', () => {
                            const menuId = btn.getAttribute('data-id');
                            if (!pedidos[diaIndex].menus.includes(menuId)) {
                                pedidos[diaIndex].menus.push(menuId); // Guardar ID de menú
                            }
                            btn.style.backgroundColor = 'grey';
                            btn.style.color = 'white';
                            btn.textContent = 'AGREGADO';
                            btn.disabled = true;

                            // Almacenar en localStorage
                            localStorage.setItem('pedidos', JSON.stringify(pedidos));
                        });
                    });

                    botonesEliminar.forEach((btn) => {
                        btn.addEventListener('click', () => {
                            const menuId = btn.getAttribute('data-id');
                            const index = pedidos[diaIndex].menus.indexOf(menuId);
                            if (index > -1) {
                                pedidos[diaIndex].menus.splice(index, 1); // Eliminar ID de menú
                            }

                            const agregarBtn = botonesAgregar.find(button => button.getAttribute('data-id') === menuId);
                            agregarBtn.style.backgroundColor = '#28a745';
                            agregarBtn.style.color = 'white';
                            agregarBtn.textContent = 'AGREGAR';
                            agregarBtn.disabled = false;

                            // Almacenar en localStorage
                            localStorage.setItem('pedidos', JSON.stringify(pedidos));
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

            localStorage.setItem('pedidos', JSON.stringify(pedidos));
        });
    });


    
// Función para confirmar pedido
confirmarPedidoBtn.addEventListener('click', function () {
    const pedidosConfirmados = crearPedidosConfirmados();
    console.log('Pedidos confirmados a enviar:', JSON.stringify(pedidosConfirmados));

    // Flatten the menus array and create the correct JSON format
    const menus = pedidosConfirmados.flatMap(pedido => pedido.menus.map(menu => ({
        dia: pedido.dia,
        comidaId: parseInt(menu.comidaId, 10) || null
    })));

    const pedido = {
        semana: obtenerSemanaSeleccionada(),
        menus: menus
    };

    console.log('JSON para enviar:', JSON.stringify(pedido));  // Verifica el formato del JSON

    fetch('http://localhost:8080/api/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Pedido confirmado:', data);
        mostrarMensajeConfirmacion(); // Mostrar mensaje de confirmación
    })
    .catch(error => {
        console.error('Error al enviar el pedido:', error);
        mostrarMensajeError(error.message);
    });
});






// Función para crear el objeto de pedidos confirmados
function crearPedidosConfirmados() {
    return pedidos.map((pedido, index) => ({
        dia: index + 1,
        menus: pedido.menus.map(menuId => ({
            dia: index + 1,
            comidaId: parseInt(menuId, 10)
        }))
    })).filter(pedido => pedido.menus.length > 0);
}

// Obtener la semana seleccionada
function obtenerSemanaSeleccionada() {
    return parseInt(document.querySelector('#semanaSelector').value, 10);
}


// Función para mostrar el mensaje de confirmación
function mostrarMensajeConfirmacion() {
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
    mensajeConfirmacion.style.opacity = 1;
    mensajeConfirmacion.style.visibility = 'visible';
    mensajeConfirmacion.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeConfirmacion.style.opacity = 0;
        mensajeConfirmacion.style.visibility = 'hidden';
        mensajeConfirmacion.style.display = 'none';
    }, 3000);
}

function mostrarMensajeError(mensaje) {
    const errorDiv = document.getElementById('mensajeError');
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
    }
}

});
