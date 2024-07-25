// Agregar un evento de carga de la página
window.addEventListener('load', () => {
    localStorage.removeItem('ubicaciones');
});
document.getElementById('region').addEventListener('click', () => {

    document.getElementById("flecha-atras").style.display="none";
// Fetch the regiones-comunas.json file
fetch('../../json/comunas-regiones.json')
    .then(response => response.json())
    .then(data => {
        // Get the list of regions from the data
        const regiones = data.regiones.map(item => item.region);

        // Create a label for each region and append it to the regiones-container
        const regionesContainer = document.getElementById('regiones-container');
        regionesContainer.innerHTML = ''; // Clear the container before adding new labels

        regiones.forEach(region => {
            const label = document.createElement('label');
            label.classList.add('mr-2');
            label.style.textAlign = 'left';
            label.style.width = '100%';
            label.innerHTML = `<span><i class="fas fa-map"></i></span> ${region}`;
            label.addEventListener('click', () => {
                // Update the region input value
                document.getElementById('region').value = region;
                // Obtener el elemento de entrada de texto
                document.getElementById('comuna').disabled = false;
                document.getElementById('comuna').value = "";
                // Show the main section and hide the container-regiones section
                document.getElementById('main-section').style.display = 'block';
                document.getElementById('container-regiones').style.display = 'none';
            });
            regionesContainer.appendChild(label);
            const br = document.createElement('br');
            regionesContainer.appendChild(br);

            regionErrorMessage.textContent = "";
            regionInput.classList.remove("error");
              
        });
        
        // Hide the main-container and show the container-regiones
        document.getElementById('main-section').style.display = 'none';
        document.getElementById('container-regiones').style.display = 'block';
    })
    .catch(error => console.error('Error fetching regiones-comunas.json:', error));
});

let selectedComunas = [];

  document.getElementById('comuna').addEventListener('click', () => {
    fetch('../../json/comunas-regiones.json')
      .then(response => response.json())
      .then(data => {
        // Get the selected region from the input field
            //const selectedRegion = document.getElementById('region').value;
            const selectedRegion = document.getElementById('region').value.split(', ').pop();
            // Find the communes for the selected region
            const selectedComunes = data.regiones.find(item => item.region === selectedRegion).comunas;

            // Clear the previous communes
            const comunasContainer = document.getElementById('comunas-container');
            comunasContainer.innerHTML = '';

            // Crear una etiqueta para cada comuna y agregarla al contenedor de comunas
            selectedComunes.forEach(comuna => {
            const label = document.createElement('label');
            label.classList.add('mr-2', 'comuna-label');
            label.style.textAlign = 'left';
            label.style.width = '100%';
            label.style.color = 'black';
            label.style.backgroundColor = 'white';
            label.innerHTML = `<span><i class="fas fa-map-marker-alt"></i></span> ${comuna}`;

            // Agregar estilos y animación para cuando se hace clic en la etiqueta
            label.style.padding = '10px 20px'; // Aumentar el height del verde
            label.style.transition = 'background-color 0.3s ease, color 0.3s ease'; // Animación
            label.style.borderRadius = '20px'; // Agregar border-radius 

          label.addEventListener('click', () => {
            document.getElementById('confirmar_comunas').disabled = false;
            //label.classList.toggle('selected');
            if (label.style.color === 'black') {
              label.style.color = 'white';
              label.style.backgroundColor = '#66bb6a';
              selectedComunas.push(comuna);
              // Actualizar el valor del input de modelo
              document.getElementById('comuna').value = selectedComunas.join(', ');

            } else {
              label.style.color = 'black';
              label.style.backgroundColor = 'white'; // Establecer el color verde
              selectedComunas = selectedComunas.filter(c => c !== comuna);
              // Actualizar el valor del input de modelo
              document.getElementById('comuna').value = selectedComunas.join(', ');
            }
            
            document.getElementById('comuna').value = selectedComunas.join(', ');
            if (selectedComunas.length > 0) {
              document.getElementById('confirmar_comunas').disabled = false;
            } else {
              document.getElementById('confirmar_comunas').disabled = true;
            }
          });

        // Verificar si el modelo está seleccionada y establecer el color verde
        if (selectedComunas.includes(comuna)) {
          label.style.backgroundColor = '#66bb6a';
          label.style.color = 'white';
        }

          comunasContainer.appendChild(label);
          const br = document.createElement('br');
          comunasContainer.appendChild(br);
        });

        document.getElementById('comuna').value = selectedComunas.join(', ');
        if (selectedComunas.length > 0) {
          document.getElementById('confirmar_comunas').disabled = false;
        } else {
          document.getElementById('confirmar_comunas').disabled = true;
        }

        document.getElementById('main-section').style.display = 'none';
        document.getElementById('container-comunas').style.display = 'block';
        
      })
      .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
  });

  // Agregar evento de clic al checkbox
  document.getElementById('checkbox').addEventListener('click', () => {
    // Obtener todos los labels de los modelos
    const comunaLabels = document.querySelectorAll('.comuna-label');

    // Recorrer todos los labels de los modelos
    comunaLabels.forEach(label => {
      // Si el checkbox está marcado, establecer el estilo del label como seleccionado
      if (document.getElementById('checkbox').checked) {
        label.style.color = 'white';
        label.style.backgroundColor = '#66bb6a';
        //label.classList.add('selected');
        selectedComunas.push(label.textContent.trim());
      } else {
        // Si el checkbox no está marcado, establecer el estilo del label como no seleccionado
        label.style.color = 'black';
        label.style.backgroundColor = 'white';
        //label.classList.remove('selected');
        selectedComunas = selectedComunas.filter(comuna => comuna !== label.textContent.trim());
      }
    });

    // Actualizar el valor del input de modelo
    document.getElementById('comuna').value = selectedComunas.join(', ');

    // Verificar si hay al menos una etiqueta seleccionada
    if (selectedComunas.length > 0) {
      document.getElementById('confirmar_comunas').disabled = false;
    } else {
      document.getElementById('confirmar_comunas').disabled = true;
    }
  });
  
