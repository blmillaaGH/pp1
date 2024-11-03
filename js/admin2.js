





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
