// Agregar un evento de carga de la página
window.addEventListener('load', () => {
  localStorage.removeItem('predio');
});

//Mapa Mapbox configuración
mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaXgyNTA1IiwiYSI6ImNseWptODk3YjAzcnYyaW9ncGliZ3oybHMifQ.mOqpeH10AZ6r3XYLXc_vPA';
const map = new mapboxgl.Map({
  container: 'map',
  style: {
    'version': 8,
    'sources': {
      'raster-tiles': {
        'type': 'raster',
        'tiles': ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        'tileSize': 256,
      }
    },
    'layers': [
      {
        'id': 'simple-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 1,
        'maxzoom': 21
      }
    ]
  },
  center: [-71.5430, -33.4489],
  zoom: 5
});

map.addControl(new mapboxgl.NavigationControl());

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: "Busca tu predio",
  reverseGeocode: true,
  marker: false,
  limit: 3,
});
map.addControl(geocoder, 'top-left');

let marker = null;

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { longitude, latitude } = position.coords;
    marker = new mapboxgl.Marker({
      color: 'green',
      draggable: true,
      scale: 1.3
    })
    .setLngLat(new mapboxgl.LngLat(longitude, latitude))
    .addTo(map);

    map.flyTo({
      center: [longitude, latitude],
      zoom: 14,
      offset: [100, 0],
      essential: true,
    });
    document.getElementById('continuar_registro_3').disabled=false;

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => {
        const address = data.features[0].place_name;
        geocoder.setInput(address);
        localStorage.setItem('predio', address); // Guarda la dirección en el localStorage
      })
      .catch(error => {
        console.error('Error getting address:', error);
      });

    marker.on('dragend', () => {
      const { lng, lat } = marker.getLngLat();
      map.flyTo({
        center: [lng, lat],
        zoom: 14,
        offset: [100, 0],
        essential: true
      });

      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          const address = data.features[0].place_name;
          geocoder.setInput(address);
          localStorage.setItem('predio', address); // Guarda la dirección en el localStorage
        })
        .catch(error => {
          console.error('Error getting address:', error);
        });
    });
  },
  (error) => {
    console.error('Error getting user location:', error);
  }
);

geocoder.on('result', (event) => {

  if (event.result && event.result.geometry && event.result.geometry.coordinates) {
    const [lng, lat] = event.result.geometry.coordinates;
    if (marker) {
      marker.setLngLat(new mapboxgl.LngLat(lng, lat)).addTo(map);
    } else {
      marker = new mapboxgl.Marker({
        color: 'green',
        draggable: true,
        scale: 1.3
      })
      .setLngLat(new mapboxgl.LngLat(lng, lat))
      .addTo(map);

      marker.on('dragend', () => {
        const { lng, lat } = marker.getLngLat();
        map.flyTo({
          center: [lng, lat],
          zoom: 14,
          offset: [100, 0],
          essential: true
        });

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
          .then(response => response.json())
          .then(data => {
            var address = data.features[0].place_name;
            geocoder.setInput(address);
            localStorage.setItem('predio', address); // Guarda la dirección en el localStorage
          })
          .catch(error => {
            console.error('Error getting address:', error);
          });
      });
    }
    map.flyTo({ center: [lng, lat], zoom: 14, offset: [100, 0], essential: true });
  } else {
    console.error('Error getting the coordinates from the geocoder result:', event.result);
  }
  if(localStorage.getItem('predio') == ""){
    document.getElementById('continuar_registro_3').disabled=true;
  }else{
    document.getElementById('continuar_registro_3').disabled=false;
  }
});

geocoder.on('clear', () => {
  if (marker) {
    marker.remove();
    marker = null;
    localStorage.setItem('predio', ""); // Guarda la dirección en el localStorage
    document.getElementById('continuar_registro_3').disabled=true;
  }
});

// //Lógica del botón
// $(document).ready(function() {
//   var $continuar = $('#continuar_registro_3');

//   // Ocultar el botón cuando se hace click en un input
//   $('input').on('focus', function() {
//     $continuar.hide();
//   });

//   // Mostrar el botón cuando se quita el foco del input
//   $('input').on('blur', function() {
//     $continuar.show();
//   });
// });

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
  
//Lógica del pre-footer
$(document).ready(function() {
    var $prefooter = $('#pre-footer');
  
    // Ocultar el footer cuando se hace click en un input
    $('input').on('focus', function() {
      $prefooter.hide();
    });
  
    // Mostrar el footer cuando se quita el foco del input
    $('input').on('blur', function() {
      $prefooter.show();
    });
});

// Clikear botón continuar registro
const continueButton = document.getElementById("continuar_registro_3");
continueButton.addEventListener("click", function() {
    window.location.href = "registro_paso_4.html";
});