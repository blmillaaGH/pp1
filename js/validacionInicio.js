document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Evitar que el formulario se envíe por defecto

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const validUsername = "usuario";
    const validPassword = "123";

    if (username === validUsername && password === validPassword) {
        alert("Inicio de sesión exitoso");
        window.location.href = "paginas/menus.html";
    } else {
        document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos";
    }
});