document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav a');
  const inicioSection = document.getElementById('inicio');
  const gestionarPedidosSection = document.getElementById('gestionarPedidos');
  const soporteSection = document.getElementById('soporte');

  // Manejo de visibilidad
  links.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          
          if (link.getAttribute('href') === '#gestionarPedidos') {
              inicioSection.style.display = 'none';
              soporteSection.style.display = 'none';
              gestionarPedidosSection.style.display = 'block';
          } else if (link.getAttribute('href') === '#inicio') {
              gestionarPedidosSection.style.display = 'none';
              soporteSection.style.display = 'none';
              inicioSection.style.display = 'block';
          } else if (link.getAttribute('href') === '#soporte') {
              inicioSection.style.display = 'none';
              gestionarPedidosSection.style.display = 'none';
              soporteSection.style.display = 'block';
          }

          // Manejo de la active class para botones
          links.forEach(link => link.parentElement.classList.remove('active')); // Remueve la clase activa de todos los enlaces
          link.parentElement.classList.add('active'); // Añade la clase activa al enlace actual
      });
  });
});

//Inicio de sesion
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const nombre = document.getElementById("username").value.trim();
  const contraseña = document.getElementById("password").value.trim();
  const mensajeError = document.getElementById("error-message");

  
  if (nombre === "" || contraseña === "") {
      mensajeError.textContent = "Por favor, completa todos los campos.";
      return;
  }

  const usuarioValido = "123";
  const contraseñaValida = "123";

  if (nombre === usuarioValido && contraseña === contraseñaValida) {
      alert("Bienvenido a tu cuenta!");
      window.location.href = "menus.html";
  } else {
      mensajeError.textContent = "Usuario o contraseña incorrectos.";
  }
});
