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
const flechaAtras = document.getElementById('flecha_atras');

//Clikear botón confimrar inicio de sesión
const continueButton = document.getElementById("confirmar");
continueButton.addEventListener("click", function() {
    if (validarCorreo() && validarClave()) {
      const correo = correoInput.value.trim();
      const clave = claveInput.value.trim();
      loginUser(correo, clave);
    }
});

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
            //PREGUNTAR EN BD SI CORREO PERTENECE A CLIENTE O PRESTADOR
            //window.location.href = '../html/perfil_cliente/cliente.html';
            //window.location.href = '../html/perfil_prestador/prestador.html';
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
    // Manejo de errores
    const errorMessage = error.message;
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