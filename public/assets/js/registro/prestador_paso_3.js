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