let redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const mymap = L.map('sample_map').setView([40.741, -3.884], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(mymap);

let marker = null; // Variable para guardar el marcador actual
let userLocation = null; // Variable para guardar la ubicación del usuario
let routeControl = null; // Variable para guardar la ruta actual

// Solicita la ubicación del usuario
navigator.geolocation.getCurrentPosition(function(position) {
    userLocation = [position.coords.latitude, position.coords.longitude];

    // Añade un marcador para la ubicación del usuario
    L.marker(userLocation).addTo(mymap).bindPopup('Tu ubicación').openPopup();

    mymap.on('click', function(e) {
        // Si ya existe un marcador, lo eliminamos
        if (marker) {
            mymap.removeLayer(marker);
        }

        // Añade el nuevo marcador
        marker = L.marker(e.latlng, {icon: redIcon}).addTo(mymap);

        // Calcula la distancia entre la ubicación del usuario y el marcador
        const distance = haversineDistance(userLocation[0], userLocation[1], e.latlng.lat, e.latlng.lng);

        // Muestra la distancia en el elemento HTML
        document.getElementById('distance').textContent = `Distancia al marcador: ${distance.toFixed(2)} metros`;

        // Borra la ruta anterior si existe
        if (routeControl) {
            mymap.removeControl(routeControl);
        }

        // Calcula la ruta utilizando OSRM y muestra en el mapa
        routeControl = L.Routing.control({
            waypoints: [
                L.latLng(userLocation[0], userLocation[1]),
                e.latlng
            ],
            routeWhileDragging: true,
            lineOptions: {
                styles: [{color: 'blue', opacity: 0.6, weight: 4}]
            }
        }).addTo(mymap);

        // Manejo de errores
        routeControl.on('routingerror', function(err) {
            console.error('Error en el enrutamiento:', err.error);
        });

        routeControl.on('waypointschanged', function(e) {
            console.log('Puntos de ruta cambiados:', e.waypoints);
        });
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