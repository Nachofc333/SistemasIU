// Define el icono rojo para los marcadores
let redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Crea el mapa y establece la vista
const mymap = L.map('sample_map').setView([40.741, -3.884], 15);

// Añade la capa de azulejos del mapa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(mymap);

// Variables para guardar los marcadores, el círculo, la ubicación del usuario y el control de ruta
let userMarker = null;
let marker = null;
let circle = null;
let userLocation = null;
let routeControl = null;

// Solicita la ubicación del usuario
navigator.geolocation.watchPosition(function(position) {
    userLocation = [position.coords.latitude, position.coords.longitude];

    // Elimina el marcador del usuario si ya existe
    if (userMarker) {
        mymap.removeLayer(userMarker);
    }

    // Añade un marcador para la ubicación del usuario
    userMarker = L.marker(userLocation).addTo(mymap).bindPopup('Tu ubicación').openPopup();

    // Evento al hacer clic en el mapa
    mymap.on('click', function(e) {
        // Elimina el marcador y el círculo anteriores si existen
        if (marker) {
            mymap.removeLayer(marker);
            mymap.removeLayer(circle);
        }

        // Añade un nuevo marcador y círculo
        marker = L.marker(e.latlng, {icon: redIcon}).addTo(mymap);
        circle = L.circle(e.latlng, {
            color: 'grey',
            fillColor: 'grey',
            fillOpacity: 0.2,
            radius: 200
        }).addTo(mymap);

        // Calcula la distancia entre la ubicación del usuario y el marcador
        const distance = haversineDistance(userLocation[0], userLocation[1], e.latlng.lat, e.latlng.lng);

        // Desactiva temporalmente el control de ruta
        if (routeControl !== null && routeControl.getPlan() !== null) {
            routeControl.getPlan().setWaypoints([]);
        }

        // Calcula la ruta utilizando OSRM y muestra en el mapa
        routeControl = L.Routing.control({
            waypoints: [
                L.latLng(userLocation[0], userLocation[1]),
                e.latlng
            ],
            createMarker: function() { return null; },
            routeWhileDragging: true,
            lineOptions: {
                styles: [{color: 'blue', opacity: 0.6, weight: 4}]
            }
        }).addTo(mymap);

        // Manejo de errores de enrutamiento
        routeControl.on('routingerror', function(err) {
            console.error('Error en el enrutamiento:', err.error);
            // Borra la ruta si hay un error
            if (routeControl !== null) {
                routeControl.getPlan().setWaypoints([]);
            }
        });

        // Evento cuando los puntos de ruta cambian
        routeControl.on('waypointschanged', function(e) {
            console.log('Puntos de ruta cambiados:', e.waypoints);
        });

        // Hacer vibrar el dispositivo en función de la distancia al marcador
        let intervalId = setInterval(function() {
            if (marker !== null) {
                let distancia = mymap.distance(userLocation, marker.getLatLng());
                console.log("Vibrando");

                if (distancia < 50) {
                    navigator.vibrate([700,50,700]);
                    console.log("Vibrando 50");
                } else if (distancia < 100) {
                    navigator.vibrate([500]);
                    console.log("Vibrando 100");
                } else if (distancia < 200) {
                    navigator.vibrate([200]);
                    console.log("Vibrando 200");
                }
            }
        }, 1000); // Comprueba la distancia cada segundo
    });
});

// Función para calcular la distancia entre dos puntos utilizando la fórmula del haversine
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en kilómetros
    return distance * 1000; // Convertir a metros
}
