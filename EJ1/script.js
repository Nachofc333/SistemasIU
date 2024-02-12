const container = document.getElementById('container');
const cuadrado = document.getElementById('square');

container.addEventListener("click", function(event){

    const x = event.clientX;
    const y = event.clientY;
    cuadrado.style.left = (x - cuadrado.offsetWidth / 2) + "px";
    cuadrado.style.top = (y - cuadrado.offsetHeight / 2) + "px";
    
  });
