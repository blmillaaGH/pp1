document.getElementById('registerForm').addEventListener("submit", function(event){
    event.preventDefault();

    const email = document.getElementById("correoElectronico").value;
    const password = document.getElementById("password").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const tipoDni = document.getElementById("tipoDocumento").value;
    const dni = document.getElementById("documento").value;
    const localidad = document.getElementById("localidad").value;
    const provincia = document.getElementById("provincia").value;
    const pais = document.getElementById("pais").value;


    fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nombre, apellido, tipoDni, dni, localidad, provincia, pais})
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        document.getElementById("registerForm").reset();
    })
    .catch(error => {
        mostrarError("Hubo un error al registrar el usuario");
    });



    // const passwordConfirm = document.getElementById("passwordConfirm").value;
    // if(password !== passwordConfirm){
    //     mostrarError("Las contraseñas no coinciden!");
    //     return;
    // }

    // if(!terminosAceptados){
    //     mostrarError("Se deben aceptar los terminos y condiciones!");
    //     return;
    // }

    // alert("Registro exitoso!");
    // document.getElementById("registerForm").reset();
});


function mostrarError(mensaje){
    const errorMessage = document.getElementById("error-message").value;
    errorMessage.textContent = mensaje;
    errorMessage.style.display = block;
}