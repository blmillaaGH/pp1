document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Evitar que el formulario se envíe por defecto

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const validUsername = "usuario";
    const validPassword = "123";
    const adminUsername = "admin";  
    const adminPassword = "123";     

    if (username === validUsername && password === validPassword) {
        alert("Inicio de sesión exitoso como usuario");
        window.location.href = "paginas/menus.html"; // Redirigir a la página de usuario
    } else if (username === adminUsername && password === adminPassword) {
        alert("Inicio de sesión exitoso como administrador");
        window.location.href = "paginas/admin.html"; // Redirigir a la página de administración
    } else {  
        document.getElementById("error-message").textContent = "Usuario o contraseña incorrectos";
    }
});
