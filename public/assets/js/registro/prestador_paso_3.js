// Agregar un evento de carga de la página
window.addEventListener('load', () => {
  localStorage.removeItem('drones');
});

document.getElementById('marca').addEventListener('click', () => {
document.getElementById("flecha-atras").style.display="none";
fetch('../../json/drones-marca-modelo.json')
  .then(response => response.json())
  .then(data => {
      // Get the list of marcas from the data
      const marcas = data.drones.map(item => item.marca);

      // Create a label for each marca and append it to the marcas-container
      const marcasContainer = document.getElementById('marcas-container');
      marcasContainer.innerHTML = ''; // Clear the container before adding new labels

      marcas.forEach(marca => {
          const label = document.createElement('label');
          label.classList.add('mr-2');
          label.style.textAlign = 'left';
          label.style.width = '100%';
          label.innerHTML = `
            <span class="input-group-text" style="background-color: white; border: none; display: flex; align-items: center;">
              <img src="../../img/png/dron_icono.png" style="width: 30px; height: 40px; margin-right: 6px; filter: brightness(0);">
              ${marca}
            </span>
            `;
          label.addEventListener('click', () => {
              // Update the region input value
              document.getElementById('marca').value = marca;
              // Obtener el elemento de entrada de texto
              document.getElementById('modelo').disabled = false;
              document.getElementById('modelo').value = "";
              // Show the main section and hide the container-marcas section
              document.getElementById('main-section').style.display = 'block';
              document.getElementById('container-marcas').style.display = 'none';
          });
          marcasContainer.appendChild(label);
          const br = document.createElement('br');
          marcasContainer.appendChild(br);
      });
      // Hide the main-container and show the container-marcas
      document.getElementById('main-section').style.display = 'none';
      document.getElementById('container-marcas').style.display = 'block';
  })
  .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
});


let selectedModelos= [];
document.getElementById('modelo').addEventListener('click', () => {
  // Fetch the regiones-comunas.json file
  fetch('../../json/drones-marca-modelo.json')
      .then(response => response.json())
      .then(data => {
          // Get the selected region from the input field
          //const selectedRegion = document.getElementById('region').value;
          const selectedMarca = document.getElementById('marca').value.split(', ').pop();
          // Find the communes for the selected region
          const selectedModelo = data.drones.find(item => item.marca === selectedMarca).modelo;

          // Clear the previous communes
          const modelosContainer = document.getElementById('modelos-container');
          modelosContainer.innerHTML = '';

          // Crear una etiqueta para cada comuna y agregarla al contenedor de comunas
          selectedModelo.forEach(modelo => {
          const label = document.createElement('label');
          label.classList.add('mr-2', 'modelo-label');
          label.style.textAlign = 'left';
          label.style.width = '100%';
          label.innerHTML = `<span><i class="fas fa-trademark"></i></span> ${modelo}`;

          // Agregar estilos y animación para cuando se hace clic en la etiqueta
          label.style.padding = '10px 20px'; // Aumentar el height del verde
          label.style.transition = 'background-color 0.3s ease, color 0.3s ease'; // Animación
          label.style.borderRadius = '20px'; // Agregar border-radius

          label.addEventListener('click', () => {
              // Actualizar el valor del input de comuna cuando se hace clic en una comuna
              if (label.style.color === 'white') {
              label.style.color = 'black';
              label.style.backgroundColor = 'transparent';
              selectedModelos = selectedModelos.filter(c => c !== modelo);
              // Actualizar el valor del input de comuna
              document.getElementById('modelo').value = selectedModelos.join(', ');
              } else {
              label.style.color = 'white';
              label.style.backgroundColor = '#66bb6a'; // Establecer el color verde
              selectedModelos.push(modelo);
              // Actualizar el valor del input de comuna
              document.getElementById('modelo').value = selectedModelos.join(', ');
              }
          });

          // Verificar si la comuna está seleccionada y establecer el color verde
          if (selectedModelos.includes(modelo)) {
              label.style.backgroundColor = '#66bb6a';
              label.style.color = 'white';
          }

          modelosContainer.appendChild(label);
          const br = document.createElement('br');
          modelosContainer.appendChild(br);
          });

          // Show the container-comunas section
          document.getElementById('main-section').style.display = 'none';
          document.getElementById('container-modelos').style.display = 'block';
      })
      .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
});

document.getElementById('cancelar_marcas').addEventListener('click', () => {
      document.getElementById('main-section').style.display = 'block';
      document.getElementById('container-marcas').style.display = 'none';
});

document.getElementById('cancelar_modelos').addEventListener('click', () => {
  document.getElementById('modelo').value = "";
  document.getElementById('main-section').style.display = 'block';
  document.getElementById('container-modelos').style.display = 'none';
});

