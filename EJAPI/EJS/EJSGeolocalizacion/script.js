if (navigator.geolocation) {
    console.log(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        const link = document.createElement("a");
        link.innerText = "Localizame en OpenStreeMap";
        link.href = `https://www.openstreetmap.org/?mlat=${pos.lat}&mlon=${pos.lng}#map=18/${pos.lat}/${pos.lng}`;
        link.target = "_blank";
        document.body.appendChild(link);
  
      },
      (err) => {
        const errorMessage = document.createElement("p");
        errorMessage.innerText = `Error: ${err.message}`;
        document.body.appendChild(errorMessage);
      }
    );
  }
  
  
  
  