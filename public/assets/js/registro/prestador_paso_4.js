let itemSeleccionado = null;
//Cargar archivo JSON con las ubicaciones de Chile
var regionesYComunas;

fetch('../../json/comunas-regiones.json')
  .then(response => response.json())
  .then(data => {
    regionesYComunas = data.regiones;
    loadRegiones();
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var currentLocation = `(${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
    document.getElementById("ubicacion").value = currentLocation;
}

function loadRegiones() {
    var menu = document.getElementById("regiones-menu");
    menu.innerHTML = ""; // Limpiar el menú antes de agregar las opciones

    menu.style.maxWidth = "240px"; // Establecer la anchura máxima a 240px
    menu.style.maxHeight = "240px"; // Establecer la altura máxima a 240px
    menu.style.overflowY = "auto"; // Habilitar el desplazamiento vertical
    // Agregar la opción de ubicación actual

    // Agregar las demás regiones
    for (var i = 0; i < regionesYComunas.length; i++) {
        var regionItem = document.createElement("li");
        var regionLink = document.createElement("a");
        regionLink.classList.add("dropdown-item");
        regionLink.href = "#";
        regionLink.textContent = regionesYComunas[i].region;
        regionLink.onclick = function() {
            const loadComunasPromise = new Promise((resolve, reject) => {
                loadComunas(this.textContent);
                resolve();
            });
              
            loadComunasPromise.then(() => {
                setTimeout(() => {
                    const elegirUbicacion = document.getElementById('elegir_ubicacion');
                    elegirUbicacion.click();
                }, 300); // Espera 1 segundo antes de realizar el clic
            }).catch((error) => {
                console.error('Ocurrió un error:', error);
            });
        };
        regionItem.appendChild(regionLink);
        menu.appendChild(regionItem);
    }
    aplicarEstiloSeleccion(); // Llamar a la función para aplicar el estilo de selección
}

function loadComunas(region) {
    var menu = document.getElementById("regiones-menu");
    menu.innerHTML = ""; // Limpiar el menú antes de agregar las opciones

    menu.style.maxWidth = "240px"; // Establecer la anchura máxima a 240px
    menu.style.maxHeight = "240px"; // Establecer la altura máxima a 240px
    menu.style.overflowY = "auto"; // Habilitar el desplazamiento vertical

    var comunasItem = document.createElement("li");
    var comunasLink = document.createElement("a");
    comunasLink.classList.add("dropdown-item");
    comunasLink.href = "#";
    //comunasLink.textContent = "Comunas de " + region;
    comunasLink.onclick = function() {
        // No hacer nada, este es solo un título
    };
    comunasItem.appendChild(comunasLink);
    menu.appendChild(comunasItem);

    for (var i = 0; i < regionesYComunas.find(r => r.region === region).comunas.length; i++) {
        var comunaItem = document.createElement("li");
        var comunaLink = document.createElement("a");
        comunaLink.classList.add("dropdown-item");
        comunaLink.href = "#";
        comunaLink.textContent = regionesYComunas.find(r => r.region === region).comunas[i];
        comunaLink.onclick = function() {
            setLocation(this.textContent);
            itemSeleccionado = this.textContent; // Actualiza la variable con el ítem seleccionado
            loadRegiones();
        };
        comunaItem.appendChild(comunaLink);
        menu.appendChild(comunaItem);
    }
    aplicarEstiloSeleccion(); // Llamar a la función para aplicar el estilo de selección
}

function setLocation(location) {
    // Obtener el valor actual del input
    var currentValue = document.getElementById("ubicacion").value;
  
    // Concatenar el valor actual con el nuevo dron seleccionado, separados por coma
    if (currentValue === "") {
      document.getElementById("ubicacion").value = location;
    } else {
      var values = currentValue.split(", "); // Dividir el valor actual por comas
      if (values.indexOf(location) === -1) { // Verificar si la ubicación ya está en la lista
        document.getElementById("ubicacion").value = currentValue + ", " + location;
      }
    }

    // Guardar las ubicaciones en localStorage
    var locations = document.getElementById("ubicacion").value.split(", ");
    localStorage.setItem("ubicacion_servicio", locations.join(","));
  
    // Obtener todos los enlaces dentro del menú desplegable
    var dropdownLinks = document.querySelectorAll("#regiones-menu li a");
  
    // Remover los estilos de color de todos los enlaces
    dropdownLinks.forEach(function(link) {
      link.style.backgroundColor = '';
      link.style.color = '';
      link.classList.remove('selected'); // Elimina la clase 'selected' de todos los enlaces
    });
  
    // Agregar los estilos de color al enlace seleccionado
    var selectedLink = document.querySelector(`#regiones-menu li a[textContent="${location}"]`);
    if (selectedLink) {
      selectedLink.style.backgroundColor = '#007bff';
      selectedLink.style.color = '#fff';
      selectedLink.classList.add('selected'); // Agrega la clase 'selected' al enlace seleccionado
    }
  
    // Actualizar la variable con el ítem seleccionado
    itemSeleccionado = location;
  
    // Cerrar el menú desplegable
    var dropdown = document.querySelector('.dropdown-toggle');
    dropdown.classList.remove('show');
    var dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('show');
}

function aplicarEstiloSeleccion() {
    // Obtener todos los enlaces dentro del menú desplegable
    var dropdownLinks = document.querySelectorAll("#regiones-menu li a");
  
    // Aplicar el estilo de color de fondo a los elementos seleccionados
    dropdownLinks.forEach(function(link) {
      if (itemSeleccionado && link.textContent === itemSeleccionado) {
        link.style.backgroundColor = '#007bff';
        link.style.color = '#fff';
        link.classList.add('selected');
      } else {
        link.style.backgroundColor = '';
        link.style.color = '';
        link.classList.remove('selected');
      }
    });
  }

// Función de validación
function validarUbicacion() {
    const dronErrorMessage = document.getElementById('ubicacion-error-message');
    if(itemSeleccionado == null){
      dronErrorMessage.textContent = "Por favor, agregar ubicaciones";
      dronErrorMessage.style.display = 'block';
      return false;
    }else{
      dronErrorMessage.style.display = 'none';
      dronErrorMessage.textContent = "";
      return true;
    }
  }

//Lógica del footer
$(document).ready(function() {
    var $footer = $('#footer');
  
    // Ocultar el footer cuando se hace click en un input
    $('input').on('focus', function() {
      $footer.hide();
    });
  
    // Mostrar el footer cuando se quita el foco del input
    $('input').on('blur', function() {
      $footer.show();
    });
});

//Lógica del pre-footer
$(document).ready(function() {
  var $prefooter = $('#pre-footer');

  // Ocultar el footer cuando se hace click en un input
  $('input').on('focus', function() {
    $prefooter.hide();
  });

  // Mostrar el footer cuando se quita el foco del input
  $('input').on('blur', function() {
    $prefooter.show();
  });
});

// Clikear botón finalizar registro
const finishButton = document.getElementById("continuar_registro_4");
finishButton.addEventListener("click", function() {
  // if (validarUbicacion()) {
  //   window.location.href = "../../html/registro_prestador/registro_paso_5.html";
  // }
  window.location.href = "../../html/registro_prestador/registro_paso_5.html";
});