document.getElementById('confirmar_modelos').addEventListener('click', () => {
  if (selectedModelos.length > 0) {
      document.getElementById('estanque').disabled = false;
      document.getElementById('main-section').style.display = 'block';
      document.getElementById('container-modelos').style.display = 'none';
      // Aquí puedes guardar las comunas seleccionadas
      console.log('Comunas seleccionadas:', selectedModelos);
      // Ocultar el mensaje de error
      //document.getElementById('ubicacion-error-message').textContent = '';
      // Actualizar el input de region
      updateRegionInput();
  } else {
      // Mostrar un mensaje de error
      //document.getElementById('ubicacion-error-message').textContent = 'Debe seleccionar al menos una comuna.';
  }
});

// Agrega un event listener al botón "guardar_dron"
document.getElementById('guardar_dron').addEventListener('click', () => {
  saveUbicacionesToLocalStorage();
});

function updateRegionInput() {
  // Fetch the regiones-comunas.json file
  fetch('../../json/drones-marca-modelo.json')
      .then(response => response.json())
      .then(data => {
      // Get the list of regions from the data
      const marcasSet = new Set();
      selectedModelos.forEach(modelo => {
          const region = data.drones.find(item => item.modelo.includes(modelo)).marca;
          marcasSet.add(region);
      });
      const marcas = Array.from(marcasSet);

      // Update the region input value
      document.getElementById('marca').value = marcas.join(', ');

      // Update the comuna input value
      document.getElementById('modelo').value = selectedModelos.join(', ');

      })
      .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
}

function updateRegionInputFromLocalStorage() {
  // Obtener los datos de drones del localStorage
  const drones = JSON.parse(localStorage.getItem('drones')) || {};

  // Obtener la lista de regiones y comunas seleccionadas
  const selectedModelos = [];
  const marcasSet = new Set();
  for (const marca in drones) {
      const modelos = drones[marca];
      modelos.forEach(modelo => {
        selectedModelos.push(modelo);
          marcasSet.add(marca);
      });
  }
  const marcas = Array.from(marcasSet);

  // Actualizar el input de región
  document.getElementById('marca').value = marcas.join(', ');

  // Actualizar el input de comuna
  document.getElementById('modelo').value = selectedModelos.join(', ');
}

function saveUbicacionesToLocalStorage() {
  // Fetch the regiones-comunas.json file
  fetch('../../json/drones-marca-modelo.json')
      .then(response => response.json())
      .then(data => {
          // Get the list of regions from the data
          const marcasSet = new Set();
          const drones = {};
          selectedModelos.forEach(modelo => {
              const marca = data.drones.find(item => item.modelo.includes(modelo)).marca;
              marcasSet.add(marca);
              if (!drones[marca]) {
                drones[marca] = [];
              }
              drones[marca].push(modelo);
          });
          const marcas = Array.from(marcasSet);

          // Guardar la región y las comunas en el localStorage
          localStorage.setItem('drones', JSON.stringify(drones));
      })
      .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
}



// Obtener los elementos necesarios
const marcaInput = document.getElementById('marca');
const marcaErrorMessage = document.getElementById("marca-error-message");
const modeloInput = document.getElementById('modelo');
const modeloErrorMessage = document.getElementById("modelo-error-message");
const estanqueInput = document.getElementById("estanque");
const estanqueErrorMessage = document.getElementById("estanque-error-message");
const guardarDronBtn = document.getElementById('guardar_dron');
const agregarDronBtn = document.getElementById('agregar_dron');
const cancelarDronBtn = document.getElementById('cancelar_dron');
const continuarRegistroBtn = document.getElementById('continuar_registro_3');

var estanqueValidacion = false;

marcaInput.addEventListener('input', () => {
  const marca = marcaInput.value.trim();
  if (marca === "") {
      marcaErrorMessage.textContent = "Por favor, ingresar marca del dron";
      marcaInput.classList.add("error");
  } else {
      marcaErrorMessage.textContent = "";
      marcaInput.classList.remove("error");
  }
});

modeloInput.addEventListener('input', () => {
const modelo = modeloInput.value.trim();
if (modelo === "") {
    modeloErrorMessage.textContent = "Por favor, ingresar modelo del dron";
    modeloInput.classList.add("error");
} else {
    modeloErrorMessage.textContent = "";
    modeloInput.classList.remove("error");
}
});

estanqueInput.addEventListener('input', () => {
const estanque = estanqueInput.value.replace(/Litros/i, '').trim();
const dotCount = (estanque.match(/\./g) || []).length;
if (estanque === "" || estanque === "." || dotCount > 1 || /^\.\d+$/.test(estanque)) {
  estanqueErrorMessage.textContent = "Por favor, ingresar la capacidad del estanque";
  estanqueInput.classList.add("error");
} else {
  estanqueErrorMessage.textContent = "";
  estanqueInput.classList.remove("error");
  estanqueValidacion = true;
}
});

