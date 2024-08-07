// // Seleccionar los elementos relevantes
// const dropdownButton = document.getElementById('dropdownMenuButtonCultivo');
// const dropdownMenu = document.querySelector('.dropdown-menu');
// const dropdownItems = document.querySelectorAll('.dropdown-item');
// const otherCultivoInput = document.getElementById('otro-cultivo');
// const marcaInput = document.getElementById('marca');
// const marcaErrorMessage = document.getElementById('marca-error-message');
// const modeloInput = document.getElementById('modelo');
// const modeloErrorMessage = document.getElementById('modelo-error-message');

// otherCultivoInput.addEventListener('click', function() {
//   this.style.width = '100%';
//   // Remove the placeholder text when the input is clicked
//   this.placeholder = 'Otro...';
// });

// otherCultivoInput.addEventListener('input', function() {
//   // Limitar el input a 17 caracteres
//   this.value = this.value.slice(0, 17);
  
//   // Actualizar el valor del botón con el valor del input "Otro"
//   dropdownButton.textContent = this.value || 'Tipo de cultivo';
//   localStorage.setItem('cultivo', this.value);
// });

// // Agregar event listener al botón del menú desplegable
// dropdownButton.addEventListener('click', () => {
//   dropdownMenu.classList.toggle('show');
// });

// // Agregar event listeners a los elementos del menú desplegable
// dropdownItems.forEach(item => {
//   item.addEventListener('click', () => {
//     // Obtener el texto del elemento seleccionado
//     const selectedText = item.textContent;

//     // Actualizar el texto del botón
//     dropdownButton.textContent = selectedText;

//     // Remover la clase 'active' de todos los elementos
//     dropdownItems.forEach(item => item.classList.remove('active'));

//     // Agregar la clase 'active' al elemento seleccionado
//     item.classList.add('active');

//     // Ocultar el menú desplegable
//     dropdownMenu.classList.remove('show');
//     localStorage.setItem('cultivo', selectedText);

//     // Clear the "otro" input
//     // otherCultivoInput.value = '';
//     // otherCultivoInput.placeholder = "";
//   });
// });

// otherCultivoInput.addEventListener('click', (event) => {
//   // Mantener el menú desplegable abierto
//   event.stopPropagation();
//   dropdownMenu.classList.add('show');
// });

// otherCultivoInput.addEventListener('input', () => {
//   // Actualizar el valor del botón con el valor del input "Otro"
//   dropdownButton.textContent = otherCultivoInput.value || 'Tipo de cultivo';
//   localStorage.setItem('cultivo', otherCultivoInput.value);
// });

// // Ocultar el menú desplegable al hacer clic fuera de él
// window.addEventListener('click', (event) => {
//   if (!event.target.matches('.btn-secondary, .dropdown-item, #otro-cultivo')) {
//     dropdownMenu.classList.remove('show');
//     // Mostrar el valor almacenado en localStorage
//     const cultivoGuardado = localStorage.getItem('cultivo');
//     if (cultivoGuardado) {
//       dropdownButton.textContent = cultivoGuardado;
//     } else {
//       dropdownButton.textContent = 'Tipo de cultivo';
//     }
//     // Clear the "otro" input
//   //   otherCultivoInput.value = '';
//   //   otherCultivoInput.placeholder = "";
//   }
// });

// function validarCultivoSeleccionado() {
//   const selectedOption = document.querySelector('.dropdown-item.active');
//   const cultivoErrorMessage = document.getElementById('cultivo-error-message');

//   if (!selectedOption && otherCultivoInput.value.trim() === '') {
//     cultivoErrorMessage.textContent = 'Por favor, seleccionar un tipo de cultivo';
//     return false;
//   } else {
//     cultivoErrorMessage.textContent = '';
//     return true;
//   }
// }
  
//   // Verificar hectárea
// const hectareaInput = document.getElementById('hectarea');
// const hectareaErrorMessage = document.getElementById('hectarea-error-message');

// hectareaInput.addEventListener('input', function() {
//   validarHectarea();
// });

// function validarHectarea() {
//   // Use a regular expression to allow only numeric characters
//   hectareaInput.value = hectareaInput.value.replace(/\D/g, '');

//   const hectarea_value = parseInt(hectareaInput.value, 10);

