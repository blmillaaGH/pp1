
document.getElementById('registerForm').addEventListener("submit", function(event){
    event.preventDefault();

    const email = document.getElementById("correoElectronico").value;
    const password = document.getElementById("password").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const tipoDocumento = document.getElementById("tipoDocumento").value;
    const documento = document.getElementById("documento").value;
    const localidad = document.getElementById("localidad").value;
    const provincia = document.getElementById("provincia").value;
    const pais = document.getElementById("pais").value;
    const terminosAceptados = document.getElementById("Terminos").value;

    const passwordConfirm = document.getElementById("passwordConfirm").value;
    if(password !== passwordConfirm){
        mostrarError("Las contraseñas no coinciden!");
        return;
    }

    if(!terminosAceptados){
        mostrarError("Se deben aceptar los terminos y condiciones!");
        return;
    }

    alert("Registro exitoso!");
    document.getElementById("registerForm").reset();
});


function mostrarError(mensaje){
    const errorMessage = document.getElementById("error-message").value;
    errorMessage.textContent = mensaje;
    errorMessage.style.display = block;
}