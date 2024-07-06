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

//Clikear botón confirmar de envío de correo de restablecer contraseña
const continueButton = document.getElementById("confirmar");
continueButton.addEventListener("click", function() {
    if (validarCorreo()) {
      const correo = correoInput.value.trim();
      recoveryKey(correo);
    }
});

function recoveryKey(correo) {

    nprogress.style.display = 'block';
    loader.style.display = 'block';
    container.style.display = 'none';
    // Deshabilitamos los clics en el elemento
    flechaAtras.style.pointerEvents = 'none';
    
    firebase.auth().fetchSignInMethodsForEmail(correo)
      .then(function(signInMethods) {
          // Check if the email is verified
          firebase.auth().currentUser.reload()
            .then(function() {
              if (firebase.auth().currentUser.emailVerified) {
                // Email is verified, send password reset email
                firebase.auth().sendPasswordResetEmail(correo)
                  .then(function() {

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
                        window.location.href = "iniciar_sesion.html";
                      }, 6000);

                    // Email de restablecimiento de contraseña enviado
                    //alert("Email de restablecimiento de contraseña enviado a:", correo);
                  })
                  .catch(function(error) {

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

                    // Manejar error de envío de email
                    //alert("Error al enviar el email de restablecimiento de contraseña:", error);
                  });
              } else {

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

                // Email is not verified
                //alert("Por favor, verifica tu correo electrónico antes de restablecer tu contraseña");
              }
            })
            .catch(function(error) {

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
              // Handle error fetching user info
              //alert("Error al enviar el email de restablecimiento de contraseña", error);
            });
        
      })
      .catch(function(error) {
   
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
        // Handle error fetching sign-in methods
        //alert("Error al enviar el email de restablecimiento de contraseña", error);
      });
  }