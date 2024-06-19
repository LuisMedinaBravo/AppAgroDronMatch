document.addEventListener('DOMContentLoaded', function() {
    // Obtener los checkboxes de disponibilidad
    const availabilityCheckboxes = document.querySelectorAll('input[name="jornada[]"]');
  
    // Función de validación
    function validateAvailability() {
      // Obtener el estado actual de los checkboxes
      const diurnoChecked = document.querySelector('input[name="jornada[]"][value="diurno"]').checked;
      const nocturnoChecked = document.querySelector('input[name="jornada[]"][value="nocturno"]').checked;
  
      // Verificar si al menos uno de los checkboxes está marcado
      if (diurnoChecked || nocturnoChecked) {
        return true;
      } else {
        return false;
      }
    }
  
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
  //minDate: new Date().toISOString().split('T')[0],
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
  //maxDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0],
  theme: "airbnb"
});

// Actualizar el valor mínimo del segundo calendario cuando cambie el valor del primero
calendarInicio.config.onChange.push(function(selectedDates) {
  if (selectedDates.length > 0) {
    const minDate = new Date(selectedDates[0]);
    minDate.setDate(minDate.getDate() + 1);
    calendarFin.set('minDate', minDate.toISOString().split('T')[0]);
  }
});