/* CONEXION FIREBASE */

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// Importar base de datos FIRESTORE
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

//Limpiar LocalStorage
localStorage.clear();

// Validación de correo electrónico
const correoInput = document.getElementById("correo");
const correoErrorMessage = document.getElementById("correo-error-message");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

correoInput.addEventListener('input', () => {
    const correo = correoInput.value.trim();
    if (correo === "") {
        correoErrorMessage.textContent = "Por favor, ingresar un correo electrónico";
        correoInput.classList.add("error");
    } else if (!emailRegex.test(correo)) {
        correoErrorMessage.textContent = "El correo electrónico ingresado no es válido";
        correoInput.classList.add("error");
    } else {
        correoErrorMessage.textContent = "";
        correoInput.classList.remove("error");
    }
});

// Validación de contraseña
const claveInput = document.getElementById("clave");
const claveErrorMessage = document.getElementById("clave-error-message");
const claveRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

claveInput.addEventListener('input', () => {
    const clave = claveInput.value.trim();
    if (clave === "") {
        claveErrorMessage.textContent = "Por favor, ingresar una contraseña";
        claveInput.classList.add("error");
    }else{
        claveErrorMessage.textContent = "";
        claveInput.classList.remove("error");
    }
});


function validarCorreo() {
    const correoInput = document.getElementById("correo");
    const correoErrorMessage = document.getElementById("correo-error-message");
    const correo = correoInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo === "") {
      correoErrorMessage.textContent = "Por favor, ingresar un correo electrónico";
      correoInput.classList.add("error");
      return false;
    } else if (!emailRegex.test(correo)) {
      correoErrorMessage.textContent = "El correo electrónico ingresado no es válido";
      correoInput.classList.add("error");
      return false;
    } else {
      correoErrorMessage.textContent = "";
      correoInput.classList.remove("error");
      return true;
    }
}

function validarClave() {
    const claveInput = document.getElementById("clave");
    const claveErrorMessage = document.getElementById("clave-error-message");
    const clave = claveInput.value.trim();

    if (clave === "") {
      claveErrorMessage.textContent = "Por favor, ingresar una contraseña";
      claveInput.classList.add("error");
      return false;
    } else {
      claveErrorMessage.textContent = "";
      claveInput.classList.remove("error");
      return true;
    }
}

//Lógica del ojo
const ojoSpan = document.getElementById("ojo");
const ojoIcon = ojoSpan.querySelector("i");

ojoSpan.addEventListener("click", function() {
  if (claveInput.type === "password") {
    claveInput.type = "text";
    ojoIcon.classList.remove("fa-eye");
    ojoIcon.classList.add("fa-eye-slash");
  } else {
    claveInput.type = "password";
    ojoIcon.classList.remove("fa-eye-slash");
    ojoIcon.classList.add("fa-eye");
  }
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

const nprogress = document.getElementById('nprogress');
const loader = document.getElementById('spinner');
const nprogressText1 = document.getElementById('nprogress-text-1');
const nprogressText2 = document.getElementById('nprogress-text-2');
const nprogressText3 = document.getElementById('nprogress-text-3');
const container = document.getElementById('container');
const flechaAtras = document.getElementById('flecha-atras');

//Clikear botón confimrar inicio de sesión
const continueButton = document.getElementById("confirmar");
continueButton.addEventListener("click", function() {
    if (validarCorreo() && validarClave()) {
      const correo = correoInput.value.trim();
      const clave = claveInput.value.trim();
      loginUser(correo, clave);
    }
});



// Función de inicio de sesión
async function loginUser(correo,clave){

  nprogress.style.display = 'block';
  loader.style.display = 'block';
  container.style.display = 'none';
  // Deshabilitamos los clics en el elemento
  flechaAtras.style.pointerEvents = 'none';
  // Autenticar al usuario con Firebase
  firebase.auth().signInWithEmailAndPassword(correo, clave)
  .then((userCredential) => {
      // Usuario autenticado con éxito
      const user = userCredential.user;

      // Verificar si el correo electrónico está verificado
      if (user.emailVerified) {
          //alert('Sesión iniciada: ¡Bienvenido!');

          setTimeout(() => {
            loader.style.display = 'none';
            // Mostrar el primer texto durante 2 segundos
            nprogressText1.style.display = 'block';
          }, 3000);
          // Ocultar el primer texto después de 2 segundos más
          setTimeout(() => {
            nprogressText1.style.display = 'none';
            // Mostrar el segundo texto durante 2 segundos
            nprogress.style.display = 'none';
            container.style.display = 'block';
            checkFirestoreCollections(correo);
          }, 6000);

      } else {
          // Mostrar un alert indicando que el correo no está verificado
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
              nprogressText2.style.display = 'block';
          }, 3000);
      
          // Ocultar el nprogressText3 después de 2 segundos más
          setTimeout(() => {
              nprogress.style.display = 'none';
              loader.style.display = 'none';
              nprogressText2.style.display = 'none';
              container.style.display = 'block';
              // Deshabilitamos los clics en el elemento
              flechaAtras.style.pointerEvents = 'auto';
          }, 6000);
          //alert('Por favor, verifica tu correo electrónico antes de iniciar sesión');
      }
  })
  .catch((error) => {

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
    //alert('Correo y/o contraseña incorrectos', errorMessage);

    //Lógica de olvidar contraseña
    const textoOlvidarClave1 = document.getElementById('texto_1');
    const textoOlvidarClave2 = document.getElementById('texto_2');
    textoOlvidarClave1.style.display = 'block';
    textoOlvidarClave2.style.display = 'block';

    // Agregar evento de clic a 'texto_2'
    textoOlvidarClave2.addEventListener('click', () => {
      window.location.href = "../../assets/html/olvidar_clave.html";
    });
  });
}

async function checkFirestoreCollections(email) {
  try {
    // Buscar en la colección "cliente"
    let userData = null;
    const clienteCollectionRef = collection(db, 'cliente');
    const clienteSnapshot = await getDocs(clienteCollectionRef);
    userData = clienteSnapshot.docs.find((doc) => doc.data().correo === email);
    if (userData) {
      //alert(`Correo encontrado en la colección "cliente"`);
      window.location.href = '../html/perfil_cliente/cliente.html';
      //return userData.data();
    }

    // Buscar en la colección "prestador"
    const prestadorCollectionRef = collection(db, 'prestador');
    const prestadorSnapshot = await getDocs(prestadorCollectionRef);
    userData = prestadorSnapshot.docs.find((doc) => doc.data().correo === email);
    if (userData) {
      //alert(`Correo encontrado en la colección "prestador"`);
      window.location.href = '../html/perfil_prestador/prestador.html';
      //return userData.data();
    }

    // No se encontró el usuario en ninguna de las colecciones
    //alert("No se encontró en ninguna colección");
    //return null;
  } catch (error) {
    console.error('Error checking Firestore collections:', error);
    //return null;
  }
}