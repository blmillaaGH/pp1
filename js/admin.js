let currentDay = null;

function openModal() {
    document.getElementById("menuModal").style.display = "block";
}
function openModalComida() {
    document.getElementById("menuModal").style.display = "block";
}
function openModalModificarComida() {
    document.getElementById("menuModal").style.display = "block";
}
function openModalEliminarComida() {
    document.getElementById("menuModal2").style.display = "block";
}
function closeModal() {
    document.getElementById("menuModal").style.display = "none";
    document.getElementById("menuModal2").style.display = "none";
}

function addMenuInput() {
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = "Ingrese el menú";
    newInput.className = "menu-input";
    document.getElementById("menuInputs").appendChild(newInput);
}

function submitMenus() {
    const inputs = document.querySelectorAll('.menu-input');
    const menuContainer = document.querySelector(`.row:nth-child(${currentDay + 1}) .menus`);

    inputs.forEach(input => {
        if (input.value.trim() !== "") {
            const menuItem = document.createElement("div");
            menuItem.textContent = input.value;
            menuContainer.appendChild(menuItem);
        }
    });

    closeModal();
}

// FUNCIÓN PARA MODIFICAR COMIDAS
const select = document.getElementById("comida1");
const modificarBtn = document.getElementById("btnModificar");
const modificacionDiv = document.getElementById("modificacion");
const nuevaOpcionInput = document.getElementById("nuevaOpcion");
const guardarBtn = document.getElementById("guardar");

// LO MISMO QUE COMIDA, SOLO AGREGA EL LISTENER SI EXISTE!

if (modificarBtn) {
    modificarBtn.addEventListener("click", () => {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption) {
            nuevaOpcionInput.value = selectedOption.text;
            modificacionDiv.classList.remove("hidden");
        }
    });
}

// Guardar comida en la BD (si no existe no deberia agregar el listener en la paginAa menu..)
if (guardarBtn) {
    guardarBtn.addEventListener("click", () => {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption) {
            const newNombre = nuevaOpcionInput.value;
            if (newNombre) {
                fetch(`http://localhost:8080/api/comidas/${selectedOption.value}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre: newNombre })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Comida modificada:', data);
                    selectedOption.text = data.nombre;
                    openModalModificarComida(); // Mostrar modal solo si se modifica correctamente
                })
                .catch(error => {
                    console.error('Error al modificar la comida:', error);
                    alert("Error al modificar la comida"); // alert denuevo
                });
            }
            modificacionDiv.classList.add("hidden");
        }
    });
}


// FUNCIÓN PARA ELIMINAR COMIDAS
function eliminarComida() {
    const selectedOption = document.getElementById("comida1").options[document.getElementById("comida1").selectedIndex];
    if (selectedOption) {
        fetch(`http://localhost:8080/api/comidas/${selectedOption.value}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            selectedOption.remove();
            openModalEliminarComida(); // Abrir modal solo si se elimina correctamente
        })
        .catch(error => {
            console.error('Error al eliminar la comida:', error);
            alert("No se puede eliminar la comida porque está relacionada a algún menú existente"); // tira el alert
        });
    }
}

// funciones (deberian mutar para ambas paginas)
console.log("admin.js");
document.addEventListener("DOMContentLoaded", function() {
    cargarComidas();
});

function cargarComidas() {
    fetch("http://localhost:8080/api/comidas")
        .then(response => {
            if (!response.ok) {
                throw new Error('NETWORK ERROR ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // chequear qué llega en los log.
            const selects = document.querySelectorAll('.comidaSelector');
            selects.forEach(select => {
                select.innerHTML = '<option value="" disabled selected>Seleccionar comida</option>';
                data.forEach(comida => {
                    const option = document.createElement('option');
                    option.value = comida.id;
                    option.textContent = comida.nombre;
                    select.appendChild(option);
                });
            });
        })
        .catch(error => console.error('Error al cargar las comidas:', error));
}

