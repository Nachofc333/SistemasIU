const mymap = L.map('sample_map').setView([40.741, -3.884], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(mymap);

let marker = null; // Variable para guardar el marcador actual

function addMarker() {
    const location = document.getElementById('location').value;
    // Aquí necesitarías convertir la ubicación en coordenadas de latitud y longitud.
    // Esto podría hacerse usando un servicio de geocodificación como Nominatim de OpenStreetMap.
    // Por ahora, vamos a usar unas coordenadas de ejemplo.
    const latlng = [40.741, -3.884];

    if (marker) {
        mymap.removeLayer(marker);
    }

    marker = L.marker(latlng).addTo(mymap);
}

mymap.on('click', function(e) {
    console.log(e);

    // Si ya existe un marcador, lo eliminamos
    if (marker) {
        mymap.removeLayer(marker);
    }

    // Añadimos un nuevo marcador
    marker = L.marker(e.latlng).addTo(mymap);

    // Añadimos un círculo alrededor del marcador
    /*L.circle(e.latlng, 100, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap);
    */

});

