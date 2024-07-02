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
  if (validarNombre() && validarNombreAgricola() && validarFecha()) {
    window.location.href = "registro_paso_3.html";
  }
});