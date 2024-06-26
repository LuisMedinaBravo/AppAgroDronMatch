
//Lógica Switches
document.addEventListener('DOMContentLoaded', function() {
    // Obtener los checkboxes de disponibilidad
    const availabilityCheckboxes = document.querySelectorAll('input[name="jornada[]"]');
  
    // Agregar evento de cambio a los checkboxes
    availabilityCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        // Obtener el estado actual de los checkboxes
        const diurnoChecked = document.querySelector('input[name="jornada[]"][value="diurno"]').checked;
        const nocturnoChecked = document.querySelector('input[name="jornada[]"][value="nocturno"]').checked;
  
        // Permitir desmarcar solo si la otra casilla está marcada
        if (!diurnoChecked && !nocturnoChecked) {
          checkbox.checked = true;
        }
      });
    });
});

// Obtener referencias a los elementos de calendario
const calendarInicio = flatpickr("#calendar-input-inicio", {
  dateFormat: "Y-m-d",
  defaultDate: new Date().toISOString().split('T')[0],
  disable: [
    function(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date.getTime() < today.getTime();
    }
  ],
  theme: "light"
});

const calendarFin = flatpickr("#calendar-input-fin", {
  dateFormat: "Y-m-d",
  minDate: new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0],
  disable: [
    function(date) {
      return date.getTime() < Date.now() + (24 * 60 * 60 * 1000);
    }
  ],
  theme: "airbnb"
});

// Actualizar el valor mínimo del segundo calendario y borrar la selección cuando cambie el valor del primero
calendarInicio.config.onChange.push(function(selectedDates) {
  if (selectedDates.length > 0) {
    const minDate = new Date(selectedDates[0]);
    minDate.setDate(minDate.getDate() + 1);
    calendarFin.set('minDate', minDate.toISOString().split('T')[0]);
    calendarFin.clear();
  }
});

// Clikear botón finalizar registro
const finishButton = document.getElementById("continuar_registro_4");
finishButton.addEventListener("click", function() {
  // Verificar que se haya seleccionado una fecha de inicio y fin
  const startDate = calendarInicio.selectedDates[0];
  const endDate = calendarFin.selectedDates[0];
  if (!startDate || !endDate) {
    // Establecer el borde rojo para el campo que no tenga selección
    if (!startDate) {
      document.getElementById("calendar-input-inicio").value = "Ingresar fecha";
      document.getElementById("calendar-input-inicio").style.border = "1px solid red";
    } else {
      document.getElementById("calendar-input-inicio").style.border = "";
    }
    if (!endDate) {
      document.getElementById("calendar-input-fin").value = "Ingresar fecha";
      document.getElementById("calendar-input-fin").style.border = "1px solid red";
    } else {
      document.getElementById("calendar-input-fin").style.border = "";
    }
  }else{
    document.getElementById("calendar-input-inicio").style.border = "";
    document.getElementById("calendar-input-fin").style.border = "";
    window.location.href = "perifl.html";
  }
});