document.getElementById('cancelar_regiones').addEventListener('click', () => {
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('container-regiones').style.display = 'none';
    document.getElementById("flecha-atras").style.display="block";
});

document.getElementById('cancelar_comunas').addEventListener('click', () => {
    document.getElementById('comuna').value = "";
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('container-comunas').style.display = 'none';
});

document.getElementById('confirmar_comunas').addEventListener('click', () => {
    if (selectedComunas.length > 0) {
        document.getElementById('main-section').style.display = 'block';
        document.getElementById('container-comunas').style.display = 'none';
        // Aquí puedes guardar las comunas seleccionadas
        console.log('Comunas seleccionadas:', selectedComunas);
        comunaErrorMessage.textContent = "";
        comunaInput.classList.remove("error");
        // Ocultar el mensaje de error
        //document.getElementById('ubicacion-error-message').textContent = '';
        // Actualizar el input de region
        updateRegionInput();
    } else {
        // Mostrar un mensaje de error
        //document.getElementById('ubicacion-error-message').textContent = 'Debe seleccionar al menos una comuna.';
    }
});

// Agrega un event listener al botón "guardar_ubicacion"
document.getElementById('guardar_ubicacion').addEventListener('click', () => {
    saveUbicacionesToLocalStorage();
});

function updateRegionInput() {
    // Fetch the regiones-comunas.json file
    fetch('../../json/comunas-regiones.json')
        .then(response => response.json())
        .then(data => {
        // Get the list of regions from the data
        const regionesSet = new Set();
        selectedComunas.forEach(comuna => {
            const region = data.regiones.find(item => item.comunas.includes(comuna)).region;
            regionesSet.add(region);
        });
        const regiones = Array.from(regionesSet);

        // Update the region input value
        document.getElementById('region').value = regiones.join(', ');

        // Update the comuna input value
        document.getElementById('comuna').value = selectedComunas.join(', ');

        })
        .catch(error => console.error('Error fetching regiones-comunas.json:', error));
}

function updateRegionInputFromLocalStorage() {
    // Obtener los datos de ubicaciones del localStorage
    const ubicaciones = JSON.parse(localStorage.getItem('ubicaciones')) || {};

    // Obtener la lista de regiones y comunas seleccionadas
    const selectedComunas = [];
    const regionesSet = new Set();
    for (const region in ubicaciones) {
        const comunas = ubicaciones[region];
        comunas.forEach(comuna => {
            selectedComunas.push(comuna);
            regionesSet.add(region);
        });
    }
    const regiones = Array.from(regionesSet);

    // Actualizar el input de región
    document.getElementById('region').value = regiones.join(', ');

    // Actualizar el input de comuna
    document.getElementById('comuna').value = selectedComunas.join(', ');
}

