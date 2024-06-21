var rutInput = document.getElementById('rut');
rutInput.addEventListener('input', () => formatRut(rutInput));

//Validar Nombre
function validarNombre() {

  const nombreInput = document.getElementById("nombre");
  const nombreErrorMessage = document.getElementById("nombre-error-message");
  const nombre_value = nombreInput.value;

  if (nombre_value === "") {
    nombreErrorMessage.textContent = "Por favor, ingresa un nombre";
    nombreInput.classList.add("error");
    return false;
  } else {
    nombreErrorMessage.textContent = "";
    nombreInput.classList.remove("error");
    return true;
  }
}

//Validar Rut
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
  return true;
}

//Comprobar dígito verificador
function verificarRut(rutInput) {
  let rut = rutInput.value.replace(/[^0-9kK]/g, '');
  let digitoVerificador = rut.slice(-1).toUpperCase();
  let rutSinDigito = rut.slice(0, -1);

  function calcularDigitoVerificador(rutSinDigito) {
    let suma = 0;
    let multiplo = 2;

    for (let i = rutSinDigito.length - 1; i >= 0; i--) {
      suma += parseInt(rutSinDigito.charAt(i)) * multiplo;
      multiplo++;
      if (multiplo > 7) {
        multiplo = 2;
      }
    }

    let resto = suma % 11;
    let digitoVerificador = 11 - resto;

    if (digitoVerificador === 11) {
      return '0';
    } else if (digitoVerificador === 10) {
      return 'K';
    } else {
      return digitoVerificador.toString();
    }
  }

  let digitoCalculado = calcularDigitoVerificador(rutSinDigito);
  const rut_de_Input = document.getElementById("rut");
  const rutErrorMessage = document.getElementById("rut-error-message");

  if (digitoVerificador === digitoCalculado) {
    rutErrorMessage.textContent = "";
    rut_de_Input.classList.remove("error");
    return true;
  } else {
    rutErrorMessage.textContent = "Por favor, ingresa un rut válido";
    rutInput.classList.add("error");
    return false;
  }
}

//Lógica para el ícono del basurero
$(document).ready(function() {
  $('#basurero').click(function() {
    $('#rut').val('');
    $('#rut').prop('disabled', false);
  });
});

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

// Clikear botón continuar registro
const continueButton = document.getElementById("continuar_registro_2");
continueButton.addEventListener("click", function() {
  const rut_Input = document.getElementById('rut');
  const ubicacion_Input = document.getElementById('ubicacion');

  if(validarNombre() == true && verificarRut(rutInput)== true){
    if(ubicacion_Input.value.trim() === ""){
      ubicacion_Input.value = "Ingresar ubicación";
      ubicacion_Input.style.border = "1px solid red";
    }else if(validarNombre() != false && verificarRut(rutInput) != false && ubicacion_Input.value != "Ingresar ubicación"){
      ubicacion_Input.value = "";
      ubicacion_Input.style.border = "";
      window.location.href = "../../html/registro_cliente/registro_paso_3.html";
    }
  }
});