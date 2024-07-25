/* CONEXION FIREBASE */

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// Importar base de datos FIRESTORE
import {
  getFirestore,
  collection,
  addDoc,
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



document.addEventListener('DOMContentLoaded', function() {
  // Obtener el checkbox de la jornada diurna
  const diurnoCheckbox = document.querySelector('input[name="jornada[]"][value="diurno"]');

  // Marcar el checkbox de la jornada diurna como checked
  diurnoCheckbox.checked = true;

  // Guardar la jornada diurna en el localStorage
  localStorage.setItem('jornada', 'diurno');

  // Crear el campo "fecha_no_disponible" en el localStorage con un valor vacío
  localStorage.setItem('fecha_no_disponible', '');

  // Agregar evento de cambio a los checkboxes
  const availabilityCheckboxes = document.querySelectorAll('input[name="jornada[]"]');
  availabilityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // Obtener el estado actual de los checkboxes
      const diurnoChecked = document.querySelector('input[name="jornada[]"][value="diurno"]').checked;
      const nocturnoChecked = document.querySelector('input[name="jornada[]"][value="nocturno"]').checked;

      // Permitir desmarcar solo si la otra casilla está marcada
      if (!diurnoChecked && !nocturnoChecked) {
        checkbox.checked = true;
      }

      // Guardar el estado de los checkboxes en el localStorage
      const selectedJornada = [];
      availabilityCheckboxes.forEach(cb => {
        if (cb.checked) {
          selectedJornada.push(cb.value);
        }
      });
      localStorage.setItem('jornada', selectedJornada.join(','));
    });
  });
});

// Obtener referencias a los elementos de calendario
const calendarInput = document.getElementById("calendar-input-inicio");

// Configurar el calendario de flatpickr
const calendarInicio = flatpickr("#calendar-input-inicio", {
  dateFormat: "d-m-Y",
  disable: [
    function(date) {
      const today = new Date();
      const maxDate = new Date(today.getTime() + (60 * 24 * 60 * 60 * 1000)); // 60 días a partir de hoy
      return date.getTime() < today.getTime() || date.getTime() > maxDate.getTime();
    }
  ],
  mode: "multiple",
  onChange: function(selectedDates, dateStr, instance) {
    // Calcular el número de días seleccionados
    const numDaysSelected = selectedDates.length;

    // Actualizar el valor del campo de entrada con el número de días seleccionados
    calendarInput.value = `${numDaysSelected} día(s) seleccionado(s)`;

    // Guardar las fechas seleccionadas en el localStorage
    localStorage.setItem("fecha_no_disponible", dateStr);

    // Aplicar la clase 'selected-day' a los días seleccionados
    instance.days.childNodes.forEach(function(dayElement) {
      if (selectedDates.some(function(date) {
        return dayElement.dateObj.toDateString() === date.toDateString();
      })) {
        dayElement.classList.add("selected-day");
      } else {
        dayElement.classList.remove("selected-day");
      }
    });
  },
  locale: "es",
  theme: "light"
});

const nprogress = document.getElementById('nprogress');
const loader = document.getElementById('spinner');
const nprogressText1 = document.getElementById('nprogress-text-1');
const nprogressText2 = document.getElementById('nprogress-text-2');
const nprogressText3 = document.getElementById('nprogress-text-3');
const container = document.getElementById('container');
const flechaAtras = document.getElementById('flecha-atras');

// Obtener los datos del localStorage
const drones = JSON.parse(localStorage.getItem("drones"));
const ubicacion_servicio = JSON.parse(localStorage.getItem("ubicaciones"));
const perfil = localStorage.getItem("perfil") 

// Clikear botón finalizar registro
const finishButton = document.getElementById("finalizar_registro");
finishButton.addEventListener("click", function() {
  // No es necesario hacer nada aquí, ya que las fechas se guardan en el localStorage
  // en el evento 'onChange' del calendario.
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
      console.log('Usuario registrado:', user);
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
      console.error('Error al registrar el usuario:', error);
  
      // Mostrar el loader
      nprogress.style.display = 'block';
      loader.style.display = 'block';
      nprogressText1.style.display = 'none';
      nprogressText2.style.display = 'none';
      nprogressText3.style.display = 'none';
  
      container.style.display = 'none';
      // Deshabilitamos los clics en el elemento
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
        // Deshabilitamos los clics en el elemento
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
 
     // Aplicar el efecto de desenfoque al contenedor
     container.style.display = 'none';
     // Deshabilitamos los clics en el elemento
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
       // Deshabilitamos los clics en el elemento
      flechaAtras.style.pointerEvents = 'auto';
     }, 6000);
  }
});

//Firebase
async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User created:", user);

    // Mandar correo de verificación y guardar los datos del usuario
    await new Promise((resolve, reject) => {
      sendEmailVerification(user)
        .then(() => {
          // Datos usuario
          const userData = {
            correo: localStorage.getItem("correo"),
            nombre: localStorage.getItem("nombre"),
            empresa: localStorage.getItem("empresa"),
            fecha_nacimiento: localStorage.getItem("nacimiento"),
            telefono: localStorage.getItem("telefono"),
            dron: {
              DJI: drones?.DJI || "",
              XAG: drones?.XAG || ""
            },
            ubicacion_servicio: {},
            jornada: localStorage.getItem("jornada"),
            fecha_sin_disponibilidad: localStorage.getItem("fecha_no_disponible"),
          };
          // Función para agregar una región y sus comunas al objeto ubicacion_servicio
          function addRegionAndComunas(region, comunas) {
            userData.ubicacion_servicio[region] = comunas;
          }

          // Iterar sobre las ubicaciones y agregarlas al objeto ubicacion_servicio
          for (const region in ubicacion_servicio) {
            addRegionAndComunas(region, ubicacion_servicio[region]);
          }

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