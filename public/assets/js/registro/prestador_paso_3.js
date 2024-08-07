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
              // Update the marca input value
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

          marcaErrorMessage.textContent = "";
          marcaInput.classList.remove("error");
      });

      // Hide the main-container and show the container-marcas
      document.getElementById('main-section').style.display = 'none';
      document.getElementById('container-marcas').style.display = 'block';
  })
  .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
});


let selectedModelos = [];

  document.getElementById('modelo').addEventListener('click', () => {
    fetch('../../json/drones-marca-modelo.json')
      .then(response => response.json())
      .then(data => {
        const selectedMarca = document.getElementById('marca').value.split(', ').pop();
        const selectedModelo = data.drones.find(item => item.marca === selectedMarca).modelo;

        const modelosContainer = document.getElementById('modelos-container');
        modelosContainer.innerHTML = '';

        selectedModelo.forEach(modelo => {
          const label = document.createElement('label');
          label.classList.add('mr-2', 'modelo-label');
          label.style.textAlign = 'left';
          label.style.width = '100%';
          label.style.color = 'black';
          label.style.backgroundColor = 'white';
          
          label.innerHTML = `<span><i class="fas fa-trademark"></i></span> ${modelo}`;

          // Agregar estilos y animación para cuando se hace clic en la etiqueta
          label.style.padding = '10px 20px'; // Aumentar el height del verde
          label.style.transition = 'background-color 0.3s ease, color 0.3s ease'; // Animación
          label.style.borderRadius = '20px'; // Agregar border-radius
          

          label.addEventListener('click', () => {
            document.getElementById('confirmar_modelos').disabled = false;
            //label.classList.toggle('selected');
            if (label.style.color === 'black') {
              label.style.color = 'white';
              label.style.backgroundColor = '#66bb6a';
              selectedModelos.push(modelo);
              // Actualizar el valor del input de modelo
              document.getElementById('modelo').value = selectedModelos.join(', ');

            } else {
              label.style.color = 'black';
              label.style.backgroundColor = 'white'; // Establecer el color verde
              selectedModelos = selectedModelos.filter(c => c !== modelo);
              // Actualizar el valor del input de modelo
              document.getElementById('modelo').value = selectedModelos.join(', ');
            }
            
            document.getElementById('modelo').value = selectedModelos.join(', ');
            if (selectedModelos.length > 0) {
              document.getElementById('confirmar_modelos').disabled = false;
            } else {
              document.getElementById('confirmar_modelos').disabled = true;
            }
          });

        // Verificar si el modelo está seleccionada y establecer el color verde
        if (selectedModelos.includes(modelo)) {
          label.style.backgroundColor = '#66bb6a';
          label.style.color = 'white';
        }

          modelosContainer.appendChild(label);
          const br = document.createElement('br');
          modelosContainer.appendChild(br);
        });

        document.getElementById('modelo').value = selectedModelos.join(', ');
        if (selectedModelos.length > 0) {
          document.getElementById('confirmar_modelos').disabled = false;
        } else {
          document.getElementById('confirmar_modelos').disabled = true;
        }

        document.getElementById('main-section').style.display = 'none';
        document.getElementById('container-modelos').style.display = 'block';
        
      })
      .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
  });

  // Agregar evento de clic al checkbox
  document.getElementById('checkbox').addEventListener('click', () => {
    // Obtener todos los labels de los modelos
    const modeloLabels = document.querySelectorAll('.modelo-label');

    // Recorrer todos los labels de los modelos
    modeloLabels.forEach(label => {
      // Si el checkbox está marcado, establecer el estilo del label como seleccionado
      if (document.getElementById('checkbox').checked) {
        label.style.color = 'white';
        label.style.backgroundColor = '#66bb6a';
        //label.classList.add('selected');
        selectedModelos.push(label.textContent.trim());
      } else {
        // Si el checkbox no está marcado, establecer el estilo del label como no seleccionado
        label.style.color = 'black';
        label.style.backgroundColor = 'white';
        //label.classList.remove('selected');
        selectedModelos = selectedModelos.filter(modelo => modelo !== label.textContent.trim());
      }
    });

    // Actualizar el valor del input de modelo
    document.getElementById('modelo').value = selectedModelos.join(', ');

    // Verificar si hay al menos una etiqueta seleccionada
    if (selectedModelos.length > 0) {
      document.getElementById('confirmar_modelos').disabled = false;
    } else {
      document.getElementById('confirmar_modelos').disabled = true;
    }
  });