function saveUbicacionesToLocalStorage() {
    // Fetch the regiones-comunas.json file
    fetch('../../json/comunas-regiones.json')
        .then(response => response.json())
        .then(data => {
            // Get the list of regions from the data
            const regionesSet = new Set();
            const ubicaciones = {};
            selectedComunas.forEach(comuna => {
                const region = data.regiones.find(item => item.comunas.includes(comuna)).region;
                regionesSet.add(region);
                if (!ubicaciones[region]) {
                    ubicaciones[region] = [];
                }
                ubicaciones[region].push(comuna);
            });
            const regiones = Array.from(regionesSet);

            // Guardar la región y las comunas en el localStorage
            localStorage.setItem('ubicaciones', JSON.stringify(ubicaciones));
        })
        .catch(error => console.error('Error fetching regiones-comunas.json:', error));
}



// Obtener los elementos necesarios
const regionInput = document.getElementById('region');
const regionErrorMessage = document.getElementById("region-error-message");
const comunaInput = document.getElementById('comuna');
const comunaErrorMessage = document.getElementById("comuna-error-message");
const guardarUbicacionBtn = document.getElementById('guardar_ubicacion');
const agregarUbicacionBtn = document.getElementById('agregar_ubicacion');
const cancelarUbicacionBtn = document.getElementById('cancelar_ubicacion');
const continuarRegistroBtn = document.getElementById('continuar_registro_4');

// Agregar el evento de clic al botón "guardar_ubicacion"
guardarUbicacionBtn.addEventListener('click', () => {

    if(regionInput.value.trim() === ''){
    
        regionErrorMessage.textContent = "Por favor, ingresar región";
        regionInput.classList.add("error");
        comunaErrorMessage.textContent = "";
        comunaInput.classList.remove("error");
    
      }else if(comunaInput.value.trim() === ''){
    
        comunaErrorMessage.textContent = "Por favor, ingresar comuna";
        comunaInput.classList.add("error");
        regionErrorMessage.textContent = "";
        regionInput.classList.remove("error");

    }else if (regionInput.value.trim() !== '' && comunaInput.value.trim() !== '') {

        regionErrorMessage.textContent = "";
        regionInput.classList.remove("error");
        comunaErrorMessage.textContent = "";
        comunaInput.classList.remove("error");
        // Ocultar el botón "guardar_ubicacion"
        guardarUbicacionBtn.style.display = 'none';
        cancelarUbicacionBtn.style.display = 'none';

        // Mostrar los botones "agregar_ubicacion" y "continuar_registro_4"
        agregarUbicacionBtn.style.display = 'inline-block';
        continuarRegistroBtn.style.display = 'inline-block';
        regionInput.value = "";
        regionInput.disabled = true;
        comunaInput.value = "";
        comunaInput.disabled = true;
        updateRegionInput();

        document.getElementById("flecha-atras").style.display="block";
    }
});

// Agregar el evento de clic al botón "agregar_ubicacion"
agregarUbicacionBtn.addEventListener('click', () => {
    // Mostrar los botones "guardar_ubicacion" y "cancelar_ubicacion"

    continuarRegistroBtn.style.display = 'none';

    guardarUbicacionBtn.style.display = 'inline-block';
    cancelarUbicacionBtn.style.display = 'inline-block';

    // Ocultar el botón "agregar_ubicacion"
    agregarUbicacionBtn.style.display = 'none';

    // Habilitar los inputs de "region" y "comuna"
    regionInput.disabled = false;
    comunaInput.disabled = true;

    document.getElementById("flecha-atras").style.display="none";
});

// Agregar el evento de clic al botón "cancelar_ubicacion"
cancelarUbicacionBtn.addEventListener('click', () => {
    // Ocultar los botones "guardar_ubicacion" y "cancelar_ubicacion"
    guardarUbicacionBtn.style.display = 'none';
    cancelarUbicacionBtn.style.display = 'none';

    // Mostrar el botón "agregar_ubicacion"
    agregarUbicacionBtn.style.display = 'inline-block';

    // Mostrar el botón "continuar_registro_4"
    continuarRegistroBtn.style.display = 'inline-block';

    // Limpiar y deshabilitar los inputs de "region" y "comuna"
    regionInput.value = '';
    regionInput.disabled = true;
    comunaInput.value = '';
    comunaInput.disabled = true;

    updateRegionInputFromLocalStorage();

    document.getElementById("flecha-atras").style.display="block";
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
const finishButton = document.getElementById("continuar_registro_4");
finishButton.addEventListener("click", function() {
  window.location.href = "../../html/registro_prestador/registro_paso_5.html";
});