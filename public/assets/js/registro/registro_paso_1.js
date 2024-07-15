// Validación de correo electrónico
const correoInput = document.getElementById("correo");
const correoErrorMessage = document.getElementById("correo-error-message");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

correoInput.addEventListener('input', () => {
    const correo = correoInput.value.trim();
    if (correo === "") {
        correoErrorMessage.textContent = "Por favor, ingresar un correo electrónico";
        correoInput.classList.add("error");
    } else if (!emailRegex.test(correo)) {
        correoErrorMessage.textContent = "El correo electrónico ingresado no es válido";
        correoInput.classList.add("error");
    } else {
        correoErrorMessage.textContent = "";
        correoInput.classList.remove("error");
        //localStorage.setItem('correo', correo);
    }
});

// Validación de contraseña
const claveInput = document.getElementById("clave");
const claveErrorMessage = document.getElementById("clave-error-message");
const claveRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

claveInput.addEventListener('input', () => {    
  const clave = claveInput.value.trim();
    if (clave === "") {
        claveErrorMessage.textContent = "Por favor, ingresar una contraseña";
        claveInput.classList.add("error");
    } else if (!claveRegex.test(clave)) {
        claveErrorMessage.textContent = "Mínimo 8 caracteres, con mayúsculas y números";
        claveInput.classList.add("error");
    } else {
        claveErrorMessage.textContent = "";
        claveInput.classList.remove("error");
        //localStorage.setItem('clave', clave);
    }
});

// Validación de repetir contraseña
const claveRepetirInput = document.getElementById("clave_repetir");
const claveRepetirErrorMessage = document.getElementById("clave-repetir-error-message");
const claveRepetirRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

claveRepetirInput.addEventListener('input', () => {    
  const clave_repetir = claveRepetirInput.value.trim();
  const clave = claveInput.value.trim();
  
  if (clave_repetir === "") {
    claveRepetirErrorMessage.textContent = "Por favor, reingresar la contraseña";
    claveRepetirInput.classList.add("error");
  } else if (clave_repetir !== clave) {
    claveRepetirErrorMessage.textContent = "Las contraseñas no coinciden";
    claveRepetirInput.classList.add("error");
  } else if (claveRegex.test(clave) && claveRepetirRegex.test(clave_repetir)) {
    claveRepetirErrorMessage.textContent = "";
    claveRepetirInput.classList.remove("error");
    //localStorage.setItem('clave', clave);
  } else {
    claveRepetirErrorMessage.textContent = "";
    claveRepetirInput.classList.add("error");
  }
});


// Validar Correo
function validarCorreo() {
  const correoInput = document.getElementById("correo");
  const correoErrorMessage = document.getElementById("correo-error-message");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const correo = correoInput.value.trim();
  if (correo === "") {
    correoErrorMessage.textContent = "Por favor, ingresar un correo electrónico";
    correoInput.classList.add("error");
    return false;
  } else if (!emailRegex.test(correo)) {
    return false;
  } else {
    localStorage.setItem('correo', correo);
    return true;
  }
}

// Validar clave
function validarClave() {
  const claveInput = document.getElementById("clave");
  const claveErrorMessage = document.getElementById("clave-error-message"); // Suponemos que existe este elemento
  const claveRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const clave = claveInput.value.trim();
  if (clave === "") {
    claveErrorMessage.textContent = "Por favor, ingresar una contraseña";
    claveInput.classList.add("error");
    return false;
  } else if (!claveRegex.test(clave)) {
    showTooltip();
    return false;
  } else {
    //localStorage.setItem('clave', clave);
    return true;
  }
}

// Validar clave
function validarRepetirClave() {
  const claveRepetirInput = document.getElementById("clave_repetir");
  const claveRepetirErrorMessage = document.getElementById("clave-repetir-error-message"); // Suponemos que existe este elemento
  const claveRepetirRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const clave = claveInput.value.trim();
  const claveRepetir = claveRepetirInput.value.trim();
  if (claveRepetir === "") {
    claveRepetirErrorMessage.textContent = "Por favor, reingresar la contraseña";
    claveRepetirInput.classList.add("error");
    return false;
  } else if (claveRepetir !== clave) {
    claveRepetirErrorMessage.textContent = "Las contraseñas no coinciden";
    claveRepetirInput.classList.add("error");
    return false;
  }else{
    claveRepetirErrorMessage.textContent = "";
    claveRepetirInput.classList.remove("error");
    localStorage.setItem('clave', claveRepetir);
    return true;
  }
}

// Lógica para mostrar/ocultar la contraseña
//const claveInputt = document.getElementById("clave");
const ojoSpan = document.getElementById("ojo");
const ojoIcon = ojoSpan.querySelector("i");

ojoSpan.addEventListener("click", function() {
  if (claveInput.type === "password" && claveRepetirInput.type === "password") {
    claveInput.type = "text";
    claveRepetirInput.type = "text";
    ojoIcon.classList.remove("fa-eye");
    ojoIcon.classList.add("fa-eye-slash");
  } else {
    claveInput.type = "password";
    claveRepetirInput.type = "password";
    ojoIcon.classList.remove("fa-eye-slash");
    ojoIcon.classList.add("fa-eye");
  }
});

// Lógica para mostrar el tooltip
function showTooltip() {
  var tooltipElement = document.getElementById("tooltiptext");
  tooltipElement.classList.toggle("visible");   
}

// Lógica para ocultar el tooltip al hacer clic en los inputs con ID "correo" y "clave"
document.addEventListener("click", function(event) {
  var targetElement = event.target;
  if (targetElement.matches("#correo, #clave, #container, #footer")) {
      hideTooltip();
  }
});

// Función para ocultar el tooltip
function hideTooltip() {
  var tooltipElement = document.getElementById("tooltiptext");
  tooltipElement.classList.remove("visible");
  tooltipElement.classList.add("hidden");
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

//Clikear botón continuar registro
const continueButton = document.getElementById("continuar_registro");
continueButton.addEventListener("click", function() {
    if (validarCorreo() && validarClave() && validarRepetirClave()) {
        //alert("¡Registro exitoso!");
        if(localStorage.getItem('perfil')=="cliente"){
          window.location.href = "registro_cliente/registro_paso_2.html";
        }else if(localStorage.getItem('perfil')=="prestador"){
          window.location.href = "registro_prestador/registro_paso_2.html";
        }else{
          location.reload();
        }
    }
});