// let selectedModelos= [];
// document.getElementById('modelo').addEventListener('click', () => {
//   fetch('../../json/drones-marca-modelo.json')
//       .then(response => response.json())
//       .then(data => {

//           const selectedMarca = document.getElementById('marca').value.split(', ').pop();
//           // Find the modelos for the selected marca
//           const selectedModelo = data.drones.find(item => item.marca === selectedMarca).modelo;

//           // Clear the previous modelos
//           const modelosContainer = document.getElementById('modelos-container');
//           modelosContainer.innerHTML = '';

//           // Crear una etiqueta para cada modelo y agregarla al contenedor de marcas
//           selectedModelo.forEach(modelo => {
//             const label = document.createElement('label');
//             label.classList.add('mr-2', 'modelo-label');
//             label.style.textAlign = 'left';
//             label.style.width = '100%';
//             label.innerHTML = `<span><i class="fas fa-trademark"></i></span> ${modelo}`;

//             // Agregar estilos y animación para cuando se hace clic en la etiqueta
//             label.style.padding = '10px 20px'; // Aumentar el height del verde
//             label.style.transition = 'background-color 0.3s ease, color 0.3s ease'; // Animación
//             label.style.borderRadius = '20px'; // Agregar border-radius

//             label.addEventListener('click', () => {
//                 document.getElementById('confirmar_modelos').disabled = false;
//                 if (label.style.color === 'white') {
//                   label.style.color = 'black';
//                   label.style.backgroundColor = 'transparent';
//                   selectedModelos = selectedModelos.filter(c => c !== modelo);
//                   // Actualizar el valor del input de modelo
//                   document.getElementById('modelo').value = selectedModelos.join(', ');
//                 } else {
//                   label.style.color = 'white';
//                   label.style.backgroundColor = '#66bb6a'; // Establecer el color verde
//                   selectedModelos.push(modelo);
//                   // Actualizar el valor del input de modelo
//                   document.getElementById('modelo').value = selectedModelos.join(', ');
//                 }

//                 // Verificar si hay al menos una etiqueta seleccionada
//                 if (selectedModelos.length > 0) {
//                   document.getElementById('confirmar_modelos').disabled = false;
//                 } else {
//                     document.getElementById('confirmar_modelos').disabled = true;
//                 }
//           });

//           // Verificar si el modelo está seleccionada y establecer el color verde
//           if (selectedModelos.includes(modelo)) {
//               label.style.backgroundColor = '#66bb6a';
//               label.style.color = 'white';
//           }

//           modelosContainer.appendChild(label);
//           const br = document.createElement('br');
//           modelosContainer.appendChild(br);

//           modeloErrorMessage.textContent = "";
//           modeloInput.classList.remove("error");
//         });

//           document.getElementById('main-section').style.display = 'none';
//           document.getElementById('container-modelos').style.display = 'block';
//       })
//       .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
// });

document.getElementById('cancelar_marcas').addEventListener('click', () => {
      document.getElementById('main-section').style.display = 'block';
      document.getElementById('container-marcas').style.display = 'none';
      document.getElementById("flecha-atras").style.display="block";
});

document.getElementById('cancelar_modelos').addEventListener('click', () => {
  document.getElementById('modelo').value = "";
  document.getElementById('main-section').style.display = 'block';
  document.getElementById('container-modelos').style.display = 'none';
});

document.getElementById('confirmar_modelos').addEventListener('click', () => {
  if (selectedModelos.length > 0) {
      document.getElementById('main-section').style.display = 'block';
      document.getElementById('container-modelos').style.display = 'none';

      //console.log('Comunas seleccionadas:', selectedModelos);
      
      modeloErrorMessage.textContent = "";
      modeloInput.classList.remove("error");
      // Actualizar el input de marca
      updateMarcaInput();
  } else {
      // Mostrar un mensaje de error
  }
});

