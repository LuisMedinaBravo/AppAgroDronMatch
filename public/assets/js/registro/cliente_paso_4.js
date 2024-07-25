/* CONEXION FIREBASE */

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// Importar base de datos FIRESTORE
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
// Importar AUTHENTICATION
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYmN4AgZ7ErfKE_vih5yMuKkc9_8cVuR0",
  authDomain: "agrodronmatchapp.firebaseapp.com",
  projectId: "agrodronmatchapp",
  storageBucket: "agrodronmatchapp.appspot.com",
  messagingSenderId: "321379887089",
  appId: "1:321379887089:web:3c1ff1f586b358c2df0650"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Get the Firebase Authentication instance
const auth = getAuth(app);


// Seleccionar los elementos relevantes
const dropdownButton = document.getElementById('dropdownMenuButtonCultivo');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const otherCultivoInput = document.getElementById('otro-cultivo');

otherCultivoInput.addEventListener('click', function() {
  this.style.width = '100%';
  // Remove the placeholder text when the input is clicked
  this.placeholder = 'Otro...';
});

otherCultivoInput.addEventListener('input', function() {
  // Limitar el input a 17 caracteres
  this.value = this.value.slice(0, 17);
  
  // Actualizar el valor del botón con el valor del input "Otro"
  dropdownButton.textContent = this.value || 'Tipo de cultivo';
  localStorage.setItem('cultivo', this.value);
});

// Agregar event listener al botón del menú desplegable
dropdownButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

// Agregar event listeners a los elementos del menú desplegable
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    // Obtener el texto del elemento seleccionado
    const selectedText = item.textContent;

    // Actualizar el texto del botón
    dropdownButton.textContent = selectedText;

    // Remover la clase 'active' de todos los elementos
    dropdownItems.forEach(item => item.classList.remove('active'));

    // Agregar la clase 'active' al elemento seleccionado
    item.classList.add('active');

    // Ocultar el menú desplegable
    dropdownMenu.classList.remove('show');
    localStorage.setItem('cultivo', selectedText);

    // Clear the "otro" input
    // otherCultivoInput.value = '';
    // otherCultivoInput.placeholder = "";
  });
});

otherCultivoInput.addEventListener('click', (event) => {
  // Mantener el menú desplegable abierto
  event.stopPropagation();
  dropdownMenu.classList.add('show');
});

otherCultivoInput.addEventListener('input', () => {
  // Actualizar el valor del botón con el valor del input "Otro"
  dropdownButton.textContent = otherCultivoInput.value || 'Tipo de cultivo';
  localStorage.setItem('cultivo', otherCultivoInput.value);
});

// Cerrar el menú desplegable cuando se hace clic fuera de él
document.addEventListener('click', (event) => {
    if (!event.target.matches('#dropdownMenuButtonCultivo, .dropdown-menu, .dropdown-item')) {
      dropdownMenu.classList.remove('show');
    }
});

function validarCultivoSeleccionado() {
  const selectedOption = document.querySelector('.dropdown-item.active');
  const cultivoErrorMessage = document.getElementById('cultivo-error-message');
  const tiposDeCultivo = ['Tipo de cultivo'];

  if (!selectedOption && otherCultivoInput.value.trim() === '') {
    cultivoErrorMessage.textContent = 'Por favor, seleccionar un tipo de cultivo';
    return false;
  } else if(dropdownButton.textContent.trim() === 'Tipo de cultivo'){
    cultivoErrorMessage.textContent = 'Por favor, seleccionar un tipo de cultivo';
    return false;
  } else {
    cultivoErrorMessage.textContent = '';
    return true;
  }
}
  
  // Verificar hectárea
const hectareaInput = document.getElementById('hectarea');
const hectareaErrorMessage = document.getElementById('hectarea-error-message');

hectareaInput.addEventListener('input', function() {
  validarHectarea();
});

