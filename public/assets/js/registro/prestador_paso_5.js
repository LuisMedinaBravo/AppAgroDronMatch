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
        localStorage.clear();
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
// Función para registrar un usuario
async function registerUser(email, password) {
  try {
    // Registra al usuario con el correo y contraseña
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Obtén el objeto del usuario recién creado
    const user = userCredential.user;
  
    // Envía un correo de verificación
    await user.sendEmailVerification();
  
    // Retorna el usuario recién creado
    return user;
  } catch (error) {
    // Maneja los posibles errores
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
}