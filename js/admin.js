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

//FUNCION PARA MODIFICAR COMIDAS
const select = document.getElementById("opciones");
const modificarBtn = document.getElementById("btnModificar");
const modificacionDiv = document.getElementById("modificacion");
const nuevaOpcionInput = document.getElementById("nuevaOpcion");
const guardarBtn = document.getElementById("guardar");


modificarBtn.addEventListener("click", () => {
    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption) {
        nuevaOpcionInput.value = selectedOption.text;
        modificacionDiv.classList.remove("hidden");
    }
});


guardarBtn.addEventListener("click", () => {
    const selectedOption = select.options[select.selectedIndex];
    if (selectedOption) {
        selectedOption.text = nuevaOpcionInput.value; 
    }
    modificacionDiv.classList.add("hidden");
});


function eliminarMenu() {
    const selectedIndex = select.selectedIndex;
    if (selectedIndex !== -1) {
        select.remove(selectedIndex); // Eliminar la opción seleccionada
    }
    openModalEliminarComida();
}

//
//function publicarMenu() {
//    const rows = document.querySelectorAll('.row');
//    const menuData = Array.from(rows).map((row, index) => {
//        const dia = index + 1;
//        const comidas = Array.from(row.querySelectorAll('.menus div')).map(div => div.textContent);
//        return {
//            dia: dia,
//            semana: 1, // Asegúrate de cambiarlo según corresponda
//            comidas: comidas
//        };
//    });
//
//    fetch('http://localhost:8080/api/menus/guardar', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(menuData)
//    })
//    .then(response => {
//        if (response.ok) {
//            alert("Menú publicado con éxito!");
//        } else {
//            alert("Error al publicar el menú.");
//        }
//    })
//    .catch(error => console.error('Error:', error));
//
//}