//   if (hectareaInput.value === "") {
//     hectareaErrorMessage.textContent = "Por favor, ingresar hectáreas a buscar";
//     hectareaErrorMessage.style.display = 'block';
//     hectareaInput.classList.add('error');
//     hectareaInput.style.border = '1px solid red';
//     return false;
//   } else if (isNaN(hectarea_value) || hectarea_value === 0) {
//     hectareaErrorMessage.textContent = "Ingrese un número válido";
//     hectareaErrorMessage.style.display = 'block';
//     hectareaInput.classList.add('error');
//     hectareaInput.style.border = '1px solid red';
//     return false;
//   } else if (hectarea_value < 1 || hectarea_value > 500) {
//     hectareaErrorMessage.textContent = "El número de hectáreas debe estar entre 1 y 500.";
//     hectareaErrorMessage.style.display = 'block';
//     hectareaInput.classList.add('error');
//     hectareaInput.style.border = '1px solid red';
//     return false;
//   } else {
//     hectareaErrorMessage.style.display = 'none';
//     hectareaInput.classList.remove('error');
//     hectareaInput.style.border = '';
//     localStorage.setItem('hectarea', hectarea_value);
//     return true;
//   }
// }

// // Agregar un evento de carga de la página
// window.addEventListener('load', () => {
//   localStorage.removeItem('dron');
// });

// document.getElementById('marca').addEventListener('click', () => {
//   document.getElementById("flecha-atras").style.display="none";
//   fetch('../../json/drones-marca-modelo.json')
//     .then(response => response.json())
//     .then(data => {
//       // Get the list of marcas from the data
//       const marcas = data.drones.map(item => item.marca);

//       // Create a label for each marca and append it to the marcas-container
//       const marcasContainer = document.getElementById('marcas-container');
//       marcasContainer.innerHTML = ''; // Clear the container before adding new labels

//       marcas.forEach(marca => {
//         const label = document.createElement('label');
//         label.classList.add('mr-2');
//         label.style.textAlign = 'left';
//         label.style.width = '100%';
//         label.innerHTML = `
//           <span class="input-group-text" style="background-color: white; border: none; display: flex; align-items: center;">
//             <img src="../../img/png/dron_icono.png" style="width: 30px; height: 40px; margin-right: 6px; filter: brightness(0);">
//             ${marca}
//           </span>
//         `;
//         label.addEventListener('click', () => {
//           // Update the marca input value
//           document.getElementById('marca').value = marca;
//           // Obtener el elemento de entrada de texto
//           document.getElementById('modelo').disabled = false;
//           document.getElementById('modelo').value = "";
//           // Show the main section and hide the container-marcas section
//           document.getElementById('container').style.display = 'block';
//           document.getElementById('container-marcas').style.display = 'none';
//           // Llamar a la función para cargar los modelos
//           loadModelos(marca);
//         });
//         marcasContainer.appendChild(label);
//         const br = document.createElement('br');
//         marcasContainer.appendChild(br);

//         marcaErrorMessage.textContent = "";
//         marcaInput.classList.remove("error");
//       });

//       // Hide the main-container and show the container-marcas
//       document.getElementById('container').style.display = 'none';
//       document.getElementById('container-marcas').style.display = 'block';
//     })
//     .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
// });

// function loadModelos(selectedMarca) {
//   fetch('../../json/drones-marca-modelo.json')
//     .then(response => response.json())
//     .then(data => {
//       // Find the modelos for the selected marca
//       const selectedModelo = data.drones.find(item => item.marca === selectedMarca).modelo;

//       // Clear the previous modelos
//       const modelosContainer = document.getElementById('modelos-container');
//       modelosContainer.innerHTML = '';

//       // Crear una etiqueta para cada modelo y agregarla al contenedor de marcas
//       selectedModelo.forEach(modelo => {
//         const label = document.createElement('label');
//         label.classList.add('mr-2', 'modelo-label');
//         label.style.textAlign = 'left';
//         label.style.width = '100%';
//         label.innerHTML = `<span><i class="fas fa-trademark"></i></span> ${modelo}`;

//         // Agregar estilos y animación para cuando se hace clic en la etiqueta
//         label.style.padding = '10px 20px'; // Aumentar el height del verde
//         label.style.transition = 'background-color 0.3s ease, color 0.3s ease'; // Animación
//         label.style.borderRadius = '20px'; // Agregar border-radius

