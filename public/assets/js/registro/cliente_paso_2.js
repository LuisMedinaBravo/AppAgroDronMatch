// Validación de Nombre
const nombreInput = document.getElementById("nombre");
const nombreErrorMessage = document.getElementById("nombre-error-message");

nombreInput.addEventListener('input', () => {
    const nombre = nombreInput.value.trim();
    if (nombre === "") {
        nombreErrorMessage.textContent = "Por favor, ingresar un nombre";
        nombreInput.classList.add("error");
    } else {
        nombreErrorMessage.textContent = "";
        nombreInput.classList.remove("error");
    }
});

// Validación de Nombre Agrícola
const nombreAgricolaInput = document.getElementById("nombre_agricola");
const nombreAgricolaErrorMessage = document.getElementById("nombre-agricola-error-message");

nombreAgricolaInput.addEventListener('input', () => {
    const nombre = nombreAgricolaInput.value.trim();
    if (nombre === "") {
      nombreAgricolaErrorMessage.textContent = "Por favor, ingresar un nombre";
        nombreAgricolaInput.classList.add("error");
    } else {
      nombreAgricolaErrorMessage.textContent = "";
        nombreAgricolaInput.classList.remove("error");
    }
});

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
    localStorage.setItem('nombre', nombre_value);
    return true;
  }
}


//Validar Nombre
function validarNombreAgricola() {

  const nombreAgricolaInput = document.getElementById("nombre_agricola");
  const nombreAgricolaErrorMessage = document.getElementById("nombre-agricola-error-message");
  const nombre_agricola_value = nombreAgricolaInput.value;

  if (nombre_agricola_value === "") {
    nombreAgricolaErrorMessage.textContent = "Por favor, ingresar un nombre agrícola";
    nombreAgricolaInput.classList.add("error");
    return false;
  } else {
    nombreAgricolaErrorMessage.textContent = "";
    nombreAgricolaInput.classList.remove("error");
    localStorage.setItem('nombre_agricola', nombre_agricola_value);
    return true;
  }
}

function validarFecha() {

  const calendarioInput = document.getElementById("nacimiento");
  const calendarioErrorMessage = document.getElementById("calendario-error-message");
  const calendario_value = calendarioInput.value;

  if (calendario_value === "") {
    calendarioErrorMessage.textContent = "Por favor, ingresar la fecha de nacimiento";
    calendarioInput.classList.add("error");
    return false;
  } else {
    calendarioErrorMessage.textContent = "";
    calendarioInput.classList.remove("error");
    localStorage.setItem('nacimiento', calendario_value);
    return true;
  }
}

//Número de teléfono

const dropdownButton = document.getElementById('dropdownMenuButtonTelefono');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = document.querySelectorAll('.dropdown-item');

// Agregar event listener al botón del menú desplegable
dropdownButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

// Agregar event listeners a los elementos del menú desplegable
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    // Obtener el HTML del elemento seleccionado
    const selectedHTML = item.innerHTML;

    // Actualizar el HTML del botón
    dropdownButton.innerHTML = selectedHTML;

    // Remover la clase 'active' de todos los elementos
    dropdownItems.forEach(item => item.classList.remove('active'));

    // Agregar la clase 'active' al elemento seleccionado
    item.classList.add('active');

    // Ocultar el menú desplegable
    dropdownMenu.classList.remove('show');
    localStorage.setItem('telefono', item.textContent.trim());
    document.getElementById('telefono').disabled=false;
  });
});

// Cerrar el menú desplegable cuando se hace clic fuera de él
document.addEventListener('click', (event) => {
  if (!event.target.matches('#dropdownMenuButtonTelefono, .dropdown-menu, .dropdown-item')) {
    dropdownMenu.classList.remove('show');
  }
});

  // Verificar teléfono input
  const telefonoInput = document.getElementById('telefono');
  const telefonoErrorMessage = document.getElementById('telefono-error-message');
  
  telefonoInput.addEventListener('input', function() {
    validarTelefono();
  });
  
  function validarTelefono() {
    // Use a regular expression to allow only numeric characters
    telefonoInput.value = telefonoInput.value.replace(/\D/g, '');
  
    const telefono_value = parseInt(telefonoInput.value, 10);
  
    if (telefonoInput.value === "") {
        telefonoErrorMessage.textContent = "Por favor, ingresar teléfono válido";
        telefonoErrorMessage.style.display = 'block';
        telefonoInput.classList.add('error');
        telefonoInput.style.border = '1px solid red';
      return false;
    } else if (telefonoInput.value.length == 9){
        telefonoErrorMessage.style.display = 'none';
        telefonoInput.classList.remove('error');
        telefonoInput.style.border = '';
        
        // Get the existing value from localStorage
        let existingTelefono = localStorage.getItem('telefono');
        if (!existingTelefono) {
          existingTelefono = '';
        }

        // Concatenate the new value to the existing value
        let updatedTelefono = existingTelefono + telefono_value;

        // Save the updated value to localStorage
        localStorage.setItem('telefono', updatedTelefono);
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

// Clikear botón continuar registro
const continueButton = document.getElementById("continuar_registro_2");
continueButton.addEventListener("click", function() {
  if (validarNombre() && validarNombreAgricola() && validarFecha() && validarTelefono()) {
    window.location.href = "registro_paso_3.html";
  }
});