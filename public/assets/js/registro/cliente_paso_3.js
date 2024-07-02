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

//MAPA

// Clikear botón continuar registro
const continueButton = document.getElementById("continuar_registro_3");
continueButton.addEventListener("click", function() {

    window.location.href = "registro_paso_4.html";
});