//         label.addEventListener('click', () => {
//           // Deseleccionar cualquier otro modelo previamente seleccionado
//           const modeloLabels = document.querySelectorAll('.modelo-label');
//           modeloLabels.forEach(l => {
//             l.style.color = 'black';
//             l.style.backgroundColor = 'transparent';
//           });

//           // Seleccionar el modelo actual
//           label.style.color = 'white';
//           label.style.backgroundColor = '#66bb6a'; // Establecer el color verde

//           const marca = document.getElementById('marca').value;
//           document.getElementById('modelo').value = modelo;

//           // Guardar los valores en el localStorage
//           localStorage.setItem('dron', JSON.stringify({ marca, modelo }));
          
//           document.getElementById('confirmar_modelos').disabled = false;
//         });

//         modelosContainer.appendChild(label);
//         const br = document.createElement('br');
//         modelosContainer.appendChild(br);

//         modeloErrorMessage.textContent = "";
//         modeloInput.classList.remove("error");
//       });

//       document.getElementById('container').style.display = 'none';
//       document.getElementById('container-modelos').style.display = 'block';
//     })
//     .catch(error => console.error('Error fetching drones-marca-modelo.json:', error));
// }

// document.getElementById('cancelar_marcas').addEventListener('click', () => {
//       document.getElementById('container').style.display = 'block';
//       document.getElementById('container-marcas').style.display = 'none';
// });

// document.getElementById('cancelar_modelos').addEventListener('click', () => {
//   document.getElementById('modelo').value = "";
//   document.getElementById('container').style.display = 'block';
//   document.getElementById('container-modelos').style.display = 'none';
// });

// document.getElementById('confirmar_modelos').addEventListener('click', () => {
 
//   document.getElementById('container').style.display = 'block';
//       document.getElementById('container-modelos').style.display = 'none';

//       const marca = document.getElementById('marca').value;
//       const modelo = document.getElementById('modelo').value;    
//       document.getElementById('marca').value = marca + " - " + modelo;

//       // Guardar los valores en el localStorage
//       //localStorage.setItem('dron', JSON.stringify({ marca, modelo }));
//       // Mostrar el container principal y ocultar el container de modelos
//       document.getElementById('container').style.display = 'block';
//       document.getElementById('container-modelos').style.display = 'none';
// });

// //Agrega un event listener
// document.getElementById('cancelar_modelos').addEventListener('click', () => {
//   localStorage.removeItem('dron');
// });

// function validarMarca() {
//   if (marcaInput.value.trim() === '') {
//     marcaErrorMessage.textContent = 'Por favor, seleccionar una marca';
//     return false;
//   } else {
//     marcaErrorMessage.textContent = '';
//     return true;
//   }
// }

// function validarModelo() {
//   if (modeloInput.value.trim() === '') {
//     modeloErrorMessage.textContent = 'Por favor, seleccionar un modelo';
//     return false;
//   } else {
//     modeloErrorMessage.textContent = '';
//     return true;
//   }
// }

//   //Lógica del footer
//   $(document).ready(function() {
//       var $footer = $('#footer');
    
//       // Ocultar el footer cuando se hace click en un input
//       $('input').on('focus', function() {
//         $footer.hide();
//       });
    
//       // Mostrar el footer cuando se quita el foco del input
//       $('input').on('blur', function() {
//         $footer.show();
//       });
//   });

//   //Lógica del pre-footer
//   $(document).ready(function() {
//     var $prefooter = $('#pre-footer');

//     // Ocultar el footer cuando se hace click en un input
//     $('input').on('focus', function() {
//       $prefooter.hide();
//     });

//     // Mostrar el footer cuando se quita el foco del input
//     $('input').on('blur', function() {
//       $prefooter.show();
//     });
//   });
  
// const nprogress = document.getElementById('nprogress');
// const loader = document.getElementById('spinner');
// const nprogressText1 = document.getElementById('nprogress-text-1');
// const nprogressText2 = document.getElementById('nprogress-text-2');
// const nprogressText3 = document.getElementById('nprogress-text-3');
// const container = document.getElementById('container');
// const flechaAtras = document.getElementById('flecha-atras');