function validarHectarea() {
  // Use a regular expression to allow only numeric characters
  hectareaInput.value = hectareaInput.value.replace(/\D/g, '');

  const hectarea_value = parseInt(hectareaInput.value, 10);

  if (hectareaInput.value === "") {
      hectareaErrorMessage.textContent = "Por favor, ingresar hectáreas a buscar";
      hectareaErrorMessage.style.display = 'block';
      hectareaInput.classList.add('error');
      hectareaInput.style.border = '1px solid red';
      return false;
  } else if (isNaN(hectarea_value) || hectarea_value === 0) {
      hectareaErrorMessage.textContent = "Ingrese un número válido";
      hectareaErrorMessage.style.display = 'block';
      hectareaInput.classList.add('error');
      hectareaInput.style.border = '1px solid red';
      return false;
  } else if (hectarea_value < 1 || hectarea_value > 500) {
      hectareaErrorMessage.textContent = "El número de hectáreas debe estar entre 1 y 500.";
      hectareaErrorMessage.style.display = 'block';
      hectareaInput.classList.add('error');
      hectareaInput.style.border = '1px solid red';
      return false;
  } else {
      hectareaErrorMessage.style.display = 'none';
      hectareaInput.classList.remove('error');
      hectareaInput.style.border = '';
      localStorage.setItem('hectarea', hectarea_value);
      return true;
  }
}


