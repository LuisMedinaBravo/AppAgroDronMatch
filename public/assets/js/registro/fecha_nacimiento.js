document.getElementById('nacimiento').addEventListener('click', showDateSelector);

function showDateSelector() {
    const dateSelector = document.querySelector('.nacimiento');
    dateSelector.style.display = 'block';
  
    document.addEventListener('click', handleClickOutside);
  }
  
  function handleClickOutside(event) {
    const dateSelector = document.querySelector('.nacimiento');
    const nacimientoInput = document.getElementById('nacimiento');
  
    if (event.target !== nacimientoInput && !dateSelector.contains(event.target)) {
      dateSelector.style.display = 'none';
      document.removeEventListener('click', handleClickOutside);
    }
  }

// Meses
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const monthOptions = document.getElementById('month-options');

// Establecer el primer mes por defecto
document.getElementById('month-input').value = months[0];

months.forEach((month, index) => {
    const option = document.createElement('div');
    option.textContent = month;
    option.addEventListener('click', () => {
        document.getElementById('month-input').value = month;
        monthOptions.style.display = 'none';
    });
    monthOptions.appendChild(option);
});

// Días
const dayOptions = document.getElementById('day-options');

// Establecer el primer día por defecto
document.getElementById('day-input').value = "1";

for (let i = 1; i <= 31; i++) {
    const option = document.createElement('div');
    option.textContent = i.toString();
    option.addEventListener('click', () => {
        document.getElementById('day-input').value = i;
        dayOptions.style.display = 'none';
    });
    dayOptions.appendChild(option);
}

// Años
const currentYear = new Date().getFullYear();
const yearOptions = document.getElementById('year-options');

// Establecer el primer año por defecto
let firstYear = 1924; // Puedes ajustar este valor según tus necesidades
document.getElementById('year-input').value = firstYear.toString();

for (let i = currentYear - 100; i <= currentYear; i++) {
    const option = document.createElement('div');
    option.textContent = i.toString();
    option.addEventListener('click', () => {
        document.getElementById('year-input').value = i;
        yearOptions.style.display = 'none';
    });
    yearOptions.appendChild(option);
}

// Mostrar y ocultar las opciones
document.querySelectorAll('.date-selector__item input').forEach(input => {
    input.addEventListener('click', () => {
        const options = input.nextElementSibling;
        options.style.display = 'block';
    });
    document.addEventListener('click', (event) => {
        if (!input.contains(event.target)) {
            input.nextElementSibling.style.display = 'none';
        }
    });
});

// Agregar y remover la clase "active"
document.querySelectorAll('.date-selector__item input').forEach(input => {
  input.addEventListener('click', () => {
      input.parentElement.classList.add('active');
  });
  document.addEventListener('click', (event) => {
      if (!input.contains(event.target)) {
          input.parentElement.classList.remove('active');
      }
  });
});

const confirmarFechaButton = document.getElementById('confirmar_fecha');
confirmarFechaButton.addEventListener('click', showSelectedDate);

function showSelectedDate() {
    let selectedDay = document.getElementById('day-input').value;
    let selectedMonth = document.getElementById('month-input').value;
    let selectedYear = document.getElementById('year-input').value;
    
    // Crear la fecha en formato "AAAA-MM-DD"
    let selectedDate = `${selectedDay}-${selectedMonth}-${selectedYear}`;
    
    // Enviar la fecha al input con id "nacimiento"
    document.getElementById('nacimiento').value = selectedDate;
    
    // Ocultar la sección con la clase "nacimiento"
    const nacimientoSection = document.querySelector('.nacimiento');
    nacimientoSection.style.display = 'none';
}