// // Clikear botón finalizar registro
// const finishButton = document.getElementById("finalizar_registro");
// finishButton.addEventListener("click", function() {
//   if (validarCultivoSeleccionado() && validarHectarea() && validarMarca() && validarModelo()) {
//   //if (validarCultivoSeleccionado() && validarHectarea() && validarDron()) {
//     const correo = localStorage.getItem("correo");
//     const clave = localStorage.getItem("clave");

//     if(correo != "" && clave !=""){
//       // Mostrar el loader, el nprogress y todos los textos
//       nprogress.style.display = 'block';
//       loader.style.display = 'block';
//       container.style.display = 'none';
//       // Deshabilitamos los clics en el elemento
//       flechaAtras.style.pointerEvents = 'none';

//       registerUser(correo, clave)
//       .then((user) => {
//         //console.log('Usuario registrado:', user);
//         // Ocultar el loader después de 2 segundos
//         setTimeout(() => {
//           loader.style.display = 'none';
//           // Mostrar el primer texto durante 2 segundos
//           nprogressText1.style.display = 'block';
//         }, 3000);
//         // Ocultar el primer texto después de 2 segundos más
//         setTimeout(() => {
//           nprogressText1.style.display = 'none';
//           // Mostrar el segundo texto durante 2 segundos
//           nprogressText2.style.display = 'block';
//         }, 6000);
//         // Ocultar el segundo texto después de 2 segundos más
//         setTimeout(() => {
//           nprogress.style.display = 'none';
//           nprogressText2.style.display = 'none';
//           localStorage.clear();
//           window.location.href = "../../html/iniciar_sesion.html";
//           //container.style.display = 'block';
          
          
//         }, 9000);
//     })
//     .catch((error) => {
//         //console.error('Error al registrar el usuario:', error);
    
//         // Mostrar el loader
//         nprogress.style.display = 'block';
//         loader.style.display = 'block';
//         nprogressText1.style.display = 'none';
//         nprogressText2.style.display = 'none';
//         nprogressText3.style.display = 'none';
    
//         container.style.display = 'none';
//         flechaAtras.style.pointerEvents = 'none';
    
//         // Ocultar el loader después de 2 segundos
//         setTimeout(() => {
//           nprogress.style.display = 'none';  
//           loader.style.display = 'none';
//           // Mostrar el nprogressText3 durante 2 segundos
//           nprogressText3.style.display = 'block';
//         }, 3000);
    
//         // Ocultar el nprogressText3 después de 2 segundos más
//         setTimeout(() => {
//           nprogress.style.display = 'none';
//           loader.style.display = 'none';
//           nprogressText3.style.display = 'none';
//           container.style.display = 'block';
//           flechaAtras.style.pointerEvents = 'auto';
//         }, 6000);
//     });
//     }else{
//        // Mostrar el loader
//        nprogress.style.display = 'block';
//        loader.style.display = 'block';
//        nprogressText1.style.display = 'none';
//        nprogressText2.style.display = 'none';
//        nprogressText3.style.display = 'none';
   
//        container.style.display = 'none';
//        flechaAtras.style.pointerEvents = 'none';
   
//        // Ocultar el loader después de 2 segundos
//        setTimeout(() => {
//          nprogress.style.display = 'none';
//          loader.style.display = 'none';
//          // Mostrar el nprogressText3 durante 2 segundos
//          nprogressText3.style.display = 'block';
//        }, 3000);
   
//        // Ocultar el nprogressText3 después de 2 segundos más
//        setTimeout(() => {
//          nprogress.style.display = 'none';
//          loader.style.display = 'none';
//          nprogressText3.style.display = 'none';
//          container.style.display = 'block';
//          flechaAtras.style.pointerEvents = 'auto';
//        }, 6000);
//     }
//   }
// });

//   //Firebase
//   // Función para registrar un usuario
// async function registerUser(email, password) {
//     try {
//       // Registra al usuario con el correo y contraseña
//       const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
  
//       // Obtén el objeto del usuario recién creado
//       const user = userCredential.user;
  
//       // Envía un correo de verificación
//       await user.sendEmailVerification();
  
//       // Retorna el usuario recién creado
//       return user;
//     } catch (error) {
//       // Maneja los posibles errores
//       console.error('Error al registrar el usuario:', error);
//       throw error;
//     }
//   }