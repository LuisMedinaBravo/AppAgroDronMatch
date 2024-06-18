// En app.js
import { auth, firestore } from './index.js';

// Ahora puedes usar auth y firestore en este archivo
auth.signInWithEmailAndPassword('example@email.com', 'password')
  .then((userCredential) => {
    // Maneja el inicio de sesión exitoso
    console.log('Inicio de sesión exitoso:', userCredential.user);
  })
  .catch((error) => {
    // Maneja el error de inicio de sesión
    console.error('Error de inicio de sesión:', error);
  });

// Puedes usar firestore de manera similar
firestore.collection('users').doc('user1').set({
  name: 'John Doe',
  email: 'john@example.com'
})
.then(() => {
  console.log('Documento guardado con éxito');
})
.catch((error) => {
  console.error('Error al guardar el documento:', error);
});