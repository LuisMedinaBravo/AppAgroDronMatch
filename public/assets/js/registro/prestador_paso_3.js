// Variable global para almacenar el ítem seleccionado
let itemSeleccionado = null;
//Cargar el archivo JSON con los drones
var marcasYModelos;

fetch('../../json/drones-marca-modelo.json')
  .then(response => response.json())
  .then(data => {
    marcasYModelos = data.drones;
    loadMarcas();
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

function loadMarcas() {
    var menu = document.getElementById("marcas-modelos");
    menu.innerHTML = ""; // Limpiar el menú antes de agregar las opciones

    menu.style.maxWidth = "240px"; // Establecer la anchura máxima a 240px
    menu.style.maxHeight = "240px"; // Establecer la altura máxima a 240px
    menu.style.overflowY = "auto"; // Habilitar el desplazamiento vertical

    // Agregar las marcas
    for (var i = 0; i < marcasYModelos.length; i++) {
        var marcaItem = document.createElement("li");
        var marcaLink = document.createElement("a");
        marcaLink.classList.add("dropdown-item");
        marcaLink.href = "#";
        marcaLink.textContent = marcasYModelos[i].marca;
        marcaLink.onclick = function() {
          const loadModelosPromise = new Promise((resolve, reject) => {
            loadModelos(this.textContent);
            resolve();
          });
            
          loadModelosPromise.then(() => {
              setTimeout(() => {
                  const elegirDron = document.getElementById('elegir_dron');
                  elegirDron.click();
              }, 300); // Espera 1 segundo antes de realizar el click
          }).catch((error) => {
              console.error('Ocurrió un error:', error);
          });
        };
        marcaItem.appendChild(marcaLink);
        menu.appendChild(marcaItem);
    }
    aplicarEstiloSeleccion(); // Llamar a la función para aplicar el estilo de selección
}

function loadModelos(marca) {
    var menu = document.getElementById("marcas-modelos");
    menu.innerHTML = ""; // Limpiar el menú antes de agregar las opciones

    menu.style.maxWidth = "240px"; // Establecer la anchura máxima a 240px
    menu.style.maxHeight = "240px"; // Establecer la altura máxima a 240px
    menu.style.overflowY = "auto"; // Habilitar el desplazamiento vertical

    var modelosItem = document.createElement("li");
    var modelosLink = document.createElement("a");
    modelosLink.classList.add("dropdown-item");
    modelosLink.href = "#";
    modelosLink.onclick = function() {
        // No hacer nada, este es solo un título
    };
    modelosItem.appendChild(modelosLink);
    menu.appendChild(modelosItem);

    for (var i = 0; i < marcasYModelos.find(r => r.marca === marca).modelo.length; i++) {
        var modeloItem = document.createElement("li");
        var modeloLink = document.createElement("a");
        modeloLink.classList.add("dropdown-item");
        modeloLink.href = "#";
        modeloLink.textContent = marcasYModelos.find(r => r.marca === marca).modelo[i];
        modeloLink.onclick = function() {
            setLocation(this.textContent);
            itemSeleccionado = this.textContent; // Actualiza la variable con el ítem seleccionado
            loadMarcas();
        };
        modeloItem.appendChild(modeloLink);
        menu.appendChild(modeloItem);
    }
    aplicarEstiloSeleccion(); // Llamar a la función para aplicar el estilo de selección
}

function setLocation(location) {
  // Obtener el valor actual del input
  var currentValue = document.getElementById("dron_preferencia").value;

  // Separar los drones seleccionados en un array
  var selectedDrones = currentValue.split(", ");

  // Verificar si el dron seleccionado ya está en la lista
  if (selectedDrones.includes(location)) {
    // Si ya está en la lista, no hacer nada
    return;
  }

  // Concatenar el valor actual con el nuevo dron seleccionado, separados por coma
  if (currentValue === "") {
    document.getElementById("dron_preferencia").value = location;
  } else {
    document.getElementById("dron_preferencia").value = currentValue + ", " + location;
  }

  // Guardar las ubicaciones en localStorage
  var locations = document.getElementById("dron_preferencia").value.split(", ");
  localStorage.setItem("dron_servicio", locations.join(","));
  
  // Obtener todos los enlaces dentro del menú desplegable
  var dropdownLinks = document.querySelectorAll("#marcas-modelos li a");

  // Remover los estilos de color de todos los enlaces
  dropdownLinks.forEach(function(link) {
    link.style.backgroundColor = '';
    link.style.color = '';
    link.classList.remove('selected'); // Elimina la clase 'selected' de todos los enlaces
  });

  // Agregar los estilos de color al enlace seleccionado
  var selectedLink = document.querySelector(`#marcas-modelos li a[textContent="${location}"]`);
  if (selectedLink) {
    selectedLink.style.backgroundColor = '#007bff';
    selectedLink.style.color = '#fff';
    selectedLink.classList.add('selected'); // Agrega la clase 'selected' al enlace seleccionado
  }

  // Actualizar la variable con el ítem seleccionado
  itemSeleccionado = location;

  // Cerrar el menú desplegable
  var dropdown = document.querySelector('.dropdown-toggle');
  dropdown.classList.remove('show');
  var dropdownMenu = document.querySelector('.dropdown-menu');
  dropdownMenu.classList.remove('show');
}

function aplicarEstiloSeleccion() {
  // Obtener todos los enlaces dentro del menú desplegable
  var dropdownLinks = document.querySelectorAll("#marcas-modelos li a");

  // Aplicar el estilo de color de fondo a los elementos seleccionados
  dropdownLinks.forEach(function(link) {
    if (itemSeleccionado && link.textContent === itemSeleccionado) {
      link.style.backgroundColor = '#007bff';
      link.style.color = '#fff';
      link.classList.add('selected');
    } else {
      link.style.backgroundColor = '';
      link.style.color = '';
      link.classList.remove('selected');
    }
  });
}

// Función de validación
function validarDron() {
  const dronErrorMessage = document.getElementById('dron-error-message');
  if(itemSeleccionado == null){
    dronErrorMessage.textContent = "Por favor, seleccionar dron a buscar";
    dronErrorMessage.style.display = 'block';
    return false;
  }else{
    dronErrorMessage.style.display = 'none';
    dronErrorMessage.textContent = "";
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

// Clikear botón finalizar registro
const finishButton = document.getElementById("continuar_registro_3");
finishButton.addEventListener("click", function() {
  // if (validarDron()) {
  //   window.location.href = "../../html/registro_prestador/registro_paso_4.html";
  // }
  window.location.href = "../../html/registro_prestador/registro_paso_4.html";
});