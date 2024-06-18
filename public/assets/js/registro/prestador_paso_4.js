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

//Calendario
flatpickr("#calendar-input-inicio", {
    dateFormat: "Y-m-d",
    defaultDate: new Date().toISOString().split('T')[0],
    minDate: new Date().toISOString().split('T')[0],
    theme: "light"
});

flatpickr("#calendar-input-fin", {
    dateFormat: "Y-m-d",
    minDate: new Date().toISOString().split('T')[0],
    onOpen: function(selectedDates, dateStr, instance) {
        instance.calendarContainer.style.width = "400px";
        instance.calendarContainer.style.height = "300px";
        instance.calendarContainer.style.backgroundColor = "#f5f5f5";
        instance.calendarContainer.style.fontSize = "16px";
        instance.calendarContainer.style.color = "#333";
    },
    theme: "airbnb"
});