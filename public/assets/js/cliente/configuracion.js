// Agregar evento de clic al elemento con ID "instagram"
document.getElementById('instagram').addEventListener('click', abrirInstagram);

function abrirInstagram() {
    // Crear un esquema de URI para abrir la aplicación de Instagram
    var instagramUri = 'instagram://user?username=naxo.medina';

    try {
        // Intentar abrir la aplicación de Instagram
        window.navigator.app.launch(new Intent(instagramUri));
    } catch (e) {
        // Si no se puede abrir la aplicación, abrir la página web de Instagram
        window.open('https://www.instagram.com/naxo.medina/', '_system');
    }
}

// Función para crear un objeto Intent
function Intent(uri) {
    this.uri = uri;
}

// Agregar evento de clic al elemento con ID "facebook"
document.getElementById('facebook').addEventListener('click', abrirFacebook);

function abrirFacebook() {
    // Crear un esquema de URI para abrir la aplicación de Facebook
    var facebookUri = 'fb://profile/luis.medinabravo.9';

    try {
        // Intentar abrir la aplicación de Facebook
        window.navigator.app.launch(new Intent(facebookUri));
    } catch (e) {
        // Si no se puede abrir la aplicación, abrir la página web de Facebook
        window.open('https://www.facebook.com/luis.medinabravo.9/', '_system');
    }
}

// Función para crear un objeto Intent
function Intent(uri) {
    this.uri = uri;
}

// Agregar evento de clic al elemento con ID "web"
document.getElementById('web').addEventListener('click', abrirWeb);

function abrirWeb() {
    window.open('https://www.agrodronmatch.com/', '_system');
}