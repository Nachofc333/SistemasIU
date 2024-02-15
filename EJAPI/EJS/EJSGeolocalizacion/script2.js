//(solo funciona en replit)en modo inspeccionar, ctrl + shift + p, escribir sensor y cambiar ubicacion

if('geolocation' in navigator){
    const p = document.querySelector("#geoloc");
    const watchID = navigator.geolocation.watchPosition((position) => {
        p.innerHTML = `${position.coords.latitude}, ${position.coords.longitude}`;
    });
  }