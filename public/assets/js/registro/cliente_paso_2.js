function formatRut(input) {
  let rut = input.value.replace(/[^0-9kK]/g, '');
  let rutLength = rut.length;

  // Permitir digitar si se borra algún dígito
  if (rutLength < 9) {
    input.disabled = false; // Habilitar el input si se borra algún dígito
  }

  // Limitar a 9 caracteres
  if (rut.length >= 9) {
    rut = rut.slice(0, 9);
    input.disabled = true; // Deshabilitar el input cuando se alcanzan los 9 dígitos
  }

  if (rutLength > 0) {
    rut = rut.substring(0, rutLength - 1) + '-' + rut.substring(rutLength - 1);
  }

  if (rutLength > 3) {
    rut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Limitar a 12 caracteres
  if (rut.length > 12) {
    rut = rut.slice(0, 12);
  }

  // Evitar eliminar el último número ingresado
  if (input.value.length > rut.length) {
    rut = rut.slice(0, 10);
  }

  input.value = rut;
}

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

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("ubicacion").value = "Geolocalización no soportada";
    }
}

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
    var currentLocationItem = document.createElement("li");
    var currentLocationLink = document.createElement("a");
    currentLocationLink.classList.add("dropdown-item");
    currentLocationLink.href = "#";
    currentLocationLink.textContent = "Ubicación actual ";
    // Crear el elemento de icono
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-map-marker-alt');

    // Agregar el icono al elemento del enlace
    currentLocationLink.appendChild(icon);
    currentLocationLink.onclick = function() {
        getLocation();
    };
    currentLocationItem.appendChild(currentLocationLink);
    menu.appendChild(currentLocationItem);

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
            loadRegiones();
        };
        comunaItem.appendChild(comunaLink);
        menu.appendChild(comunaItem);
    }
}

function setLocation(location) {
    // Actualizar el valor del campo de ubicación
    document.getElementById("ubicacion").value = location;
  
    // Cerrar el menú desplegable
    var dropdown = document.querySelector('.dropdown-toggle');
    dropdown.classList.remove('show');
    var dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('show');
}

//Preguntar acceso a ubicación
function askForLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          // El usuario aceptó compartir su ubicación
          //console.log(`Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`);
        },
        function(error) {
          // El usuario denegó el acceso a la ubicación
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.log("El usuario denegó el acceso a la ubicación.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("La información de ubicación no está disponible.");
              break;
            case error.TIMEOUT:
              console.log("La solicitud de ubicación ha expirado.");
              break;
            case error.UNKNOWN_ERROR:
              console.log("Ha ocurrido un error desconocido.");
              break;
          }
        }
      );
    } else {
      console.log("La geolocalización no está soportada en este navegador.");
    }
}

//askForLocation();