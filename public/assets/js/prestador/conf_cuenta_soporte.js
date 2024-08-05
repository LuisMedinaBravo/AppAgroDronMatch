// Obtener el elemento del número
const numeroLabel = document.getElementById('numero_label');
// Obtener el elemento del correo electrónico
const emailLabel = document.getElementById('correo_label');

// Agregar evento de clic al elemento con ID "numero_label"
document.getElementById('numero_label').addEventListener('click', abrirWhatsApp);

function abrirWhatsApp() {
    // Crear un esquema de URI para abrir la aplicación de Whatsapp
    var whatsappUri = '';

    try {
        // Intentar abrir la aplicación de Whatsapp
        window.navigator.app.launch(new Intent(whatsappUri));
    } catch (e) {
        // Copiar el número al portapapeles
        navigator.clipboard.writeText('+569XXXXXXXX');

        // Mostrar el modal
        const modal = document.getElementById('modal_numero');
        modal.style.display = 'block';

        // Ocultar el modal después de 2 segundos
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);
    }
}

// Agregar el evento de clic
emailLabel.addEventListener('click', () => {
    // Copiar el correo electrónico al portapapeles
    navigator.clipboard.writeText('soporte@agrodronmatch.com');

    // Mostrar el modal
    const modal = document.getElementById('modal_correo');
    modal.style.display = 'block';

    // Ocultar el modal después de 2 segundos
    setTimeout(() => {
        modal.style.display = 'none';
    }, 2000);
});

$(document).ready(function() {
    // Show/hide the soporte section when the label is clicked
    $('#soporte_label').click(function() {
      $('#configuracion').hide();
      $('#soporte').toggle();
    });

    // Hide the soporte section when the back arrow is clicked
    $('.back-arrow').click(function() {
      $('#soporte').hide();
      $('#configuracion').show();
    });
});

$(document).ready(function() {
    // Show/hide the soporte section when the label is clicked
    $('#cuenta_label').click(function() {
      $('#configuracion').hide();
      $('#cuenta').toggle();
    });

    // Hide the soporte section when the back arrow is clicked
    $('.back-arrow').click(function() {
      $('#cuenta').hide();
      $('#configuracion').show();
    });
});

// Cerrar sesión
$(document).ready(function() {
  // Mostrar el modal cuando se hace clic en "Cerrar sesión"
  $("#cerrar_sesion").click(function() {
    $("#logout-modal").modal("show");
  });

  // Manejar el evento de cierre de sesión cuando se hace clic en el botón
  $("#logout-btn").click(function() {
    // Aquí puedes agregar la lógica para cerrar la sesión
    console.log("Cerrando sesión...");
    $("#logout-modal").modal("hide");
  });
});

// Cerrar el modal cuando se hace clic en "Cancelar"
$("[data-dismiss='modal']").click(function() {
  $("#logout-modal").modal("hide");
});

// Eliminar cuenta

$(document).ready(function() {
  // Mostrar el modal cuando se hace clic en "Cerrar sesión"
  $("#eliminar_cuenta").click(function() {
    document.getElementById('confirm-text').value = "";
    $("#delete-modal").modal("show");
  });
});

document.getElementById('confirm-text').addEventListener('input', function() {
  var confirmBtn = document.getElementById('delete-btn');
  if (this.value === 'agrodronmatch') {
      confirmBtn.disabled = false;
  } else {
      confirmBtn.disabled = true;
  }
});

// Cerrar el modal cuando se hace clic en "Cancelar"
$("[data-dismiss='modal']").click(function() {
  $("#delete-modal").modal("hide");
});