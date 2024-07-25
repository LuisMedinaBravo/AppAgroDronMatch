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
        'maxzoom': 23
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

// Agrega un evento de clic fuera del geocoder para ocultar el teclado
document.addEventListener('click', (event) => {
  const geocoderElement = document.querySelector('.mapboxgl-ctrl-geocoder');
  if (!geocoderElement.contains(event.target)) {
    // Oculta el teclado
    document.activeElement.blur();
  }
});

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
        const region = data.features[0].context.find(item => item.id.startsWith('region')).text;
        geocoder.setInput(address);
        localStorage.setItem('predio', JSON.stringify({ address: address, region: region }));
      })
      .catch(error => {
        console.error('Error getting address and region:', error);
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
          const region = data.features[0].context.find(item => item.id.startsWith('region')).text;
          geocoder.setInput(address);
          localStorage.setItem('predio', JSON.stringify({ address: address, region: region }));
        })
        .catch(error => {
          console.error('Error getting address and region:', error);
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
            // var address = data.features[0].place_name;
            // geocoder.setInput(address);
            // localStorage.setItem('predio', address); // Guarda la dirección en el localStorage

            const address = data.features[0].place_name;
            const region = data.features[0].context.find(item => item.id.startsWith('region')).text;
            geocoder.setInput(address);
            localStorage.setItem('predio', JSON.stringify({ address: address, region: region }));

            //Mostrar footer
            var $footer = $('#footer');
            $footer.show();

            // //Mostrar pre-footer
            var $prefooter = $('#pre-footer');
            $prefooter.show();
        
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

// Agrega el evento 'result' del geocoder
geocoder.on('result', (event) => {
  if (event.result && event.result.place_name) {
    const address = event.result.place_name;
    const region = event.result.context.find(item => item.id.startsWith('region')).text;
    localStorage.setItem('predio', JSON.stringify({ address: address, region: region }));
  }
});

geocoder.on('clear', () => {
  if (marker) {
    marker.remove();
    marker = null;
    localStorage.setItem('predio', ""); // Guarda la dirección en el localStorage
    document.getElementById('continuar_registro_3').disabled=true;

    //Mostrar footer
    var $footer = $('#footer');
    $footer.show();

    // //Mostrar pre-footer
    var $prefooter = $('#pre-footer');
    $prefooter.show();
  }
});

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