// Agregar un evento de carga de la página
window.addEventListener('load', () => {
    localStorage.removeItem('drones_cliente');
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
                document.getElementById('container').style.display = 'block';
                document.getElementById('container-marcas').style.display = 'none';
                document.getElementById("flecha-atras").style.display="block";

                var $prefooter = $('#pre-footer');
                $prefooter.show();
                var $footer = $('#footer');
                $footer.show();

            });
            marcasContainer.appendChild(label);
            const br = document.createElement('br');
            marcasContainer.appendChild(br);
  
            marcaErrorMessage.textContent = "";
            marcaInput.classList.remove("error");
        });
  
        // Hide the main-container and show the container-marcas
        document.getElementById('container').style.display = 'none';
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

        document.getElementById('container').style.display = 'none';
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
  
  document.getElementById('cancelar_marcas').addEventListener('click', () => {
    document.getElementById('container').style.display = 'block';
    document.getElementById('container-marcas').style.display = 'none';
    document.getElementById("flecha-atras").style.display="block";
    var $prefooter = $('#pre-footer');
    $prefooter.show();
    var $footer = $('#footer');
    $footer.show();
  });
  
  document.getElementById('cancelar_modelos').addEventListener('click', () => {
    document.getElementById('modelo').value = "";
    document.getElementById('container').style.display = 'block';
    document.getElementById('container-modelos').style.display = 'none';
    document.getElementById("flecha-atras").style.display="block";
    var $prefooter = $('#pre-footer');
    $prefooter.show();
    var $footer = $('#footer');
    $footer.show();
  });
  
  document.getElementById('confirmar_modelos').addEventListener('click', () => {
    if (selectedModelos.length > 0) {
        document.getElementById('container').style.display = 'block';
        // Asegurar que el checkbox esté deseleccionado
        document.getElementById('container-modelos').style.display = 'none';
  
        //console.log('Comunas seleccionadas:', selectedModelos);
        
        modeloErrorMessage.textContent = "";
        modeloInput.classList.remove("error");

        var $prefooter = $('#pre-footer');
        $prefooter.show();
        var $footer = $('#footer');
        $footer.show();
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
    const drones = JSON.parse(localStorage.getItem('drones_cliente')) || {};
  
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
  
            localStorage.setItem('drones_cliente', JSON.stringify(drones));
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
  const continuarRegistroBtn = document.getElementById('finalizar_registro');
  
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
  
        // Mostrar los botones "agregar_dron" y "finalizar_registro"
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
  
    // Mostrar el botón "finalizar_registro"
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

  const nprogress = document.getElementById('nprogress');
  const loader = document.getElementById('spinner');
  const nprogressText1 = document.getElementById('nprogress-text-1');
  const nprogressText2 = document.getElementById('nprogress-text-2');
  const nprogressText3 = document.getElementById('nprogress-text-3');
  const container = document.getElementById('container');
  const flechaAtras = document.getElementById('flecha-atras');
  
  // Obtener los datos del localStorage
  const predio = JSON.parse(localStorage.getItem("predio"));
  const drones = JSON.parse(localStorage.getItem("drones_cliente"));
  const perfil = localStorage.getItem("perfil") 

  

  // Clikear botón finalizar registro
  const finishButton = document.getElementById("finalizar_registro");
  finishButton.addEventListener("click", function() {
    //if (validarCultivoSeleccionado() && validarHectarea() && validarMarca() && validarModelo()) {
    if (validarCultivoSeleccionado() && validarHectarea()) {
    //if (validarCultivoSeleccionado() && validarHectarea() && validarDron()) {
      const correo = localStorage.getItem("correo");
      const clave = localStorage.getItem("clave");
  
      if(correo != "" && clave !=""){
        // Mostrar el loader, el nprogress y todos los textos
        nprogress.style.display = 'block';
        loader.style.display = 'block';
        container.style.display = 'none';
        // Deshabilitamos los clics en el elemento
        flechaAtras.style.pointerEvents = 'none';
  
        registerUser(correo, clave)
        .then((user) => {
          //console.log('Usuario registrado:', user);
          // Ocultar el loader después de 2 segundos
          setTimeout(() => {
            loader.style.display = 'none';
            // Mostrar el primer texto durante 2 segundos
            nprogressText1.style.display = 'block';
          }, 3000);
          // Ocultar el primer texto después de 2 segundos más
          setTimeout(() => {
            nprogressText1.style.display = 'none';
            // Mostrar el segundo texto durante 2 segundos
            nprogressText2.style.display = 'block';
            
          }, 6000);
          // Ocultar el segundo texto después de 2 segundos más
          setTimeout(() => {
            nprogress.style.display = 'none';
            nprogressText2.style.display = 'none';
            
            window.location.href = "../../html/iniciar_sesion.html";
            //container.style.display = 'block';
            
          }, 9000);
      })
      .catch((error) => {
          //console.error('Error al registrar el usuario:', error);
      
          // Mostrar el loader
          nprogress.style.display = 'block';
          loader.style.display = 'block';
          nprogressText1.style.display = 'none';
          nprogressText2.style.display = 'none';
          nprogressText3.style.display = 'none';
      
          container.style.display = 'none';
          flechaAtras.style.pointerEvents = 'none';
      
          // Ocultar el loader después de 2 segundos
          setTimeout(() => {
            nprogress.style.display = 'none';  
            loader.style.display = 'none';
            // Mostrar el nprogressText3 durante 2 segundos
            nprogressText3.style.display = 'block';
          }, 3000);
      
          // Ocultar el nprogressText3 después de 2 segundos más
          setTimeout(() => {
            nprogress.style.display = 'none';
            loader.style.display = 'none';
            nprogressText3.style.display = 'none';
            container.style.display = 'block';
            flechaAtras.style.pointerEvents = 'auto';
          }, 6000);
      });
      }else{
         // Mostrar el loader
         nprogress.style.display = 'block';
         loader.style.display = 'block';
         nprogressText1.style.display = 'none';
         nprogressText2.style.display = 'none';
         nprogressText3.style.display = 'none';
     
         container.style.display = 'none';
         flechaAtras.style.pointerEvents = 'none';
     
         // Ocultar el loader después de 2 segundos
         setTimeout(() => {
           nprogress.style.display = 'none';
           loader.style.display = 'none';
           // Mostrar el nprogressText3 durante 2 segundos
           nprogressText3.style.display = 'block';
         }, 3000);
     
         // Ocultar el nprogressText3 después de 2 segundos más
         setTimeout(() => {
           nprogress.style.display = 'none';
           loader.style.display = 'none';
           nprogressText3.style.display = 'none';
           container.style.display = 'block';
           flechaAtras.style.pointerEvents = 'auto';
         }, 6000);
      }
    }
  });

  async function registerUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user);

      // Guardar los datos del usuario
      await new Promise((resolve, reject) => {
        sendEmailVerification(user)
          .then(() => {
            const userData = {
              correo: localStorage.getItem("correo"),
              nombre: localStorage.getItem("nombre"),
              nombre_agricola: localStorage.getItem("nombre_agricola"),
              fecha_nacimiento: localStorage.getItem("nacimiento"),
              telefono: localStorage.getItem("telefono"),
              predio: {
                direccion: predio.address,
                region: predio.region.replace("Región", "").replace("de", "").replace("del", "").replace("la", "")
              },
              tipo_cultivo: localStorage.getItem("cultivo"),
              hectarea: localStorage.getItem("hectarea"),
              dron: {
                DJI: drones?.DJI || "",
                XAG: drones?.XAG || ""
              }
            };
            saveUserData(userData)
            console.log("User data saved");
            resolve();
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
            reject(error);
          });
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

// Función para guardar un documento en la colección "users"
async function saveUserData(userData) {
  try {
    const id = addDoc(collection(db, perfil), userData);
    console.log("Documento guardado con ID: ", id.id);
  } catch (e) {
    console.error("Error al guardar el documento: ", e);
  }
}