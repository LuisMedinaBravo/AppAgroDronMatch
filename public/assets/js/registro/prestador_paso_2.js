function formatRut(input) {
  let rut = input.value.replace(/[^0-9kK]/g, '');
  let rutLength = rut.length;

  // Permitir digitar si se borra algún dígito
  if (rutLength < 9) {
    input.disabled = false; // Habilitar el input si se borra algún dígito
  }

  // Limitar a 9 caracteres
  if (rut.length >= 9) {
    rut = rut.slice(0, 9);
    input.disabled = true; // Deshabilitar el input cuando se alcanzan los 9 dígitos
  }

  if (rutLength > 0) {
    rut = rut.substring(0, rutLength - 1) + '-' + rut.substring(rutLength - 1);
  }

  if (rutLength > 3) {
    rut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Limitar a 12 caracteres
  if (rut.length > 12) {
    rut = rut.slice(0, 12);
  }

  // Evitar eliminar el último número ingresado
  if (input.value.length > rut.length) {
    rut = rut.slice(0, 10);
  }

  input.value = rut;
}