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
        localStorage.setItem('nombre', nombre);
    }
});

// Validación de Empresa
const empresaInput = document.getElementById("empresa");
const empresaErrorMessage = document.getElementById("empresa-error-message");

empresaInput.addEventListener('input', () => {
    const empresa = empresaInput.value.trim();
    if (empresa === "") {
        empresaErrorMessage.textContent = "Por favor, ingresar un nombre de empresa";
        empresaInput.classList.add("error");
    } else {
        empresaErrorMessage.textContent = "";
        empresaInput.classList.remove("error");
        localStorage.setItem('empresa', empresa);
    }
});

// Validación de Fecha de Nacimiento
const calendarioInput = document.getElementById("nacimiento");
const calendarioErrorMessage = document.getElementById("calendario-error-message");

calendarioInput.addEventListener('input', () => {
    const calendario = calendarioInput.value.trim();
    if (calendario === "") {
        calendarioErrorMessage.textContent = "Por favor, ingresar la fecha de nacimiento";
        calendarioInput.classList.add("error");
    } else {
        calendarioErrorMessage.textContent = "";
        calendarioInput.classList.remove("error");
        localStorage.setItem('nacimiento', calendario);
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
    localStorage.setItem('nombre', nombre_value);
    return true;
  }
}

//Validar Nombre
function validarEmpresa() {
  
  const empresaInput = document.getElementById("empresa");
  const empresaErrorMessage = document.getElementById("empresa-error-message");
  const empresa_value = empresaInput.value;

  if (empresa_value === "") {
    empresaErrorMessage.textContent = "Por favor, ingresa un nombre de empresa";
    empresaInput.classList.add("error");
    return false;
  } else {
    localStorage.setItem('empresa', empresa_value);
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
  if (validarNombre() && validarEmpresa() && validarFecha()) {
    window.location.href = "../../html/registro_prestador/registro_paso_3.html";
  }
});