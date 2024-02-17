
//Este código crea una aplicación web que muestra las coordenadas x e y de cada toque en la pantalla

const display = document.getElementById("touches");

document.addEventListener("touchstart", function(event) {
  display.innerHTML = "";
  for (let i = 0; i < event.touches.length; i++) {
    let touch = event.touches[i];
    display.innerHTML += `Toque ${i + 1}: X=${touch.clientX} Y=${touch.clientY}<br>`;
  }
});

document.addEventListener("touchmove", function(event) {
  event.preventDefault();
  display.innerHTML = "";
  for (let i = 0; i < event.touches.length; i++) {
    let touch = event.touches[i];
    display.innerHTML += `Toque ${i + 1}: X=${touch.clientX} Y=${touch.clientY}<br>`;
  }
}, { passive: false });

document.addEventListener("touchend", function(event) {
  display.innerHTML = "";
});