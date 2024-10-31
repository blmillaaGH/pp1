let currentDay = null;

function openModal(day) {
    currentDay = day;
    document.getElementById("modalDay").textContent = day;
    document.getElementById("menuModal").style.display = "block";
}

function closeModal() {
    document.getElementById("menuModal").style.display = "none";
    document.getElementById("menuInputs").innerHTML = '<input type="text" placeholder="Ingrese el menú" class="menu-input">';
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

function modificarMenu(button) {

}

function eliminarMenu(button) {
    const row = button.closest('.row');
    const menuContainer = row.querySelector('.menus');
    menuContainer.innerHTML = ""; 
}

function publicarMenu() {
    const rows = document.querySelectorAll('.row');
    const menuData = Array.from(rows).map((row, index) => {
        const dia = index + 1;
        const comidas = Array.from(row.querySelectorAll('.menus div')).map(div => div.textContent);
        return {
            dia: dia,
            semana: 1, // Asegúrate de cambiarlo según corresponda
            comidas: comidas
        };
    });

    fetch('http://localhost:8080/api/menus/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
    })
    .then(response => {
        if (response.ok) {
            alert("Menú publicado con éxito!");
        } else {
            alert("Error al publicar el menú.");
        }
    })
    .catch(error => console.error('Error:', error));

}
