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
    alert("Menú publicado con éxito!");

}
