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
// const login = document.getElementById("loginForm");
// login.addEventListener("submit", function(event) {
//   event.preventDefault();
  
//   const nombre = document.getElementById("username").value.trim();
//   const contraseña = document.getElementById("password").value.trim();
//   const mensajeError = document.getElementById("error-message");

  
//   if (nombre === "" || contraseña === "") {
//       mensajeError.textContent = "Por favor, completa todos los campos.";
//       return;
//   }

//   const usuarioValido = "123";
//   const contraseñaValida = "123";

//   if (nombre === usuarioValido && contraseña === contraseñaValida) {
//       alert("Bienvenido a tu cuenta!");
//       window.location.href = "menus.html";
//   } else {
//       mensajeError.textContent = "Usuario o contraseña incorrectos.";
//   }
// });

//Modals

const modales = document.querySelectorAll('.miModal');
const botones = document.querySelectorAll('.abrirModal');
const cerrar = document.querySelectorAll('.cerrarModal');

console.log(modales);

botones.forEach((boton, index) => {
    boton.onclick = function () {
        modales[index].style.display = 'block';
        mostrarContenido(modales[index]);
    }
});


cerrar.forEach((cerrartBtn, index) => {
    cerrartBtn.onclick = function () {
        modales[index].style.display = 'none'; 
    }
})



window.addEventListener('click', (event) => {
    if (event.target.classList.contains('miModal')) {
        event.target.style.display = 'none';
    }
});

function mostrarContenido (modal)  {
    const contenidoModal = modal.querySelector('.modalContenido');
    contenidoModal.innerHTML = `<table class="tablaPedidos">
                            <thead>
                                <tr>
                                    <th>MENU DEL DÍA</th>
                                    <th>ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>(menú ejemplo del día disponible)</td>
                                    <td>
                                        <button>AGREGAR</button>
                                        <button class="eliminar">ELIMINAR</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(menú ejemplo del día disponible)</td>
                                    <td>
                                        <button>AGREGAR</button>
                                        <button class="eliminar">ELIMINAR</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(menú ejemplo del día disponible)</td>
                                    <td>
                                        <button>AGREGAR</button>
                                        <button class="eliminar">ELIMINAR</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(menú ejemplo del día disponible)</td>
                                    <td>
                                        <button>AGREGAR</button>
                                        <button class="eliminar">ELIMINAR</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(menú ejemplo del día disponible)</td>
                                    <td>
                                        <button>AGREGAR</button>
                                        <button class="eliminar">ELIMINAR</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(menú ejemplo del día disponible)</td>
                                    <td>
                                        <button>AGREGAR</button>
                                        <button class="eliminar">ELIMINAR</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(menú ejemplo del día disponible)</td>
                                    <td>
                                        <button>AGREGAR</button>
                                        <button class="eliminar">ELIMINAR</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>(menú ejemplo del día disponible)</td>
                                    <td>
                                        <button>AGREGAR</button>
                                        <button class="eliminar">ELIMINAR</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    
                        <div style="margin-top: 20px; text-align: right;">
                            <button style="background-color: #28a745;">Confirmar pedido del día</button>
                        </div>`; 
}