// Agregar el evento de clic al botón "guardar_dron"
guardarDronBtn.addEventListener('click', () => {

  if(marcaInput.value === ''){
    
    marcaErrorMessage.textContent = "Por favor, ingresar la marca del dron";
    marcaInput.classList.add("error");
    modeloErrorMessage.textContent = "";
    modeloInput.classList.remove("error");
    estanqueErrorMessage.textContent = "";
    estanqueInput.classList.remove("error");

  }else if(modeloInput.value === ''){

    modeloErrorMessage.textContent = "Por favor, ingresar el modelo del dron";
    modeloInput.classList.add("error");
    marcaErrorMessage.textContent = "";
    marcaInput.classList.remove("error");
    estanqueErrorMessage.textContent = "";
    estanqueInput.classList.remove("error");

  }else if(estanqueValidacion == false){

    estanqueErrorMessage.textContent = "Por favor, ingresar la capacidad del estanque";
    estanqueInput.classList.add("error");
    marcaErrorMessage.textContent = "";
    marcaInput.classList.remove("error");
    modeloErrorMessage.textContent = "";
    modeloInput.classList.remove("error");
    
  } else if (marcaInput.value.trim() !== '' && modeloInput.value.trim() !== '' && estanqueValidacion == true) {

      marcaErrorMessage.textContent = "";
      marcaInput.classList.remove("error");
      modeloErrorMessage.textContent = "";
      modeloInput.classList.remove("error");
      estanqueErrorMessage.textContent = "";
      estanqueInput.classList.remove("error");
    
      document.getElementById('estanque').disabled = true;
      // Ocultar el botón "guardar_dron"
      guardarDronBtn.style.display = 'none';
      cancelarDronBtn.style.display = 'none';

      // Mostrar los botones "agregar_dron" y "continuar_registro_3"
      agregarDronBtn.style.display = 'inline-block';
      continuarRegistroBtn.style.display = 'inline-block';
      marcaInput.value = "";
      marcaInput.disabled = true;
      modeloInput.value = "";
      modeloInput.disabled = true;
      updateRegionInput();

      document.getElementById("flecha-atras").style.display="block";
  }
});

// Agregar el evento de clic al botón "agregar_dron"
agregarDronBtn.addEventListener('click', () => {
  // Mostrar los botones "guardar_dron" y "cancelar_dron"

  continuarRegistroBtn.style.display = 'none';

  guardarDronBtn.style.display = 'inline-block';
  cancelarDronBtn.style.display = 'inline-block';

  // Ocultar el botón "agregar_dron"
  agregarDronBtn.style.display = 'none';

  // Habilitar los inputs de "region" y "comuna"
  marcaInput.disabled = false;
  modeloInput.disabled = true;

  document.getElementById("flecha-atras").style.display="none";
});

// Agregar el evento de clic al botón "cancelar_dron"
cancelarDronBtn.addEventListener('click', () => {

  document.getElementById('estanque').disabled = true;
  // Ocultar los botones "guardar_dron" y "cancelar_dron"
  guardarDronBtn.style.display = 'none';
  cancelarDronBtn.style.display = 'none';

  // Mostrar el botón "agregar_dron"
  agregarDronBtn.style.display = 'inline-block';

  // Mostrar el botón "continuar_registro_4"
  continuarRegistroBtn.style.display = 'inline-block';

  // Limpiar y deshabilitar los inputs de "region" y "comuna"
  marcaInput.value = '';
  marcaInput.disabled = true;
  modeloInput.value = '';
  modeloInput.disabled = true;

  updateRegionInputFromLocalStorage();

  document.getElementById("flecha-atras").style.display="block";
});


// Obtener el campo de entrada
const marca = document.getElementById('marca');
// Agregar un evento de 'focus' al campo de entrada
marca.addEventListener('focus', (event) => {
  // Evitar que el teclado se abra
  event.preventDefault();
  // Enfocar el campo de entrada
  marca.blur();
});

// Obtener el campo de entrada
const modelo = document.getElementById('modelo');
// Agregar un evento de 'focus' al campo de entrada
modelo.addEventListener('focus', (event) => {
  // Evitar que el teclado se abra
  event.preventDefault();
  // Enfocar el campo de entrada
  modelo.blur();
});

function verificarCapacidadEstanque() {
  const capacidad_estanque = document.getElementById('estanque');
  const currentPosition = capacidad_estanque.selectionStart;

  // Reemplazar cualquier carácter que no sea un número o un punto por una cadena vacía
  let nuevovalor = capacidad_estanque.value.replace(/[^0-9.]/g, '');
  // Agregar "Litros" solo si hay un valor ingresado
  if (nuevovalor !== '') {
    nuevovalor += " Litros";
  }
  capacidad_estanque.value = nuevovalor;
  // Restablecer la posición del cursor
  capacidad_estanque.setSelectionRange(currentPosition, currentPosition);
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
const continueButton = document.getElementById("continuar_registro_3");
continueButton.addEventListener("click", function() {
    window.location.href = "../../html/registro_prestador/registro_paso_4.html";
});