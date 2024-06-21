function toggleDropdown(button) {
    button.classList.toggle("show");
    button.nextElementSibling.classList.toggle("show");
}

function selectOption(option) {
    const button = option.parentNode.previousElementSibling;
    button.textContent = option.textContent;
    button.setAttribute("value", option.getAttribute("value"));
    toggleDropdown(button);
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