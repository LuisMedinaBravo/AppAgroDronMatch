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
    empresaErrorMessage.textContent = "";
    empresaInput.classList.remove("error");
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

// Clikear botón continuar registro
const continueButton = document.getElementById("continuar_registro_2");
continueButton.addEventListener("click", function() {
  const rut_Input = document.getElementById('rut');
  if (validarNombre() && verificarRut(rut_Input)) {
    window.location.href = "../../html/registro_prestador/registro_paso_3.html";
  }
});