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