// Agrega un event listener al botón "guardar_dron"
document.getElementById('guardar_dron').addEventListener('click', () => {
  saveDronesToLocalStorage();
});

function updateMarcaInput() {
  fetch('../../json/drones-marca-modelo.json')
      .then(response => response.json())
      .then(data => {
      // Get the list of marcas from the data
      const marcasSet = new Set();
      selectedModelos.forEach(modelo => {
          const region = data.drones.find(item => item.modelo.includes(modelo)).marca;
          marcasSet.add(region);
      });
      const marcas = Array.from(marcasSet);

      // Update the marca input value
      document.getElementById('marca').value = marcas.join(', ');

      // Update the modelo input value
      document.getElementById('modelo').value = selectedModelos.join(', ');

      })
      .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
}

function updateMarcaInputFromLocalStorage() {
  // Obtener los datos de drones del localStorage
  const drones = JSON.parse(localStorage.getItem('drones')) || {};

  // Obtener la lista de marcas y modelos seleccionados
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

  // Actualizar el input de marca
  document.getElementById('marca').value = marcas.join(', ');

  // Actualizar el input de modelo
  document.getElementById('modelo').value = selectedModelos.join(', ');
}

function saveDronesToLocalStorage() {
  fetch('../../json/drones-marca-modelo.json')
      .then(response => response.json())
      .then(data => {
          // Get the list of marcas from the data
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

          localStorage.setItem('drones', JSON.stringify(drones));
      })
      .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
}

// Obtener los elementos necesarios
const marcaInput = document.getElementById('marca');
const marcaErrorMessage = document.getElementById("marca-error-message");
const modeloInput = document.getElementById('modelo');
const modeloErrorMessage = document.getElementById("modelo-error-message");
const guardarDronBtn = document.getElementById('guardar_dron');
const agregarDronBtn = document.getElementById('agregar_dron');
const cancelarDronBtn = document.getElementById('cancelar_dron');
const continuarRegistroBtn = document.getElementById('continuar_registro_3');

// Agregar el evento de clic al botón "guardar_dron"
guardarDronBtn.addEventListener('click', () => {

  if(marcaInput.value === ''){
    
    marcaErrorMessage.textContent = "Por favor, ingresar la marca del dron";
    marcaInput.classList.add("error");
    modeloErrorMessage.textContent = "";
    modeloInput.classList.remove("error");

  }else if(modeloInput.value === ''){

    modeloErrorMessage.textContent = "Por favor, ingresar el modelo del dron";
    modeloInput.classList.add("error");
    marcaErrorMessage.textContent = "";
    marcaInput.classList.remove("error");

  }else if (marcaInput.value.trim() !== '' && modeloInput.value.trim() !== '') {

      marcaErrorMessage.textContent = "";
      marcaInput.classList.remove("error");
      modeloErrorMessage.textContent = "";
      modeloInput.classList.remove("error");
    
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
      updateMarcaInput();

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

  // Habilitar los inputs de "marca" y "modelo"
  marcaInput.disabled = false;
  modeloInput.disabled = true;

  document.getElementById("flecha-atras").style.display="none";
});

// Agregar el evento de clic al botón "cancelar_dron"
cancelarDronBtn.addEventListener('click', () => {

  // Ocultar los botones "guardar_dron" y "cancelar_dron"
  guardarDronBtn.style.display = 'none';
  cancelarDronBtn.style.display = 'none';

  // Mostrar el botón "agregar_dron"
  agregarDronBtn.style.display = 'inline-block';

  // Mostrar el botón "continuar_registro_3"
  continuarRegistroBtn.style.display = 'inline-block';

  // Limpiar y deshabilitar los inputs de "region" y "comuna"
  marcaInput.value = '';
  marcaInput.disabled = true;
  modeloInput.value = '';
  modeloInput.disabled = true;

  updateMarcaInputFromLocalStorage();

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